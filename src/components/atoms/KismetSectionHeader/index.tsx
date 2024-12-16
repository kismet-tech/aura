import React from "react";

export interface KismetSectionHeaderProps {
  children: React.ReactNode;
}

export function KismetSectionHeader({ children }: KismetSectionHeaderProps) {
  return <h2 className="font-medium">{children}</h2>;
}
