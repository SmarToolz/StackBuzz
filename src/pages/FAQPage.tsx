import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "How does the \"search quota\" work for Basic and Pro plans?",
    answer: "The search quota determines how many times you can initiate a live scan of the Substack ecosystem for a new keyword or refresh the data for a saved keyword. Basic users receive a fixed number of searches per month. Pro users get unlimited new searches but have a separate pool of \"update credits\" specifically for refreshing saved keywords to ensure the data is always fresh. If you run out of quota or credits, you can purchase a \"Radar Surge\" to get extra updates instantly.",
  },
  {
    question: "Where does StackBuzz get its trend data from?",
    answer: "StackBuzz uses a proprietary system that monitors public activity across the Substack ecosystem. We focus primarily on analyzing post engagement, specifically comment velocity and volume, across various niches. We do not access private subscriber data; all insights are derived from publicly available information to identify accelerating conversations and high-momentum posts.",
  },
  {
    question: "How is \"Trend Velocity\" calculated, and why is it more important than just comment count?",
    answer: "Trend Velocity measures the rate of change in engagement (comments and replies) over a short period, typically the last 24 to 48 hours, relative to the post's age and the author's average engagement. A high velocity means a conversation is rapidly accelerating right now. This is crucial because it helps you spot a topic that is just starting to go viral, giving you a significant advantage over tools that only show total comment counts on older, already popular posts.",
  },
  {
    question: "What factors determine the \"Creator Match Score\" for potential collaborators?",
    answer: "The Creator Match Score is a composite metric designed to predict the success of a collaboration. It primarily considers three factors: Audience Overlap (We analyze the keywords and topics where your audience and the potential collaborator's audience show shared high engagement.), Cadence & Consistency (We look at their recent posting frequency and reliability.), and Engagement Quality (We assess the depth and velocity of comments on their recent posts, ensuring they attract an active, rather than passive, readership.). A higher score indicates a stronger strategic fit for mutual growth.",
  },
  {
    question: "If I save a keyword, how often is the data updated automatically?",
    answer: "When you save a keyword, StackBuzz continues to monitor its velocity in the background. However, to get the absolute freshest data (the \"Live Pulse\" and updated post lists), you must manually trigger a refresh. This action uses one of your monthly search quotas (Basic) or update credits (Pro). This model ensures that you control when you spend your resources on a live scan, rather than wasting them on topics that haven't changed.",
  },
];

const FAQPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-8 bg-black text-white">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-4 text-brand-primary flex items-center">
          <HelpCircle className="h-8 w-8 mr-3" />
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-400 mb-10">
          Answers to the most common questions about StackBuzz's core features, data, and pricing.
        </p>

        <Accordion type="single" collapsible className="w-full text-left border border-gray-800 rounded-lg p-4 bg-gray-900">
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border-gray-800 last:border-b-0"
            >
              <AccordionTrigger className="text-lg font-semibold text-white hover:no-underline hover:text-brand-primary transition-colors">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-base pt-2 pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQPage;