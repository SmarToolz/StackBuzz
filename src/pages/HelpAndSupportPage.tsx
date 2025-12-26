import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Bug, Mail, Zap } from "lucide-react";

const supportSections = [
  {
    title: "Getting Started",
    icon: Zap,
    content: "New to StackBuzz? Learn how to set up your first keyword search, understand the Pulse Card, and pin your first collaborator target. We cover everything from niche selection to initial outreach strategy.",
  },
  {
    title: "FAQs",
    icon: HelpCircle,
    content: "Find quick answers to common questions about pricing, data sources, refresh quotas, and how StackBuzz calculates trend velocity and match scores. (See also the FAQ section on the homepage.)",
  },
  {
    title: "Troubleshooting",
    icon: Bug,
    content: "If your dashboard isn't loading, your search is timing out, or you're experiencing unexpected behavior, check here for common fixes and known issues. (If the issue persists, please report a bug below.)",
  },
  {
    title: "Contact Support",
    icon: Mail,
    content: "Need personalized help? Our support team is here for Pro users. For Basic and Free users, please check the FAQs first. Email us at support@stackbuzz.app.",
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
            return (
              <Card key={index} className="bg-gray-900 border-gray-800 text-white h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-white flex items-center">
                    <Icon className="h-5 w-5 mr-2 text-brand-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">{section.content}</p>
                </CardContent>
              </Card>
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