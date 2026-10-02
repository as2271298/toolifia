"use client";

import Script from "next/script";

interface MyWotBadgeProps {
  className?: string;
}

export function MyWotBadge({ className = "" }: MyWotBadgeProps) {
  return (
    <>
      <Script
        src="https://static.mywot.com/website_owners_badges/websiteOwnersBadge.js"
        strategy="lazyOnload"
      />
      <div className={`flex items-center justify-center ${className}`}>
        <a
          id="wot-badge2"
          className="wot-badge_dark"
          href="https://www.mywot.com/scorecard/toolifia.vercel.app?wot_badge=2_black"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="MyWOT Verified Site - See Toolifia Trust Report"
        >
          <div className="wot-secured-container">
            <div className="wot-shield-background"></div>
            <div className="wot-text-container">
              <p className="wot-secured-bold">Verified Site</p>
              <div className="wot-trusted-container">
                <div className="wot-trusted">Trusted by</div>
                <div className="wot-logo"></div>
              </div>
            </div>
          </div>
          <div className="wot-vertical"></div>
          <p className="wot-report">See Report</p>
        </a>
      </div>
    </>
  );
}
