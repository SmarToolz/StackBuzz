import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is StackBuzz?",
    answer: "StackBuzz is a real-time analytics and trend detection tool built specifically for Substack creators. It helps you discover viral topics, find collaboration partners, and understand reader engagement without spending hours scrolling.",
  },
  {
    question: "How often is the data updated?",
    answer: "The 'Live Pulse' and core trend data are updated frequently to ensure you have the freshest insights. When you run a manual keyword search (Basic/Pro tiers), we perform a live scrape for immediate results.",
  },
  {
    question: "Is StackBuzz affiliated with Substack?",
    answer: "No, StackBuzz is an independent third-party analytics tool built for the Substack ecosystem. We are not affiliated with, endorsed by, or sponsored by Substack, Inc.",
  },
  {
    question: "How does the 'Who to DM Today' feature work?",
    answer: "We categorize potential collaborators into 'Reach Target,' 'Peer Swap,' and 'Rising Star' based on their subscriber count, recent posting cadence, and engagement velocity. We also provide an AI-generated outreach line to help you start the conversation.",
  },
  {
    question: "Do I need to connect my Substack account?",
    answer: "You only need to connect your Substack URL if you want to use the 'Superfans' feature to analyze your own audience's top commenters. All other trend and collaborator data is available via keyword search.",
  },
];

const FAQSection: React.FC = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-white">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="w-full text-left border border-gray-800 rounded-lg p-4 bg-gray-900">
          {faqItems.map((item, index) => (
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
    </section>
  );
};

export default FAQSection;