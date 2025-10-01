import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
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
              <Route path="/" element={<MandalaView />} /> {/* done */}
              <Route path="/mandala/:mandalaId" element={<SuktaView />} /> {/* done */}
              <Route path="/sukta/:mandalaId/:suktaId" element={<VerseView />} /> {/* done */}
              <Route path="/vocabulary" element={<VocabularyChart />} /> {/* done */}
              <Route path="/deities" element={<DeityProminenceChart />} /> {/* done */}
              <Route path="/compare" element={<ComparisonPage />} /> {/* done */}
              <Route path="/grammar" element={<NotFound />} /> {/* removed */}
              <Route path="/keywords" element={<NotFound />} /> {/* removed */}
              <Route path="/cultural" element={<NotFound />} /> {/* removed */}
              <Route path="/hymn-length" element={<NotFound />} /> {/* removed */}
              <Route path="/complexity" element={<ComplexityView />} /> {/* done */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
