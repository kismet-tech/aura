import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { ReactNode } from "react";
import { BifrostFormApplicationStage } from "./BifrostFormApplicationStage";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";

export interface BifrostFormStateProviderProps {
  children: ReactNode;
}

export interface BifrostFormStateContextValue {
  /////////////////////////
  // Navigation
  /////////////////////////
  bifrostFormApplicationStage: BifrostFormApplicationStage;
  progressToNextBifrostFormApplicationStage: () => Promise<void>;
  stepBackToPreviousBifrostFormApplicationStage: () => Promise<void>;

  /////////////////////////
  // Form Question Responses
  /////////////////////////
  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
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
}
