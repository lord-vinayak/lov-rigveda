import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import MandalaView from "./pages/MandalaView";
import SuktaView from "./pages/SuktaView";
import VerseView from "./pages/VerseView";
import VocabularyChart from "./pages/VocabularyChart";
import DeityProminenceChart from "./pages/DeityProminenceChart";
import ComparisonPage from "./pages/ComparisonPage";
import GrammarHeatmap from "./pages/GrammarHeatmap";
import KeywordTracker from "./pages/KeywordTracker";
import CulturalMap from "./pages/CulturalMap";
import HymnLengthChart from "./pages/HymnLengthChart";
import ComplexityView from "./pages/ComplexityView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/mandala/:mandalaId" element={<SuktaView />} />
              <Route path="/sukta/:mandalaId/:suktaId" element={<VerseView />} />
              <Route path="/vocabulary" element={<VocabularyChart />} />
              <Route path="/deities" element={<DeityProminenceChart />} />
              <Route path="/compare" element={<ComparisonPage />} />
              <Route path="/grammar" element={<GrammarHeatmap />} />
              <Route path="/keywords" element={<KeywordTracker />} />
              <Route path="/cultural" element={<CulturalMap />} />
              <Route path="/hymn-length" element={<HymnLengthChart />} />
              <Route path="/complexity" element={<ComplexityView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
