import { RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";
import React, { useState, useRef, useEffect } from "react";

export interface DescriptionAccordionProps {
  renderableItineraryHotelRoomOffer: RenderableItineraryHotelRoomOffer;
}

export function DescriptionAccordion({
  renderableItineraryHotelRoomOffer,
}: DescriptionAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [renderableItineraryHotelRoomOffer.hotelRoomDescription]);

  return (
    <div>
      <div
        ref={contentRef}
        style={{
          height: isExpanded ? `${contentHeight}px` : '24px',
          overflow: 'hidden',
          transition: 'height 0.5s ease'
        }}
      >
        {renderableItineraryHotelRoomOffer.hotelRoomDescription}
      </div>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-black hover:underline mt-2"
      >
        {isExpanded ? 'Show less <<' : 'Show more >>'}
      </button>
    </div>
  );
}