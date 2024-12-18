import React from "react";

// export interface FormFieldProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
//  {
//   children: React.ReactNode;
// }
export type FormFieldProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function FormField({ children, ...props }: FormFieldProps) {
  return (
    <div className="grid w-full items-center gap-1.0" {...props}>
      {children}
    </div>
  );
}
