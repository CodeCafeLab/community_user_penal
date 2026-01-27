"use client";

import { useEffect } from "react";

/**
 * Dev-only: suppress known noisy extension errors (e.g., MetaMask inpage connect issues)
 * from triggering Next.js' dev overlay.
 *
 * We keep the filter extremely specific to avoid hiding real app errors.
 */
export function DevSuppressExtensionErrors() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const shouldSuppress = (message: string, source?: string) => {
      const m = (message || "").toLowerCase();
      const s = (source || "").toLowerCase();

      // MetaMask inpage script connect noise
      if (m.includes("failed to connect to metamask")) return true;
      if (s.includes("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn")) return true;

      return false;
    };

    const onError = (event: ErrorEvent) => {
      if (!shouldSuppress(String(event.message), event.filename)) return;
      event.preventDefault();
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason as any;
      const msg =
        typeof reason === "string"
          ? reason
          : reason?.message
            ? String(reason.message)
            : "";

      if (!shouldSuppress(msg)) return;
      event.preventDefault();
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}

