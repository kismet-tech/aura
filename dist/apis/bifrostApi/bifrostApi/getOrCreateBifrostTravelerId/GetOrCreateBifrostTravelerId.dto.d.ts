import { EitherResponseType } from "@/models/core/monads";
export interface GetOrCreateBifrostTravelerIdRequestDto {
}
export interface GetOrCreateBifrostTravelerIdSuccessResponseDataDto {
    bifrostTravelerId: string;
}
export interface GetOrCreateBifrostTravelerIdSuccessResponseDto {
    type: EitherResponseType.SUCCESS;
    success: GetOrCreateBifrostTravelerIdSuccessResponseDataDto;
}
