import { EitherResponseType } from "@kismet_ai/foundation";
export interface UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountRequestDto {
    userSessionId: string;
    itineraryOfferId: string;
    hotelRoomOfferId: string;
    updatedCountOffered: number;
}
export interface UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto {
    itineraryOfferId: string;
    hotelRoomOfferId: string;
    updatedCountOffered: number;
}
export interface UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDto {
    type: EitherResponseType.SUCCESS;
    success: UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto;
}
