import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
import React from "react";
import { AlternativeItineraryOfferPreview } from "../../ItineraryOfferPresentation/AlternativeItineraryOfferPreview";
import { Button } from "@/components/shadcn/button";
import { ArrowRight } from "lucide-react";

export interface ItineraryOfferPresentationSummaryProps {
  renderableItineraryOffer: RenderableItineraryOffer;
  itineraryOfferIndex: number;
  onClick: () => void;
}

export function ItineraryOfferPresentationSummary({
  renderableItineraryOffer,
  itineraryOfferIndex,
  onClick,
}: ItineraryOfferPresentationSummaryProps) {
  return (
    <div className="flex items-center justify-between bg-white pr-4">
      <AlternativeItineraryOfferPreview
        renderableItineraryOffer={renderableItineraryOffer}
        itineraryOfferIndex={itineraryOfferIndex}
        onClick={() => {}}
      />
      <Button
        className="flex items-center bg-transparent hover:bg-transparent border border-black text-black rounded-full w-auto px-4 py-2 text-lg lowercase"
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          event.preventDefault();
          onClick();
        }}
      >
        info <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
}
