import React from "react";
import { KismetSectionHeader } from "@/components/atoms";
import { Carousel } from "@/components/displays/Carousel";
import {
  RenderableItineraryOffer,
  RenderableItineraryEventOffer,
} from "@/models/RenderableItineraryOffer";
import { EventOfferCarouselItem } from "../../EventOfferCarouselItem";

export interface ItineraryOfferEventsPresentationPanelProps {
  renderableItineraryOffer: RenderableItineraryOffer;
}

export function ItineraryOfferEventsPresentationPanel({
  renderableItineraryOffer,
}: ItineraryOfferEventsPresentationPanelProps) {
  const eventOffers: RenderableItineraryEventOffer[] =
    renderableItineraryOffer.eventOffers;

  return (
    <div>
      <KismetSectionHeader>
        <div className="flex items-center space-x-2">Events</div>
      </KismetSectionHeader>
      <p className="text-sm text-gray-600 mt-0">
        {renderableItineraryOffer.descriptionOfAllEventOffers}
      </p>

      <Carousel
        spaceBetween={-40}
        items={eventOffers}
        renderItem={(eventOffer: RenderableItineraryEventOffer) => {
          return (
            <EventOfferCarouselItem
              eventOffer={eventOffer}
              onClick={() => {}}
            />
          );
        }}
        itemKey={(eventOffer: RenderableItineraryEventOffer) =>
          eventOffer.eventOfferId
        }
        interItemComponent={<></>}
      />
    </div>
  );
}