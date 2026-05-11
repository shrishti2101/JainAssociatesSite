import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import VisionPage from "@/pages/VisionPage";
import TeamPage from "@/pages/TeamPage";
import CalculatorsPage from "@/pages/CalculatorsPage";
import ContactPage from "@/pages/ContactPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<VisionPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/calculators" element={<CalculatorsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster richColors closeButton position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
