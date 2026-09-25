"use client";

import { useEffect, useState } from "react";

/** True after first client render, so persisted store reads don't mismatch SSR. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
