import React from "react";

export interface AppViewportProps {
  children: React.ReactNode;
}

export function AppViewport({ children }: AppViewportProps) {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col justify-between py-8 overflow-hidden w-1/2 mx-auto border border-gray-300 px-8">
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  );
}
