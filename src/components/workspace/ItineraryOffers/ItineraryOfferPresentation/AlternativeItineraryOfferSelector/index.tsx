import { ArrowLeftRight } from "lucide-react";
import { AlternativeItineraryOfferPreview } from "../AlternativeItineraryOfferPreview";
import React from "react";
import { Carousel } from "@/components/displays/Carousel";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";

export interface AlternativeItineraryOfferSelectorProps {
  renderableItineraryOffers: RenderableItineraryOffer[];
  onSelectAlternativeItineraryOffer: ({
    itineraryOfferId,
  }: {
    itineraryOfferId: string;
  }) => void;
}

export function AlternativeItineraryOfferSelector({
  renderableItineraryOffers,
  onSelectAlternativeItineraryOffer,
}: AlternativeItineraryOfferSelectorProps) {
  return (
    <Carousel
      items={renderableItineraryOffers}
      renderItem={(
        renderableItineraryOffer: RenderableItineraryOffer,
        itineraryOfferIndex: number
      ) => (
        <div className="h-full cursor-pointer border border-gray-300 border-solid">
          <AlternativeItineraryOfferPreview
            onClick={() => {
              onSelectAlternativeItineraryOffer({
                itineraryOfferId: renderableItineraryOffer.itineraryOfferId,
              });
            }}
            renderableItineraryOffer={renderableItineraryOffer}
            itineraryOfferIndex={itineraryOfferIndex}
          />
        </div>
      )}
      itemKey={(renderableItineraryOffer: RenderableItineraryOffer) =>
        renderableItineraryOffer.itineraryOfferId
      }
      interItemComponent={
        <div className="h-full flex items-center justify-center">
          <ArrowLeftRight className="w-6 h-6 text-gray-500" />
        </div>
      }
    />
  );
}
