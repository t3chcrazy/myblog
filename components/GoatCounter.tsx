"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

// Same GoatCounter site as the portfolio, so blog and portfolio share one dashboard.
const GOATCOUNTER_ENDPOINT = "https://t3chcrazy.goatcounter.com/count";

// Query params that only describe where a visitor came from. GoatCounter reads
// them from the landing URL (utm_source/ref/via become the referrer, utm_campaign
// the campaign), so they're kept out of the counted path and removed from the
// address bar afterwards so a copied link doesn't carry the old source along.
const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "ref",
  "referrer",
  "via",
];

declare global {
  interface Window {
    goatcounter?: {
      count: (vars?: { path?: string; referrer?: string }) => void;
    };
  }
}

function stripTrackingParams(search: string) {
  const params = new URLSearchParams(search);
  for (const name of TRACKING_PARAMS) params.delete(name);
  const rest = params.toString();
  return rest ? `?${rest}` : "";
}

// count.js only counts the initial page load, so automatic counting is turned
// off and every view (first load and client-side navigations) is counted here.
// window.location includes the /blog basePath, matching how the portfolio's
// "/blog" pages are recorded.
export function GoatCounter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastCounted = useRef<string | null>(null);

  const countView = () => {
    const { origin, pathname: fullPath, search, hash } = window.location;
    const path = fullPath + stripTrackingParams(search);
    if (!window.goatcounter?.count || lastCounted.current === path) return;

    // The landing view uses count.js's own source detection: UTM/ref params
    // first, then document.referrer (e.g. google.com, linkedin.com). After a
    // client-side navigation document.referrer still points at that external
    // site, so later views pass the previous page instead and stay internal.
    const previous = lastCounted.current;
    lastCounted.current = path;
    window.goatcounter.count(
      previous === null ? { path } : { path, referrer: origin + previous },
    );

    if (path !== fullPath + search) {
      window.history.replaceState(window.history.state, "", path + hash);
    }
  };

  useEffect(countView, [pathname, searchParams]);

  return (
    <Script
      src="https://gc.zgo.at/count.js"
      data-goatcounter={GOATCOUNTER_ENDPOINT}
      data-goatcounter-settings='{"no_onload": true}'
      onLoad={countView}
    />
  );
}
