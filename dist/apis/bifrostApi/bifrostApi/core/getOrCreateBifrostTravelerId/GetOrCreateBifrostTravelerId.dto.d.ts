import { EitherResponseType } from "@kismet_ai/foundation";
export interface GetOrCreateBifrostTravelerIdRequestDto {
}
export interface GetOrCreateBifrostTravelerIdSuccessResponseDataDto {
    bifrostTravelerId: string;
}
export interface GetOrCreateBifrostTravelerIdSuccessResponseDto {
    type: EitherResponseType.SUCCESS;
    success: GetOrCreateBifrostTravelerIdSuccessResponseDataDto;
}
