import React from "react";
export interface NavigationButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    isEnabled: boolean;
}
export declare function NavigationButton({ children, onClick, isEnabled, }: NavigationButtonProps): React.JSX.Element;
