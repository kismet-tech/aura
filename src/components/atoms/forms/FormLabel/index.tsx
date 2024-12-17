import React from "react";

export interface FormLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
}

export function FormLabel({ children, htmlFor }: FormLabelProps) {
  return (
    <label className="font-light text-sm" htmlFor={htmlFor}>
      {children}
    </label>
  );
}
