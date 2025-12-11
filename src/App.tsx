import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage"; // Updated import
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
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import PricingPage from "./pages/PricingPage";
import { Layout } from "./components/Layout";
import { DashboardLayout } from "./components/DashboardLayout";
import { SupabaseAuthProvider } from "./context/SupabaseAuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SupabaseAuthProvider> {/* Wrap routes with Auth Provider */}
          <Routes>
            {/* Standard Layout Group (PublicHeader + Footer) */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} /> {/* Now uses Layout */}
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/trial" element={<TrialPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} /> {/* Thank you page should also have header/footer */}
              {/* Catch-all for 404 within the standard layout */}
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
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
            </Route>
            
            {/* Admin Protected Route */}
            <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Routes>
        </SupabaseAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;