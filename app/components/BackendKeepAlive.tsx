"use client";

import { useEffect } from "react";

import { buildApiUrl } from "../../lib/api";

export default function BackendKeepAlive() {
  useEffect(() => {
    const ping = async () => {
      try {
        await fetch(buildApiUrl("/api/v1/health"), {
          method: "GET",
          cache: "no-store",
        });
      } catch {
        // Ignore keepalive failures during demo mode.
      }
    };

    ping();
    const intervalId = window.setInterval(ping, 30_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return null;
}
