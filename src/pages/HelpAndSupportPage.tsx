import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Bug, Mail, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const supportSections = [
  {
    title: "Getting Started",
    icon: Zap,
    content: "New to StackBuzz? Learn how to set up your first keyword search, understand the Pulse Card, and pin your first collaborator target. We cover everything from niche selection to initial outreach strategy.",
    href: "#", // Static link for now
  },
  {
    title: "FAQs",
    icon: HelpCircle,
    content: "Find quick answers to common questions about pricing, data sources, refresh quotas, and how StackBuzz calculates trend velocity and match scores.",
    href: "/faq", // Link to the new FAQ page
  },
  {
    title: "Troubleshooting",
    icon: Bug,
    content: "If your dashboard isn't loading, your search is timing out, or you're experiencing unexpected behavior, check here for common fixes and known issues. (If the issue persists, please report a bug below.)",
    href: "#", // Static link for now
  },
  {
    title: "Contact Support",
    icon: Mail,
    content: "Need personalized help? Our support team is here for Pro users. For Basic and Free users, please check the FAQs first. Email us at support@stackbuzz.app.",
    href: "mailto:support@stackbuzz.app", // Mailto link
  },
];

const HelpAndSupportPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-8 bg-black text-white">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-4 text-brand-primary flex items-center">
          <HelpCircle className="h-8 w-8 mr-3" />
          Help & Support Center
        </h1>
        <p className="text-lg text-gray-400 mb-10">
          Everything you need to maximize your edge with StackBuzz.
        </p>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {supportSections.map((section, index) => {
            const Icon = section.icon;
            const isInternalLink = section.href && section.href.startsWith('/');
            
            const cardContent = (
                <Card 
                  className={cn(
                    "bg-gray-900 border-gray-800 text-white h-full flex flex-col justify-between",
                    isInternalLink && "hover:border-brand-primary/50 transition-colors cursor-pointer"
                  )}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-white flex items-center justify-between">
                      <div className="flex items-center">
                        <Icon className="h-5 w-5 mr-2 text-brand-primary" />
                        {section.title}
                      </div>
                      {isInternalLink && <ChevronRight className="h-5 w-5 text-gray-500" />}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400">{section.content}</p>
                    {section.href && !isInternalLink && (
                        <a 
                            href={section.href} 
                            className="text-sm text-brand-primary hover:text-brand-hover mt-3 inline-block"
                            target={section.href.startsWith('mailto') ? "_self" : "_blank"}
                        >
                            {section.title === "Contact Support" ? "Send Email" : "Learn More"}
                        </a>
                    )}
                  </CardContent>
                </Card>
            );

            if (isInternalLink) {
                return (
                    <Link 
                        key={index} 
                        to={section.href!} 
                        className="block h-full"
                    >
                        {cardContent}
                    </Link>
                );
            }
            
            return (
                <div key={index} className="block h-full">
                    {cardContent}
                </div>
            );
          })}
        </div>

        {/* Report Bug CTA */}
        <Card className="bg-gray-900 border-red-800 border-2 p-6 text-center">
          <h3 className="text-2xl font-bold text-red-400 mb-4">
            Found a Bug? Help Us Fix It!
          </h3>
          <p className="text-gray-400 mb-6">
            If something isn't working as expected, please submit a detailed report.
          </p>
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
            <Link to="/report-bug">
              <Bug className="h-5 w-5 mr-2" />
              Report a Bug
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default HelpAndSupportPage;