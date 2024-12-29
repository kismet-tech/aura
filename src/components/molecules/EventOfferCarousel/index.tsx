import React from "react";
import {
  EventOfferCarouselItemSaaS,
  EventOfferCarouselItemSaaSProps,
} from "../../atoms/EventOfferCarouselItemSaaS";

export interface EventOfferCarouselProps {
  items: Omit<EventOfferCarouselItemSaaSProps, "className">[];
}

/**
 * A responsive component that displays EventOfferCarouselItemSaaS in a horizontal
 * scrollable container.
 */
export function EventOfferCarousel({ items }: EventOfferCarouselProps) {
  return (
    <div className="flex flex-row gap-4 overflow-x-auto">
      {items.map((item, index) => (
        <div key={index} className="flex-shrink-0">
          <EventOfferCarouselItemSaaS {...item} />
        </div>
      ))}
    </div>
  );
}
