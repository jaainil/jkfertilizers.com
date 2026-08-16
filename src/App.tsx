import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

import { SiteShell } from "@/components/SiteShell";
import { SiteLoader } from "@/components/SiteLoader";
import { RouteProgressBar } from "@/components/RouteProgressBar";
import { PageTransition } from "@/components/PageTransition";
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
import { PrivacyPage } from "@/pages/PrivacyPage";
import { ReturnPolicyPage } from "@/pages/ReturnPolicyPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { HomePage } from "@/components/HomePage";

// Initialize GA4
ReactGA.initialize("G-L1BQM1V3E3");

const AnalyticsTracker = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Send GA4 pageview on route change (for Single Page App routing)
    ReactGA.send({ hitType: "pageview", page: pathname + search, title: document.title });
  }, [pathname, search]);

  return null;
};

const AppRoutes = () => (
  <SiteShell>
    <RouteProgressBar />
    <AnalyticsTracker />
    <PageTransition>
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
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/confidentiality-privacy" element={<PrivacyPage />} />
        <Route path="/return-policy" element={<ReturnPolicyPage />} />
        <Route path="/refund-policy" element={<ReturnPolicyPage />} />
        <Route path="/refund-and-returns-policy" element={<ReturnPolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageTransition>
  </SiteShell>
);

export default function App() {
  return (
    <HelmetProvider>
      <SiteLoader />
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" />
      </BrowserRouter>
    </HelmetProvider>
  );
}