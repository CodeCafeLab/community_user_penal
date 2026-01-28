"use client";

import * as React from "react";

export type ThemeMode = "system" | "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
  backgroundEffects: boolean;
  setBackgroundEffects: (v: boolean) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const STORAGE_THEME = "rh_theme";
const STORAGE_REDUCED_MOTION = "rh_reduced_motion";
const STORAGE_BG_EFFECTS = "rh_bg_effects";

function readBool(key: string, fallback: boolean) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return raw === "1" || raw === "true";
  } catch {
    return fallback;
  }
}

function readTheme(): ThemeMode {
  try {
    const raw = localStorage.getItem(STORAGE_THEME) as ThemeMode | null;
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
    return "system";
  } catch {
    return "system";
  }
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
  const isDark = theme === "dark" || (theme === "system" && prefersDark);
  root.classList.toggle("dark", isDark);
  root.dataset.theme = theme;
}

function applyReducedMotion(enabled: boolean) {
  document.documentElement.classList.toggle("reduce-motion", enabled);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<ThemeMode>("system");
  const [reducedMotion, setReducedMotionState] = React.useState(false);
  const [backgroundEffects, setBackgroundEffectsState] = React.useState(true);

  React.useEffect(() => {
    const t = readTheme();
    const rm = readBool(STORAGE_REDUCED_MOTION, false);
    const bg = readBool(STORAGE_BG_EFFECTS, true);
    setThemeState(t);
    setReducedMotionState(rm);
    setBackgroundEffectsState(bg);
    applyTheme(t);
    applyReducedMotion(rm);
  }, []);

  React.useEffect(() => {
    if (theme === "system") {
      const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
      if (!mql) return;
      const handler = () => applyTheme("system");
      mql.addEventListener?.("change", handler);
      return () => mql.removeEventListener?.("change", handler);
    }
  }, [theme]);

  const setTheme = React.useCallback((t: ThemeMode) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_THEME, t);
    } catch {}
    applyTheme(t);
  }, []);

  const setReducedMotion = React.useCallback((v: boolean) => {
    setReducedMotionState(v);
    try {
      localStorage.setItem(STORAGE_REDUCED_MOTION, v ? "1" : "0");
    } catch {}
    applyReducedMotion(v);
  }, []);

  const setBackgroundEffects = React.useCallback((v: boolean) => {
    setBackgroundEffectsState(v);
    try {
      localStorage.setItem(STORAGE_BG_EFFECTS, v ? "1" : "0");
    } catch {}
  }, []);

  const value: ThemeContextValue = {
    theme,
    setTheme,
    reducedMotion,
    setReducedMotion,
    backgroundEffects,
    setBackgroundEffects,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemePrefs() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useThemePrefs must be used within ThemeProvider");
  return ctx;
}

