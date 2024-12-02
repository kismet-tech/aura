import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";

export interface BifrostApiInterface {
  createUserSessionFromBifrost: ({
    hotelId,
    bifrostFormQuestionsWithResponses,
  }: {
    hotelId: string;
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  }) => Promise<{
    userSessionId: string;
    nextQuestionWithResponse: BifrostFormQuestionWithResponse;
  }>;

  submitBifrostFormQuestionWithResponse: ({
    userSessionId,
    bifrostFormQuestionWithResponse,
  }: {
    userSessionId: string;
    bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  }) => Promise<{
    nextQuestionWithResponse?: BifrostFormQuestionWithResponse;
    renderableItineraryOffers?: RenderableItineraryOffer[];
  }>;

  //////////////////////////////////////////////////
  // Edit RenderableItineraryOffer
  //////////////////////////////////////////////////

  guestUpdateCustomRenderableItineraryOfferHotelRoomOfferCount: ({
    userSessionId,
    itineraryOfferId,
    hotelRoomId,
    updatedCountOffered,
  }: {
    userSessionId: string;
    itineraryOfferId: string;
    hotelRoomId: string;
    updatedCountOffered: number;
  }) => Promise<{
    itineraryOfferId: string;
    hotelRoomId: string;
    updatedCountOffered: number;
  }>;
}
