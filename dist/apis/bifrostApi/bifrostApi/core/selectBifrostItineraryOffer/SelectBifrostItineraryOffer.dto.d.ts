import { EitherResponseType } from "@/models/core/monads";
export interface SelectBifrostItineraryOfferRequestDto {
    itineraryOfferId: string;
}
export interface SelectBifrostItineraryOfferSuccessResponseDataDto {
}
export interface SelectBifrostItineraryOfferSuccessResponseDto {
    type: EitherResponseType.SUCCESS;
    success: SelectBifrostItineraryOfferSuccessResponseDataDto;
}
