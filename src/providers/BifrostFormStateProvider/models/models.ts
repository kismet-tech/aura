import {
  BifrostFormQuestionWithResponse,
  CalendarDateRange,
} from "@kismet_ai/foundation";
import { ReactNode } from "react";
import { BifrostFormApplicationStage } from "./BifrostFormApplicationStage";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { BifrostApiInterface } from "@/apis/bifrostApi/models";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";

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
  // Question Helpers
  /////////////////////////
  suggestCalendarDateRangesFromConstraints: ({
    descriptionOfPotentialCalendarDates,
  }: {
    descriptionOfPotentialCalendarDates: string;
  }) => Promise<CalendarDateRange[]>;

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
    hotelRoomOfferId,
    updatedCountOffered,
  }: {
    itineraryOfferId: string;
    hotelRoomOfferId: string;
    updatedCountOffered: number;
  }) => Promise<{ updatedItineraryOfferId: string }>;

  selectItineraryOffer: ({
    itineraryOfferId,
  }: {
    itineraryOfferId: string;
  }) => Promise<void>;
}
