/// <reference lib="deno.ns" />
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  // Added headers required for successful CORS preflight checks (POST requests)
  'Access-Control-Allow-Methods': 'POST, OPTIONS', 
  'Access-Control-Max-Age': '86400', // Cache preflight response for 24 hours
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

    // --- 1. Access Secrets (Simulated) ---
    // In a real scenario, we would use APIFY_TOKEN here.
    const APIFY_TOKEN = Deno.env.get('APIFY_TOKEN');
    
    if (!APIFY_TOKEN) {
        console.error("Missing API tokens in environment.");
        return new Response(JSON.stringify({ error: 'Server configuration error: External API tokens are missing.' }), { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }
    
    // --- 2. Conceptual Apify Integration (Simulated) ---
    console.log(`[Edge Function] Apify Token accessed successfully. Running mock scrape for ${keyword}.`);
    
    // Returning a mock response that confirms the keyword was processed.
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