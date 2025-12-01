import { Flame, TrendingUp, Users, Zap } from "lucide-react";

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

// --- NEW Dashboard Overview Data ---

export interface SummaryStat {
  title: string;
  value: string;
  change: string;
  icon: typeof Flame | typeof Users | typeof Zap | typeof TrendingUp;
  color: string;
}

export const mockSummaryStats: SummaryStat[] = [
  {
    title: "Trending Topics",
    value: "12,450",
    change: "+20.1% from last month",
    icon: TrendingUp,
    color: "text-green-400",
  },
  {
    title: "New Creators Tracked",
    value: "5,320",
    change: "+15% from last month",
    icon: Users,
    color: "text-blue-400",
  },
  {
    title: "Average Engagement Score",
    value: "92%",
    change: "Highest score this quarter",
    icon: Zap,
    color: "text-yellow-400",
  },
  {
    title: "Velocity Spike Alerts",
    value: "14",
    change: "3 critical spikes today",
    icon: Flame,
    color: "text-red-400",
  },
];

export interface VelocityData {
  day: string;
  mentions: number;
}

export const mockVelocityData: VelocityData[] = [
  { day: "Day 1", mentions: 1200 },
  { day: "Day 2", mentions: 1900 },
  { day: "Day 3", mentions: 1500 },
  { day: "Day 4", mentions: 3500 },
  { day: "Day 5", mentions: 2800 },
  { day: "Day 6", mentions: 4100 },
  { day: "Day 7", mentions: 3800 },
];

export interface TopInfluencer {
  name: string;
  topic: string;
  subs: string;
  engagement: string;
}

export const mockTopInfluencers: TopInfluencer[] = [
  { name: "Jane Doe", topic: "Future of AI", subs: "15k Subs", engagement: "95%" },
  { name: "Alex Smith", topic: "Indie Hacking", subs: "8k Subs", engagement: "88%" },
  { name: "Chris Lee", topic: "Web3 & Culture", subs: "22k Subs", engagement: "91%" },
  { name: "Maria Garcia", topic: "Remote Work Burnout", subs: "12k Subs", engagement: "85%" },
];


// --- Actionable Creator Data ---
export interface PostHistory {
  date: string;
  posts: number;
}

export interface RecentPost {
  title: string;
  commentCount: number;
}

export interface ActionableCreator {
  id: number;
  handle: string;
  subscribers: string;
  lastPostDate: string;
  category: 'Reach Target' | 'Peer Swap' | 'Rising Star';
  metric: string; // e.g., "posted yesterday", "replies daily", "47 comments"
  postHistory: PostHistory[];
  recentPosts: RecentPost[];
  outreachLine: string;
}

export const mockActionableCreators: ActionableCreator[] = [
  { 
    id: 1, 
    handle: "JaneDoe", 
    subscribers: "20k", 
    lastPostDate: "2 days ago", 
    category: 'Reach Target',
    metric: "posted yesterday",
    postHistory: [
      { date: "Mon", posts: 1 },
      { date: "Tue", posts: 0 },
      { date: "Wed", posts: 2 },
      { date: "Thu", posts: 1 },
      { date: "Fri", posts: 0 },
      { date: "Sat", posts: 1 },
      { date: "Sun", posts: 0 },
    ],
    recentPosts: [
      { title: "The 5 Mistakes I Made Scaling My Newsletter", commentCount: 89 },
      { title: "Why Consistency Beats Quality (Sometimes)", commentCount: 45 },
      { title: "My Favorite Tools for Substack Growth", commentCount: 120 },
    ],
    outreachLine: "Hey Jane, your post on newsletter scaling was spot on. I'm working on a piece about audience retention—would love to cross-promote or swap insights!",
  },
  { 
    id: 2, 
    handle: "AlexGrowth", 
    subscribers: "2k", 
    lastPostDate: "5 hours ago", 
    category: 'Peer Swap',
    metric: "replies daily",
    postHistory: [
      { date: "Mon", posts: 0 },
      { date: "Tue", posts: 1 },
      { date: "Wed", posts: 0 },
      { date: "Thu", posts: 1 },
      { date: "Fri", posts: 1 },
      { date: "Sat", posts: 0 },
      { date: "Sun", posts: 1 },
    ],
    recentPosts: [
      { title: "Quick Tip: Use Threads for Idea Validation", commentCount: 15 },
      { title: "My Q3 Revenue Report (Transparent)", commentCount: 30 },
      { title: "The Power of a Small, Engaged Audience", commentCount: 22 },
    ],
    outreachLine: "Hi Alex, I saw your recent post on idea validation—great stuff. We have similar audience sizes and niches. Interested in a quick peer swap or a joint post?",
  },
  { 
    id: 3, 
    handle: "NewVoiceAI", 
    subscribers: "200", 
    lastPostDate: "1 day ago", 
    category: 'Rising Star',
    metric: "47 comments on last post",
    postHistory: [
      { date: "Mon", posts: 1 },
      { date: "Tue", posts: 1 },
      { date: "Wed", posts: 1 },
      { date: "Thu", posts: 1 },
      { date: "Fri", posts: 1 },
      { date: "Sat", posts: 1 },
      { date: "Sun", posts: 1 },
    ],
    recentPosts: [
      { title: "The Hidden GPU Costs of Training LLMs", commentCount: 47 },
      { title: "AI Ethics: Who is Responsible?", commentCount: 21 },
      { title: "My Journey into AI Development", commentCount: 10 },
    ],
    outreachLine: "Hey, your take on GPU costs is everywhere — I just wrote the counter-take. Want to co-write?",
  },
  { 
    id: 4, 
    handle: "ClimateWriter", 
    subscribers: "15k", 
    lastPostDate: "1 week ago", 
    category: 'Reach Target',
    metric: "high engagement",
    postHistory: [
      { date: "Mon", posts: 0 },
      { date: "Tue", posts: 0 },
      { date: "Wed", posts: 1 },
      { date: "Thu", posts: 0 },
      { date: "Fri", posts: 0 },
      { date: "Sat", posts: 0 },
      { date: "Sun", posts: 0 },
    ],
    recentPosts: [
      { title: "The Policy Changes We Need for Green Energy", commentCount: 150 },
      { title: "Why Carbon Capture is a Distraction", commentCount: 90 },
      { title: "Interview with a Climate Scientist", commentCount: 50 },
    ],
    outreachLine: "Hi ClimateWriter, I'm a big fan of your work on green energy policy. I have a unique data set on local climate initiatives—could we collaborate on a piece?",
  },
  { 
    id: 5, 
    handle: "ProductivityPro", 
    subscribers: "3k", 
    lastPostDate: "3 days ago", 
    category: 'Peer Swap',
    metric: "consistent posting",
    postHistory: [
      { date: "Mon", posts: 1 },
      { date: "Tue", posts: 0 },
      { date: "Wed", posts: 1 },
      { date: "Thu", posts: 0 },
      { date: "Fri", posts: 1 },
      { date: "Sat", posts: 0 },
      { date: "Sun", posts: 0 },
    ],
    recentPosts: [
      { title: "The 5-Minute Morning Routine", commentCount: 18 },
      { title: "Deep Work vs. Shallow Work: A Breakdown", commentCount: 35 },
      { title: "My Favorite Note-Taking App", commentCount: 12 },
    ],
    outreachLine: "Hey ProductivityPro, your focus on deep work aligns perfectly with my audience. Let's explore a mutual recommendation or a quick interview swap!",
  },
  { 
    id: 6, 
    handle: "IndieHackerBot", 
    subscribers: "500", 
    lastPostDate: "1 hour ago", 
    category: 'Rising Star',
    metric: "viral thread",
    postHistory: [
      { date: "Mon", posts: 2 },
      { date: "Tue", posts: 1 },
      { date: "Wed", posts: 3 },
      { date: "Thu", posts: 1 },
      { date: "Fri", posts: 2 },
      { date: "Sat", posts: 1 },
      { date: "Sun", posts: 2 },
    ],
    recentPosts: [
      { title: "How I Built a SaaS in 48 Hours", commentCount: 65 },
      { title: "The Best Low-Code Tools for Founders", commentCount: 40 },
      { title: "Pricing Strategy for Your First 100 Users", commentCount: 30 },
    ],
    outreachLine: "IndieHackerBot, your recent thread on building SaaS quickly is viral! I'm writing about the next steps after launch—we should connect and share audiences.",
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

// --- Superfans Data ---
export interface UserPost {
  id: number;
  title: string;
  commentCount: number;
}

export interface Superfan {
  id: number;
  name: string;
  handle: string;
  commentCount: number;
  lastCommentDate: string;
}

export const mockUserPosts: UserPost[] = [
  { id: 101, title: "My Q4 Revenue Breakdown", commentCount: 45 },
  { id: 102, title: "The Future of AI in Writing", commentCount: 62 },
  { id: 103, title: "How to Niche Down Effectively", commentCount: 31 },
  { id: 104, title: "The 5-Minute Morning Routine", commentCount: 18 },
  { id: 105, title: "Deep Work vs. Shallow Work: A Breakdown", commentCount: 35 },
];

export const mockSuperfans: Superfan[] = [
  { id: 201, name: "Sarah K.", handle: "@sarahk", commentCount: 11, lastCommentDate: "today" },
  { id: 202, name: "Mark T.", handle: "@markt", commentCount: 8, lastCommentDate: "yesterday" },
  { id: 203, name: "Aisha L.", handle: "@aishal", commentCount: 6, lastCommentDate: "2 days ago" },
  { id: 204, name: "John D.", handle: "@johnd", commentCount: 5, lastCommentDate: "3 days ago" },
];