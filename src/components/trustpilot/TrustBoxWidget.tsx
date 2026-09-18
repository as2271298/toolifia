"use client";

import { useEffect, useRef, useState } from "react";

interface TrustBoxWidgetProps {
  className?: string;
}

export function TrustBoxWidget({ className = "" }: TrustBoxWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use IntersectionObserver so the Trustpilot script ONLY loads when user scrolls near the footer
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    // Check if script already injected
    const existingScript = document.getElementById("trustpilot-widget-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "trustpilot-widget-script";
      script.type = "text/javascript";
      script.src = "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
      script.async = true;
      script.onload = () => {
        if (window && (window as any).Trustpilot && containerRef.current) {
          const widgetEl = containerRef.current.querySelector(".trustpilot-widget");
          if (widgetEl) {
            (window as any).Trustpilot.loadFromElement(widgetEl);
          }
        }
      };
      document.body.appendChild(script);
    } else if (window && (window as any).Trustpilot && containerRef.current) {
      const widgetEl = containerRef.current.querySelector(".trustpilot-widget");
      if (widgetEl) {
        (window as any).Trustpilot.loadFromElement(widgetEl);
      }
    }
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className={`my-4 flex justify-center w-full min-h-[52px] ${className}`}>
      <div
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="56278e9abfbbba0bdcd568bc"
        data-businessunit-id="6a69cf20aef288bb4acc52af"
        data-style-height="52px"
        data-style-width="100%"
        data-token="06235af7-3cc5-45b1-8dd8-efbd75f2bc61"
      >
        <a
          href="https://www.trustpilot.com/review/toolifia.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Trustpilot
        </a>
      </div>
    </div>
  );
}
