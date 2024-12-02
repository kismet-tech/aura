// Overlay.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";

interface OverlayContextType {
  showOverlay: (component: React.ComponentType<any>, props?: any) => void;
  hideOverlay: () => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const useOverlay = (): OverlayContextType => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
};

interface OverlayProviderProps {
  children: ReactNode;
}

export const OverlayProvider: React.FC<OverlayProviderProps> = ({
  children,
}) => {
  const [overlayComponent, setOverlayComponent] =
    useState<React.ComponentType<any> | null>(null);
  const [overlayProps, setOverlayProps] = useState<any>(null);

  const showOverlay = (component: React.ComponentType<any>, props?: any) => {
    setOverlayComponent(() => component);
    setOverlayProps(props);
  };

  const hideOverlay = () => {
    setOverlayComponent(null);
    setOverlayProps(null);
  };

  return (
    <OverlayContext.Provider value={{ showOverlay, hideOverlay }}>
      {overlayComponent ? (
        // <div className="fixed inset-0 z-50 bg-white">
        <div>{React.createElement(overlayComponent, overlayProps)}</div>
      ) : (
        children
      )}
    </OverlayContext.Provider>
  );
};
