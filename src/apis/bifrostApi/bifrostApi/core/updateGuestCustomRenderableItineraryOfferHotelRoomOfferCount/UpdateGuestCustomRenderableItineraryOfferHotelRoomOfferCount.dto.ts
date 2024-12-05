import { EitherResponseType } from "@/models/core/monads";

//////////////////////////////////////////////////
// REQUEST ///////////////////////////////////////
//////////////////////////////////////////////////

export interface UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountRequestDto {
  userSessionId: string;
  itineraryOfferId: string;
  hotelRoomId: string;
  updatedCountOffered: number;
}

//////////////////////////////////////////////////
// RESPONSE //////////////////////////////////////
//////////////////////////////////////////////////

export interface UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto {
  itineraryOfferId: string;
  hotelRoomId: string;
  updatedCountOffered: number;
}

export interface UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDto {
  type: EitherResponseType.SUCCESS;

  success: UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto;
}
