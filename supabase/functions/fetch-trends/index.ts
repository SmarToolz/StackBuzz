/// <reference lib="deno.ns" />
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  // Manual authentication handling (since verify_jwt is false)
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Missing Authorization header' }), { 
      status: 401, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
  
  try {
    // Parse the request body to get the keyword
    const { keyword } = await req.json();

    if (!keyword) {
        return new Response(JSON.stringify({ error: 'Missing keyword in request body' }), { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }

    // --- 1. Access Secrets ---
    const APIFY_TOKEN = Deno.env.get('APIFY_TOKEN');
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!APIFY_TOKEN || !GEMINI_API_KEY) {
        console.error("Missing API tokens in environment.");
        // Return a generic error to the client, but log the specific issue on the server
        return new Response(JSON.stringify({ error: 'Server configuration error: External API tokens are missing.' }), { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }
    
    // --- 2. Conceptual Apify & Gemini Integration (Simulated) ---
    console.log(`[Edge Function] Apify Token accessed successfully.`);
    console.log(`[Edge Function] Gemini Key accessed successfully.`);
    
    // In a real scenario, this is where you would use the APIFY_TOKEN to call Apify
    // and the GEMINI_API_KEY to enrich the scraped data.

    // Returning a mock response that confirms the keyword was processed and secrets were accessed.
    const realMockResponse = [
        { 
            id: 100, 
            title: `[LIVE] Top Post on ${keyword}: The Hidden Truth`, 
            author: "@ScraperPro", 
            subscribers: "100k", 
            commentCount: 1200,
        },
        { 
            id: 101, 
            title: `A Counter-Angle to the ${keyword} Hype`, 
            author: "@TrendSetter", 
            subscribers: "50k", 
            commentCount: 650,
        },
    ];

    return new Response(JSON.stringify(realMockResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error("Edge Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})