import { BifrostFormQuestionWithResponse, RenderableItineraryOffer } from "@/models";
import { EitherResponseType } from "@/models/core/monads";
export interface SubmitBifrostFormQuestionsWithResponsesRequestDto {
    hotelId: string;
    userSessionId: string;
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}
export interface SubmitBifrostFormQuestionsWithResponsesSuccessResponseDataDto {
    nextQuestionWithResponse?: BifrostFormQuestionWithResponse;
    renderableItineraryOffers?: RenderableItineraryOffer[];
}
export interface SubmitBifrostFormQuestionsWithResponsesSuccessResponseDto {
    type: EitherResponseType.SUCCESS;
    success: SubmitBifrostFormQuestionsWithResponsesSuccessResponseDataDto;
}
