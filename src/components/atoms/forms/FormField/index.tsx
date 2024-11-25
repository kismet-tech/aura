import React from "react";

export interface FormFieldProps {
  children: React.ReactNode;
}

export function FormField({ children }: FormFieldProps) {
  return <div className="grid w-full items-center gap-1.5">{children}</div>;
}
