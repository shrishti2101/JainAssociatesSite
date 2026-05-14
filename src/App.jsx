import React from "react";
import "@/App.css";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import VisionPage from "@/pages/VisionPage";
import TeamPage from "@/pages/TeamPage";
import CalculatorsPage from "@/pages/CalculatorsPage";
import Policy from "@/pages/Policy";
import ContactPage from "@/pages/ContactPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App">
      <HashRouter>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<VisionPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/calculators" element={<CalculatorsPage />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster richColors closeButton position="top-right" />
      </HashRouter>
    </div>
  );
}

export default App;
