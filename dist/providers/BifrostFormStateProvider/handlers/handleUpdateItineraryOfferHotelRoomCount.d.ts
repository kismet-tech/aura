/// <reference types="react" />
import { BifrostApiInterface } from "@/apis/bifrostApi/models";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
interface HandleUpdateItineraryOfferHotelRoomCountProps {
    userSessionId: string;
    itineraryOfferId: string;
    hotelRoomOfferId: string;
    updatedCountOffered: number;
    renderableItineraryOffersFromKismetAI: RenderableItineraryOffer[] | undefined;
    customRenderableItineraryOfferFromGuest: RenderableItineraryOffer | undefined;
    setCustomRenderableItineraryOfferFromGuest: React.Dispatch<React.SetStateAction<RenderableItineraryOffer | undefined>>;
    bifrostApi: BifrostApiInterface;
}
export declare const handleUpdateItineraryOfferHotelRoomCount: ({ userSessionId, itineraryOfferId, hotelRoomOfferId, updatedCountOffered, renderableItineraryOffersFromKismetAI, customRenderableItineraryOfferFromGuest, setCustomRenderableItineraryOfferFromGuest, bifrostApi, }: HandleUpdateItineraryOfferHotelRoomCountProps) => Promise<{
    updatedItineraryOfferId: string;
}>;
export {};
