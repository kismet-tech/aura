import React from "react";
export type KismetTextAreaProps = {
    value: string;
    setValue: ({ updatedValue }: {
        updatedValue: string;
    }) => void;
    placeholder?: string;
    inputId?: string;
    onFocus?: () => void;
    onLoseFocus?: () => void;
} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
export declare function KismetTextArea({ value, setValue, placeholder, inputId, onFocus, onLoseFocus, ...props }: KismetTextAreaProps): React.JSX.Element;
