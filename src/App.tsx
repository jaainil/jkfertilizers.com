import { useEffect, useRef } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

import { SiteShell } from "@/components/SiteShell";
import { Toaster } from "@/components/ui/sonner";
import { AboutPage } from "@/pages/AboutPage";
import { HistoryPage } from "@/pages/HistoryPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { ServicesPage } from "@/pages/ServicesPage";
import { BlogPage } from "@/pages/BlogPage";
import { BlogPostPage } from "@/pages/BlogPostPage";
import { ServiceDetailPage } from "@/pages/ServiceDetailPage";
import { ContactPage } from "@/pages/ContactPage";
import { PortfolioPage } from "@/pages/PortfolioPage";
import { CommitmentPage } from "@/pages/CommitmentPage";
import { HomePage } from "@/components/HomePage";

// Initialize GA4
ReactGA.initialize("G-L1BQM1V3E3");

const AnalyticsAndScrollTracker = () => {
  const { pathname, search } = useLocation();
  const savedPathNameRef = useRef<string>(pathname);

  useEffect(() => {
    // Send GA4 pageview on route change (for Single Page App routing)
    ReactGA.send({ hitType: "pageview", page: pathname + search, title: document.title });

    if (savedPathNameRef.current !== pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      savedPathNameRef.current = pathname;
    }
  }, [pathname, search]);

  return null;
};

const AppRoutes = () => (
  <SiteShell>
    <AnalyticsAndScrollTracker />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:slug" element={<ProductDetailPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:slug" element={<ServiceDetailPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/commitment" element={<CommitmentPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  </SiteShell>
);

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" />
      </BrowserRouter>
    </HelmetProvider>
  );
}