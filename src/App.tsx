import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TrialPage from "./pages/TrialPage";
import TrendsPage from "./pages/TrendsPage";
import NotFound from "./pages/NotFound";
import ThankYouPage from "./pages/ThankYouPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import ExportsPage from "./pages/ExportsPage";
import IntelligentStackPage from "./pages/IntelligentStackPage";
import PulsePage from "./pages/PulsePage";
import CollaboratorsPage from "./pages/CollaboratorsPage";
import SuperfansPage from "./pages/SuperfansPage";
import { Layout } from "./components/Layout";
import { DashboardLayout } from "./components/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Standalone Routes (No Layout) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          
          {/* Standard Layout Group (Header + Footer) */}
          <Route element={<Layout />}>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/trial" element={<TrialPage />} />
            {/* Catch-all for 404 within the standard layout */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Dashboard Layout Group (Header + Sidebar + Footer) */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/trends" element={<TrendsPage />} />
            <Route path="/history" element={<SearchHistoryPage />} />
            <Route path="/exports" element={<ExportsPage />} />
            
            {/* Intelligent Stack Nested Routes */}
            <Route path="/stack" element={<IntelligentStackPage />}>
                <Route index element={<PulsePage />} /> {/* Default route for /stack */}
                <Route path="pulse" element={<PulsePage />} />
                <Route path="collaborators" element={<CollaboratorsPage />} />
                <Route path="superfans" element={<SuperfansPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;