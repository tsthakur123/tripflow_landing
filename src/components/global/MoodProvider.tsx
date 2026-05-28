"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type MoodContextType = {
  globalMood: string | null;
  setGlobalMood: (mood: string | null) => void;
};

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [globalMood, setGlobalMood] = useState<string | null>(null);

  return (
    <MoodContext.Provider value={{ globalMood, setGlobalMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
}
