import React from "react";
import { MadeWithKismetLogo } from "../icons/MadeWithKismetLogo";

export interface BifrostFooterProps {}

export function BifrostFooter() {
  return (
    <div className="flex items-center justify-center pt-4">
      <MadeWithKismetLogo />
    </div>
  );
}
