"use client";

import NextNProgress from "nextjs-progressbar";

interface ProgressBarProviderProps {
  children: React.ReactNode;
}

export function ProgressBarProvider({ children }: ProgressBarProviderProps) {
  return (
    <>
      <NextNProgress color="#000" />
      {children}
    </>
  );
}
