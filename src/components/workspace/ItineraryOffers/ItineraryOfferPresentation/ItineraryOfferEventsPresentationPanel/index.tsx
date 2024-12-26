import React from "react";
import { KismetSectionHeader } from "@/components/atoms";
import { Carousel } from "@/components/displays/Carousel";
import {
  RenderableItineraryOffer,
  RenderableItineraryEventOffer,
} from "@kismet_ai/foundation";
import { EventOfferCarouselItemSaaS } from "../../../../atoms/EventOfferCarouselItemSaaS";

export interface ItineraryOfferEventsPresentationPanelProps {
  renderableItineraryOffer: RenderableItineraryOffer;
}

export function ItineraryOfferEventsPresentationPanel({
  renderableItineraryOffer,
}: ItineraryOfferEventsPresentationPanelProps) {
  const eventOffers: RenderableItineraryEventOffer[] =
    renderableItineraryOffer.eventOffers;

  if (eventOffers.length === 0) {
    return <></>;
  }

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
            <EventOfferCarouselItemSaaS
              eventOffer={eventOffer}
              onClick={() => { }}
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
