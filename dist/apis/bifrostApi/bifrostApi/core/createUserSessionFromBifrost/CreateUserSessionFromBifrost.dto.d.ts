import { BifrostFormQuestionWithResponse, EitherResponseType } from "@kismet_ai/foundation";
export interface CreateUserSessionFromBifrostRequestDto {
    hotelId: string;
    bifrostTravelerId?: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    additionalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}
export interface CreateUserSessionFromBifrostSuccessResponseDataDto {
    userSessionId: string;
    nextQuestionWithResponse: BifrostFormQuestionWithResponse;
}
export interface CreateUserSessionFromBifrostSuccessResponseDto {
    type: EitherResponseType.SUCCESS;
    success: CreateUserSessionFromBifrostSuccessResponseDataDto;
}
