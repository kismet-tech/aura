/// <reference types="react" />
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
export interface ListOfItineraryOffersPresentationProps {
    renderableItineraryOffers: RenderableItineraryOffer[];
    onClick: ({ itineraryOfferId }: {
        itineraryOfferId: string;
    }) => void;
}
export declare function ListOfItineraryOffersPresentation({ renderableItineraryOffers, onClick, }: ListOfItineraryOffersPresentationProps): JSX.Element;
