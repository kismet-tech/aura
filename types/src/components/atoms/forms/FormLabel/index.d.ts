import React from "react";
export interface FormLabelProps {
    children: React.ReactNode;
    htmlFor?: string;
}
export declare function FormLabel({ children, htmlFor }: FormLabelProps): React.JSX.Element;
