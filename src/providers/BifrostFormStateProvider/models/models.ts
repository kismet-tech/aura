import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { ReactNode } from "react";
import { BifrostFormApplicationStage } from "./BifrostFormApplicationStage";

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
  // Active Form Question
  /////////////////////////
  activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  setActiveBifrostFormQuestionsWithResponses: ({
    updatedActiveBifrostFormQuestionsWithResponses,
  }: {
    updatedActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  }) => void;
}
