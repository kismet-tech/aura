import { EitherResponseType } from "@kismet_ai/foundation";
export interface SelectBifrostItineraryOfferRequestDto {
    itineraryOfferId: string;
}
export interface SelectBifrostItineraryOfferSuccessResponseDataDto {
}
export interface SelectBifrostItineraryOfferSuccessResponseDto {
    type: EitherResponseType.SUCCESS;
    success: SelectBifrostItineraryOfferSuccessResponseDataDto;
}
