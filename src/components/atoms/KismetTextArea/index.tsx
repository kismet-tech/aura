import React, { useState } from "react";

export type KismetTextAreaProps = {
  value: string;
  setValue: ({ updatedValue }: { updatedValue: string }) => void;

  placeholder?: string;
  inputId?: string;
  onFocus?: () => void;
  onLoseFocus?: () => void;
} & React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export function KismetTextArea({
  value,
  setValue,
  placeholder,
  inputId,
  onFocus,
  onLoseFocus,
  ...props
}: KismetTextAreaProps) {
  const [_isLocallyFocused, setIsLocallyFocused] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue({ updatedValue: event.target.value });
  };

  const handleFocus = () => {
    setIsLocallyFocused(true);
    if (onFocus) {
      onFocus();
    }
  };
  const handleBlur = () => {
    setIsLocallyFocused(false);
    if (onLoseFocus) {
      onLoseFocus();
    }
  };

  return (
    <textarea
      onChange={handleOnChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      id={inputId}
      placeholder={placeholder}
      value={value}
      className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      style={{ backgroundColor: "rgb(250, 249, 239)" }}
      {...props}
    />
  );
}
