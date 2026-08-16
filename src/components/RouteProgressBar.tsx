import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const RouteProgressBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start progress on path change
    setProgress(20);
    setVisible(true);

    const midTimer = setTimeout(() => {
      setProgress(75);
    }, 70);

    const finishTimer = setTimeout(() => {
      setProgress(100);
    }, 200);

    const hideTimer = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 400);

    return () => {
      clearTimeout(midTimer);
      clearTimeout(finishTimer);
      clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] h-[2.5px] pointer-events-none overflow-hidden"
    >
      <div
        className="h-full bg-primary transition-all ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          transitionDuration: progress === 100 ? "150ms" : "180ms",
        }}
      />
    </div>
  );
};
