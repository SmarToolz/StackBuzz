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