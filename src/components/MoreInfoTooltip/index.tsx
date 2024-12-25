import React, { useState } from "react";
import { Info } from "lucide-react";

interface MoreInfoTooltipProps {
  content: string;
}

export function MoreInfoTooltip({ content }: MoreInfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateTooltipPosition = (event: React.MouseEvent) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  return (
    <div className="relative inline-block">
      <Info 
        className="h-4 w-4 cursor-help text-gray-500" 
        onMouseEnter={(e) => {
          setIsVisible(true);
          updateTooltipPosition(e);
        }}
        onMouseMove={updateTooltipPosition}
        onMouseLeave={() => setIsVisible(false)}
      />
      
      {isVisible && (
        <div 
          className="fixed transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-[60]"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, calc(-100% - 10px))'
          }}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          {content}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      )}
    </div>
  );
} 