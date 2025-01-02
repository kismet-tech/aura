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
      {isExpanded && (
        <div
          ref={contentRef}
          className="text-gray-600 mb-2"
        >
          {renderableItineraryHotelRoomOffer.hotelRoomDescription}
        </div>
      )}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-gray-600 hover:text-gray-900 hover:underline text-sm"
      >
        {isExpanded ? "Hide Details <<" : "See Details >>"}
      </button>
    </div>
  );
}
