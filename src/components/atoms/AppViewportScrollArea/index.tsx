import React from "react";

export interface AppViewportScrollAreaProps {
  children: React.ReactNode;
}

export function AppViewportScrollArea({
  children,
}: AppViewportScrollAreaProps) {
  return <div className="flex-grow overflow-y-auto min-h-0">{children}</div>;
}
