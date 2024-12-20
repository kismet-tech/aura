import { Button } from "@/components/shadcn/button";
import React from "react";

export interface NavigationButtonProps {
  moveForwardChildren: React.ReactNode;
  disabledChildren?: React.ReactNode;
  onClickMoveForward: () => void;
  isEnabled: boolean;
}

export function NavigationButton({
  moveForwardChildren,
  disabledChildren,
  onClickMoveForward,
  isEnabled,
}: NavigationButtonProps) {
  const isButtonClickable = !!disabledChildren ? true : isEnabled;

  return (
    <Button
      className={`ml-auto border border-black text-black bg-transparent hover:bg-black hover:text-white ${
        isButtonClickable
          ? "cursor-pointer"
          : "cursor-not-allowed bg-gray-300 text-gray-500 border-gray-300"
      }`}
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (isButtonClickable) {
          onClickMoveForward();
        }
      }}
      disabled={!isButtonClickable}
    >
      {isEnabled
        ? moveForwardChildren
        : disabledChildren
        ? disabledChildren
        : moveForwardChildren}
    </Button>
  );
}
