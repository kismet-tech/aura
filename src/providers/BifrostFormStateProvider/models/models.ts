import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { ReactNode } from "react";
import { BifrostFormApplicationStage } from "./BifrostFormApplicationStage";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { BifrostApiInterface } from "@/apis/bifrostApi/models";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";

export interface BifrostFormStateProviderProps {
  children: ReactNode;
  bifrostApi: BifrostApiInterface;
}

export interface BifrostFormStateContextValue {
  /////////////////////////
  // Navigation
  /////////////////////////
  bifrostFormApplicationStage: BifrostFormApplicationStage;
  // progressToNextBifrostFormApplicationStage: () => Promise<void>;
  stepBackToPreviousBifrostFormApplicationStage: () => Promise<void>;

  beginUserSession: () => Promise<void>;
  submitBifrostFormQuestion: () => Promise<void>;
  paymentsPageUrl: string;
  /////////////////////////
  // Form Question Responses
  /////////////////////////
  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];

  setBifrostFormQuestionsWithResponses: ({
    updatedBifrostFormQuestionsWithResponses,
  }: {
    updatedBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  }) => void;

  setBifrostFormQuestionWithResponse: ({
    updatedBifrostFormQuestionWithResponse,
  }: {
    updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  }) => void;

  /////////////////////////
  // Active Form Questions
  /////////////////////////
  activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  setActiveBifrostFormQuestionsWithResponses: ({
    updatedActiveBifrostFormQuestionsWithResponses,
  }: {
    updatedActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  }) => void;

  /////////////////////////
  // Historical Form Questions
  /////////////////////////

  historicalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];

  /////////////////////////
  // Pending Itinerary
  /////////////////////////
  renderablePendingItinerary: RenderablePendingItinerary;

  /////////////////////////
  // Itinerary Offers
  /////////////////////////
  renderableItineraryOffersFromKismetAI: RenderableItineraryOffer[] | undefined;
  customRenderableItineraryOfferFromGuest: RenderableItineraryOffer | undefined;
  setRenderableItineraryOffersFromKismetAI: ({
    updatedRenderableItineraryOffers,
  }: {
    updatedRenderableItineraryOffers: RenderableItineraryOffer[];
  }) => void;

  updateItineraryOfferHotelRoomCount: ({
    itineraryOfferId,
    hotelRoomId,
    updatedCountOffered,
  }: {
    itineraryOfferId: string;
    hotelRoomId: string;
    updatedCountOffered: number;
  }) => Promise<{ updatedItineraryOfferId: string }>;

  selectItineraryOffer: ({
    itineraryOfferId,
  }: {
    itineraryOfferId: string;
  }) => Promise<void>;
}
