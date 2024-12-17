import React from "react";

export interface KismetSectionHeaderProps {
  children: React.ReactNode;
}

export function KismetSectionHeader({ children }: KismetSectionHeaderProps) {
  return <h2 className="font-normal text-lg mb-1">{children}</h2>;
}
