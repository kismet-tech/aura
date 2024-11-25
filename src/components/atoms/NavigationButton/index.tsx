import { Button } from "@/components/shadcn/button";
import React from "react";

export interface NavigationButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isEnabled: boolean;
}

export function NavigationButton({
  children,
  onClick,
  isEnabled,
}: NavigationButtonProps) {
  return (
    <Button
      className={`ml-auto border border-black text-black bg-transparent hover:bg-black hover:text-white ${
        isEnabled
          ? "cursor-pointer"
          : "cursor-not-allowed bg-gray-300 text-gray-500 border-gray-300"
      }`}
      onClick={isEnabled ? onClick : undefined}
      disabled={!isEnabled}
    >
      {children}
    </Button>
  );
}
