import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";
import { EitherResponseType } from "@kismet_ai/foundation";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
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
