import React from "react";

export interface KismetHeaderProps {
  children: React.ReactNode;
}

export function KismetHeader({ children }: KismetHeaderProps) {
  return <h2 className="text-xl font-semibold mt-4">{children}</h2>;
}
