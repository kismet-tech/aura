import React from "react";
export interface ExpandCollapseButtonProps {
    isCollapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}
export declare function ExpandCollapseButton({ isCollapsed, onExpand, onCollapse, }: ExpandCollapseButtonProps): React.JSX.Element;
