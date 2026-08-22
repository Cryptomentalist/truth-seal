import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewIndex from "./pages/NewIndex";
import Projekty from "./pages/Projekty";
import Oferta from "./pages/Oferta";
import Innowacje from "./pages/Innowacje";
import PiszaONas from "./pages/PiszaONas";
import Ekosystem from "./pages/Ekosystem";
import FAQ from "./pages/FAQ";
import Grants from "./pages/Grants";
import Misja from "./pages/Misja";
import PlatformaERP from "./pages/PlatformaERP";
import PolishAssets from "./pages/PolishAssets";
import Ciekawostki from "./pages/Ciekawostki";
import Sklep from "./pages/Sklep";
import Konto from "./pages/Konto";
import Platnosci from "./pages/Platnosci";
import ResetPassword from "./pages/ResetPassword";
import Klub from "./pages/Klub";
import Unsubscribe from "./pages/Unsubscribe";
import Faktura from "./pages/Faktura";
import AdminLogin from "./pages/AdminLogin";
import AdminEmails from "./pages/AdminEmails";
import NotFound from "./pages/NotFound";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<NewIndex />} />
          <Route path="/projekty" element={<Projekty />} />
          <Route path="/oferta" element={<Oferta />} />
          <Route path="/innowacje" element={<Innowacje />} />
          <Route path="/pisza-o-nas" element={<PiszaONas />} />
          <Route path="/ekosystem" element={<Ekosystem />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/dotacje" element={<Grants />} />
          <Route path="/misja" element={<Misja />} />
          <Route path="/platforma-erp-ai" element={<PlatformaERP />} />
          <Route path="/polishassets" element={<PolishAssets />} />
          <Route path="/ciekawostki" element={<Ciekawostki />} />
          <Route path="/sklep" element={<Sklep />} />
          <Route path="/klub" element={<Klub />} />
          <Route path="/konto" element={<Konto />} />
          <Route path="/platnosci" element={<Platnosci />} />
          <Route path="/reset-hasla" element={<ResetPassword />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="/faktura/:token" element={<Faktura />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/emaile" element={<AdminEmails />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
