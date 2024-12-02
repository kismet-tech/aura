/// <reference types="react" />
import { BifrostApiInterface } from "@/apis/bifrostApi/models";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
interface HandleUpdateItineraryOfferHotelRoomCountProps {
    userSessionId: string;
    itineraryOfferId: string;
    hotelRoomId: string;
    updatedCountOffered: number;
    renderableItineraryOffersFromKismetAI: RenderableItineraryOffer[] | undefined;
    customRenderableItineraryOfferFromGuest: RenderableItineraryOffer | undefined;
    setCustomRenderableItineraryOfferFromGuest: React.Dispatch<React.SetStateAction<RenderableItineraryOffer | undefined>>;
    bifrostApi: BifrostApiInterface;
}
export declare const handleUpdateItineraryOfferHotelRoomCount: ({ userSessionId, itineraryOfferId, hotelRoomId, updatedCountOffered, renderableItineraryOffersFromKismetAI, customRenderableItineraryOfferFromGuest, setCustomRenderableItineraryOfferFromGuest, bifrostApi, }: HandleUpdateItineraryOfferHotelRoomCountProps) => Promise<{
    updatedItineraryOfferId: string;
}>;
export {};
