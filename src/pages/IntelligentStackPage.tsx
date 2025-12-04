import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TopicSearch from "@/components/TopicSearch";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Define sub-navigation items
const stackNavItems = [
  { name: "Pulse", path: "pulse" },
  { name: "Collaborators", path: "collaborators" },
  { name: "Superfans", path: "superfans" },
];

const IntelligentStackPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for the topic, shared across all sub-views
  const [currentTopic, setCurrentTopic] = useState("AI Ethics");

  // Determine the active tab based on the current URL path
  const activePath = location.pathname.split('/').pop();
  const defaultTab = stackNavItems[0].path;
  const currentTab = stackNavItems.find(item => item.path === activePath)?.path || defaultTab;

  // Handle initial navigation to a default sub-route if accessing /stack directly
  useEffect(() => {
    if (location.pathname === '/stack' || location.pathname === '/stack/') {
      navigate(`/stack/${defaultTab}`, { replace: true });
    }
  }, [location.pathname, navigate, defaultTab]);


  const handleTopicChange = (newTopic: string) => {
    if (newTopic.trim() === "") {
        toast.error("Please enter a topic to search.");
        return;
    }
    setCurrentTopic(newTopic);
    toast.info(`Intelligent Stack updated for topic: "${newTopic}"`);
    // This state change will implicitly update all components rendered via Outlet
  };

  const handleTabChange = (value: string) => {
    navigate(`/stack/${value}`);
  };

  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Intelligent Stack</h1>
        
        {/* Topic Input (Persists across sub-views) */}
        <TopicSearch initialTopic={currentTopic} onTopicChange={handleTopicChange} />

        {/* Sub-Navigation Tabs */}
        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8 bg-gray-900 border border-gray-800">
            {stackNavItems.map(item => (
                <TabsTrigger 
                    key={item.path} 
                    value={item.path} 
                    className={cn(
                        "data-[state=active]:bg-brand-primary data-[state=active]:text-white",
                        // Ensure the trigger looks active even if the path is slightly different (e.g., trailing slash)
                        currentTab === item.path && "bg-brand-primary text-white"
                    )}
                >
                    {item.name}
                </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Render the specific sub-page content, passing the topic state via context */}
        <Outlet context={{ currentTopic }} />
      </div>
    </div>
  );
};

export default IntelligentStackPage;