// Overlay.tsx
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

// Define the shape of the Overlay context
interface OverlayContextType {
  overlay: ReactNode | null;
  setOverlay: (overlayContent: ReactNode) => void;
  clearOverlay: () => void;
}

// Create the Overlay context
const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

// Custom hook to use the Overlay context
export const useOverlay = (): OverlayContextType => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
};

// Define the props for the Overlay provider
interface OverlayProviderProps {
  children: ReactNode;
}

// Overlay Provider Component
export const OverlayProvider: React.FC<OverlayProviderProps> = ({
  children,
}) => {
  const [overlay, setOverlayState] = useState<ReactNode | null>(null);

  const setOverlay = (overlayContent: ReactNode) => {
    setOverlayState(overlayContent);
  };

  const clearOverlay = () => {
    setOverlayState(null);
  };

  // Optional: Close overlay on Esc key press for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearOverlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <OverlayContext.Provider value={{ overlay, setOverlay, clearOverlay }}>
      {children}
      {overlay && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          {overlay}
        </div>
      )}
    </OverlayContext.Provider>
  );
};
