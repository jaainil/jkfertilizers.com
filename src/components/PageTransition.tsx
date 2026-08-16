import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Instant scroll to top on page change, preventing any jarring smooth scroll transition
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <div key={pathname} className="page-transition-wrapper animate-page-enter">
      {children}
    </div>
  );
};
