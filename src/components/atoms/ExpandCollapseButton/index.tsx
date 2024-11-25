import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

export interface ExpandCollapseButtonProps {
  isCollapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export function ExpandCollapseButton({
  isCollapsed,
  onExpand,
  onCollapse,
}: ExpandCollapseButtonProps) {
  return isCollapsed ? (
    <ChevronDown
      onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.preventDefault();
        onExpand();
      }}
    />
  ) : (
    <ChevronUp
      onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.preventDefault();
        onCollapse();
      }}
    />
  );
}
