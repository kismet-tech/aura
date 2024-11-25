import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { ReactNode } from "react";
import { BifrostFormApplicationStage } from "./BifrostFormApplicationStage";
export interface BifrostFormStateProviderProps {
    children: ReactNode;
}
export interface BifrostFormStateContextValue {
    bifrostFormApplicationStage: BifrostFormApplicationStage;
    progressToNextBifrostFormApplicationStage: () => Promise<void>;
    stepBackToPreviousBifrostFormApplicationStage: () => Promise<void>;
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
    activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setActiveBifrostFormQuestionsWithResponses: ({ updatedActiveBifrostFormQuestionsWithResponses, }: {
        updatedActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    }) => void;
}
