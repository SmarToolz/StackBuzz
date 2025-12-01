import { Flame } from "lucide-react";

// --- Live Pulse Data (Simulating dynamic data based on a topic) ---
export interface LivePulseData {
  topic: string;
  count: number;
  icon: typeof Flame;
}

export const mockLivePulse: LivePulseData = {
  topic: "AI Ethics",
  count: 1400,
  icon: Flame,
};

// --- Actionable Creator Data ---
export interface ActionableCreator {
  id: number;
  handle: string;
  subscribers: string;
  actionDescription: string;
  category: 'Reach Target' | 'Peer Swap' | 'Rising Star';
  metric: string; // e.g., "posted yesterday", "replies daily", "47 comments"
}

export const mockActionableCreators: ActionableCreator[] = [
  { 
    id: 1, 
    handle: "@JaneDoe", 
    subscribers: "20k", 
    actionDescription: "Reach Target", 
    category: 'Reach Target',
    metric: "posted yesterday",
  },
  { 
    id: 2, 
    handle: "@AlexGrowth", 
    subscribers: "2k", 
    actionDescription: "Peer Swap", 
    category: 'Peer Swap',
    metric: "replies daily",
  },
  { 
    id: 3, 
    handle: "@NewVoiceAI", 
    subscribers: "200", 
    actionDescription: "Rising Star", 
    category: 'Rising Star',
    metric: "47 comments on last post",
  },
];

// --- Trends Data ---
export interface ViralPost {
  id: number;
  title: string;
  author: string;
  subscribers: string;
  commentCount: number;
}

export interface PostInsight {
  wordCloud: string[]; // Simplified word cloud data
  suggestedTitle: string;
}

export const mockViralPosts: ViralPost[] = [
  { id: 1, title: "Why AI is Hitting a Wall: The Hidden Costs", author: "@TechGuru", subscribers: "50k", commentCount: 312 },
  { id: 2, title: "The Future of Remote Work is Asynchronous", author: "@ProductivityPro", subscribers: "12k", commentCount: 188 },
  { id: 3, title: "Indie Hacking: My First $100k in 30 Days", author: "@SoloDev", subscribers: "8k", commentCount: 450 },
  { id: 4, title: "Climate Tech: Why VCs are Missing the Biggest Opportunity", author: "@GreenInvest", subscribers: "35k", commentCount: 92 },
  { id: 5, title: "The Real Reason Your Newsletter Isn't Growing", author: "@MarketingMind", subscribers: "15k", commentCount: 210 },
];

export const mockPostInsights: Record<number, PostInsight> = {
    1: {
        wordCloud: ["energy cost", "GPU", "training data", "scaling", "infrastructure"],
        suggestedTitle: "Write this: The Real Cost of Training GPT: Why Infrastructure is the New Bottleneck",
    },
    2: {
        wordCloud: ["flexibility", "time zones", "meetings", "deep work"],
        suggestedTitle: "Write this: Stop Scheduling Meetings: How Asynchronous Communication Saves Your Sanity",
    },
    3: {
        wordCloud: ["validation", "MVP", "launch strategy", "pricing", "community"],
        suggestedTitle: "Write this: The 3 Mistakes I Made Before Hitting $100k as an Indie Hacker",
    },
    4: {
        wordCloud: ["carbon capture", "policy", "regulation", "long-term bets"],
        suggestedTitle: "Write this: Forget Solar Panels: The Next Trillion-Dollar Climate Tech Opportunity",
    },
    5: {
        wordCloud: ["consistency", "SEO", "distribution", "niche", "value proposition"],
        suggestedTitle: "Write this: You Don't Have a Growth Problem, You Have a Niche Problem",
    },
};