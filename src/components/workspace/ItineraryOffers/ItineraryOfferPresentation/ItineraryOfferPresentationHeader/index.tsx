import React from "react";
import {
  RenderableItineraryOffer,
  RenderableItineraryOfferCriterion,
} from "@kismet_ai/foundation";
import { KismetHeader } from "../../../../atoms";

export interface ItineraryOfferPresentationHeaderProps {
  renderableItineraryOffer: RenderableItineraryOffer;
  itineraryOfferIndex: number;
}

export function ItineraryOfferPresentationHeader({
  renderableItineraryOffer,
  itineraryOfferIndex,
}: ItineraryOfferPresentationHeaderProps) {
  return (
    <div>
      <KismetHeader>Option #{itineraryOfferIndex + 1} detail</KismetHeader>

      <div className="mt-2">
        {renderableItineraryOffer.itineraryOfferDescription}
      </div>

      <ul className="list-disc pl-5 mt-4">
        {renderableItineraryOffer.criteria.map(
          (
            {
              criterionName,
              doesMatchCriterion,
            }: RenderableItineraryOfferCriterion,
            index: number
          ) => (
            <li key={index}>
              {criterionName} | {doesMatchCriterion ? "Yes" : "No"}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
