import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Ekosystem from "./pages/Ekosystem";
import FAQ from "./pages/FAQ";
import Grants from "./pages/Grants";
import Misja from "./pages/Misja";
import PlatformaERP from "./pages/PlatformaERP";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ekosystem" element={<Ekosystem />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/dotacje" element={<Grants />} />
          <Route path="/misja" element={<Misja />} />
          <Route path="/platforma-erp-ai" element={<PlatformaERP />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
