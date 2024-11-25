import { KismetLogo } from "@/components/icons";
import React from "react";

export interface BifrostFooterProps {}

export function BifrostFooter() {
  return (
    <div className="flex items-center justify-center pt-4">
      made with{" "}
      <a href="https://makekismet.com/" target="_blank" className="ml-2">
        <div className="pointer-events-none">
          <KismetLogo />
        </div>
      </a>
    </div>
  );
}
