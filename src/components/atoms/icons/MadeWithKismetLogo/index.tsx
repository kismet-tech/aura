import React from "react";
import { KismetLogo } from "../KismetLogo";

export function MadeWithKismetLogo() {
  return (
    <a href="https://makekismet.com/" target="_blank">
      <div className="flex items-center">
        made with{" "}
        <div className="pointer-events-none ml-2">
          <KismetLogo />
        </div>
      </div>
    </a>
  );
}
