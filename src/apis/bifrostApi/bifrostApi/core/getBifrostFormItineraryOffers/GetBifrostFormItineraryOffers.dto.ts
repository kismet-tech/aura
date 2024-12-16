import {
  BifrostFormQuestionWithResponse,
  EitherResponseType,
  RenderableItineraryOffer,
} from "@kismet_ai/foundation";

//////////////////////////////////////////////////
// REQUEST ///////////////////////////////////////
//////////////////////////////////////////////////

export interface GetBifrostFormItineraryOffersRequestDto {
  hotelId: string;
  userSessionId: string;

  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}

//////////////////////////////////////////////////
// RESPONSE //////////////////////////////////////
//////////////////////////////////////////////////

export interface GetBifrostFormItineraryOffersSuccessResponseDataDto {
  renderableItineraryOffers?: RenderableItineraryOffer[];
}

export interface GetBifrostFormItineraryOffersSuccessResponseDto {
  type: EitherResponseType.SUCCESS;

  success: GetBifrostFormItineraryOffersSuccessResponseDataDto;
}
