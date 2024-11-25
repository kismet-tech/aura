import React from "react";

export interface ValidationErrorProps {
  children: React.ReactNode;
}

export function ValidationError({ children }: ValidationErrorProps) {
  return <small style={{ color: "red" }}>{children}</small>;
}
