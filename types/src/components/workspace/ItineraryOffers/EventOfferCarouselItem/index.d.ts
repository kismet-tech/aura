import React from "react";
import { RenderableItineraryEventOffer } from "../../../../models/RenderableItineraryOffer";
export interface EventOfferCarouselItemProps {
    eventOffer: RenderableItineraryEventOffer;
    onClick: ({ eventOfferId }: {
        eventOfferId: string;
    }) => void;
}
export declare function EventOfferCarouselItem({ eventOffer, onClick, }: EventOfferCarouselItemProps): React.JSX.Element;
