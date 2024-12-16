/// <reference types="react" />
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
export interface ItineraryOfferRoomEditorProps {
    renderableItineraryOffer: RenderableItineraryOffer;
    onClickUpdateItineraryOfferHotelRoomCount: ({ itineraryOfferId, updatedCountOffered, hotelRoomOfferId, }: {
        itineraryOfferId: string;
        updatedCountOffered: number;
        hotelRoomOfferId: string;
    }) => void;
    onClickExit: () => void;
}
export declare function ItineraryOfferRoomEditor({ renderableItineraryOffer, onClickUpdateItineraryOfferHotelRoomCount, onClickExit, }: ItineraryOfferRoomEditorProps): JSX.Element;
