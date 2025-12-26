// @ts-ignore
import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function waitForApifyRun(runId: string, token: string, timeoutMs = 20000) {
  const start = Date.now();
  const statusUrl = `https://api.apify.com/v2/actor-runs/${runId}?token=${token}`;

  while (Date.now() - start < timeoutMs) {
    const res = await fetch(statusUrl);
    const json = await res.json();
    const status = json.data?.status;
    if (status === "SUCCEEDED") return json.data;
    if (status === "FAILED" || status === "ABORTED") throw new Error(`Apify run ${status}`);
    await sleep(2000);
  }
  throw new Error("Timed out waiting for Apify run to finish.");
}

async function fetchApifyDataset(datasetId: string, token: string) {
  const dataUrl = `https://api.apify.com/v2/datasets/${datasetId}/items?status=SUCCEEDED&clean=true&token=${token}`;
  const res = await fetch(dataUrl);
  if (!res.ok) throw new Error(`Failed to fetch dataset: ${res.status}`);
  return res.json();
}

// Helper to normalize the scraped data structure for insertion into 'scraped_posts'
const normalizePostData = (post: any, userId: string, keyword: string) => ({
    user_id: userId,
    keyword: keyword,
    source: 'Substack', 
    external_id: post.id ? String(post.id) : null,
    title: post.title || 'Untitled Post',
    content: post.content || 'No content preview available.',
    metadata: {
        author: post.author || 'Unknown Author',
        subscribers: post.subscribers || 'N/A',
        comment_count: post.commentCount || 0,
    },
    fetched_at: new Date().toISOString(),
});


serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200, headers: corsHeaders });

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Unauthorized: Missing Authorization header" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { keyword } = await req.json();
    if (!keyword) {
      return new Response(JSON.stringify({ error: "Missing 'keyword' in request body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // @ts-ignore
    const APIFY_TOKEN = Deno.env.get("APIFY_TOKEN");
    if (!APIFY_TOKEN) {
      return new Response(JSON.stringify({ error: "Server misconfiguration: missing APIFY_TOKEN" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- 1. Run Apify Scraper ---
    const startUrl = `https://api.apify.com/v2/acts/apify~keyword-scraper/runs?token=${APIFY_TOKEN}`;
    const startRes = await fetch(startUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ q: keyword }),
    });

    if (!startRes.ok) {
      const errText = await startRes.text();
      return new Response(JSON.stringify({ error: "Failed to start Apify run", details: errText }), {
        status: startRes.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const startData = await startRes.json();
    const runId = startData.data.id;
    console.log(`[Apify] Run started for "${keyword}" (runId: ${runId})`);

    const runResult = await waitForApifyRun(runId, APIFY_TOKEN);
    console.log(`[Apify] Run completed successfully. Dataset ID: ${runResult.defaultDatasetId}`);

    const datasetItems = await fetchApifyDataset(runResult.defaultDatasetId, APIFY_TOKEN);
    
    // --- 2. Supabase Integration (Save Data) ---
    
    // Initialize Supabase client with the user's JWT
    // @ts-ignore
    const supabase = createClient(
        // @ts-ignore
        Deno.env.get('SUPABASE_URL')!,
        // @ts-ignore
        Deno.env.get('SUPABASE_ANON_KEY')!,
        {
            global: {
                headers: { Authorization: authHeader },
            }
        }
    );
    
    // Get the authenticated user ID
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized: Invalid user session' }), { 
            status: 401, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }
    const userId = user.id;

    // Prepare data for insertion
    const postsToInsert = datasetItems.map((item: any) => normalizePostData(item, userId, keyword));

    // Insert data into the 'scraped_posts' table
    const { data: insertedData, error: dbError } = await supabase
        .from('scraped_posts')
        .insert(postsToInsert)
        .select('id, title, metadata'); // Select necessary fields for client response

    if (dbError) {
        console.error("Database Insertion Error:", dbError);
        return new Response(JSON.stringify({ error: `Database error during insertion: ${dbError.message}` }), { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }

    // Return the inserted data mapped back to the ViralPost structure
    const clientResponseData = insertedData.map(dbPost => ({
        id: dbPost.id,
        title: dbPost.title,
        author: dbPost.metadata.author,
        subscribers: dbPost.metadata.subscribers,
        commentCount: dbPost.metadata.comment_count,
    }));

    return new Response(JSON.stringify(clientResponseData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("[Edge Function Error]", err);
    return new Response(
      JSON.stringify({ error: "internal_error", message: err.message || String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});