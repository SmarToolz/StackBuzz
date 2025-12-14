import { ViralPost, mockViralPosts } from "@/lib/mock-data";

/**
 * Simulates an API call to a backend that triggers an Apify scrape for viral posts.
 * @param keyword The topic keyword to search for.
 * @returns A promise resolving to an array of ViralPost data.
 */
export async function fetchViralPosts(keyword: string): Promise<ViralPost[]> {
  console.log(`[API] Simulating fetching viral posts for keyword: "${keyword}"`);
  
  // Simulate network delay and backend processing time (e.g., 3 seconds for a scrape)
  await new Promise(resolve => setTimeout(resolve, 3000));

  // In a real application, this would be:
  // const response = await fetch(`/api/scrape-trends?keyword=${keyword}`);
  // if (!response.ok) throw new Error('Failed to fetch trends');
  // return response.json();

  // For now, return mock data
  return mockViralPosts;
}