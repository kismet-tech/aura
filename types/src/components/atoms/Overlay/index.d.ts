import React, { ReactNode } from "react";
interface OverlayContextType {
    overlay: ReactNode | null;
    setOverlay: (overlayContent: ReactNode) => void;
    clearOverlay: () => void;
}
export declare const useOverlay: () => OverlayContextType;
interface OverlayProviderProps {
    children: ReactNode;
}
export declare const OverlayProvider: React.FC<OverlayProviderProps>;
export {};
