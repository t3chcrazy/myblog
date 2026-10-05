"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

// Same GoatCounter site as the portfolio, so blog and portfolio share one dashboard.
const GOATCOUNTER_ENDPOINT = "https://t3chcrazy.goatcounter.com/count";

declare global {
  interface Window {
    goatcounter?: { count: (vars?: { path?: string }) => void };
  }
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
    const path = window.location.pathname + window.location.search;
    if (!window.goatcounter?.count || lastCounted.current === path) return;
    lastCounted.current = path;
    window.goatcounter.count({ path });
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
