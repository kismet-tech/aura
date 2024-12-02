import React, { ReactNode } from "react";
interface OverlayContextType {
    showOverlay: (component: React.ComponentType<any>, props?: any) => void;
    hideOverlay: () => void;
}
export declare const useOverlay: () => OverlayContextType;
interface OverlayProviderProps {
    children: ReactNode;
}
export declare const OverlayProvider: React.FC<OverlayProviderProps>;
export {};
