/// <reference types="react" />
import { RenderableItineraryOffer } from "../../../../models/RenderableItineraryOffer";
export interface ItineraryOfferRoomEditorProps {
    renderableItineraryOffer: RenderableItineraryOffer;
    onClickUpdateItineraryOfferHotelRoomCount: ({ itineraryOfferId, updatedCountOffered, hotelRoomId, }: {
        itineraryOfferId: string;
        updatedCountOffered: number;
        hotelRoomId: string;
    }) => void;
    onClickExit: () => void;
}
export declare function ItineraryOfferRoomEditor({ renderableItineraryOffer, onClickUpdateItineraryOfferHotelRoomCount, onClickExit, }: ItineraryOfferRoomEditorProps): JSX.Element;
