import React from "react";

export interface AppViewportProps {
  children: React.ReactNode;
}

export function AppViewport({ children }: AppViewportProps) {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col py-8 w-full md:w-1/2 mx-auto md:mx-auto border border-gray-300 min-w-[332px] max-w-[600px]">
      <div className="flex-1 flex flex-col overflow-y-auto px-4">
        {children}
      </div>
    </div>
  );
}
