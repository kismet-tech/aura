import React from "react";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
export interface BifrostFormInteractiveLoopScreenProps {
    historicalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    renderablePendingItinerary: RenderablePendingItinerary;
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
    submitBifrostFormQuestion: () => Promise<void>;
}
export declare function BifrostFormInteractiveLoopScreen({ historicalBifrostFormQuestionsWithResponses, activeBifrostFormQuestionsWithResponses, renderablePendingItinerary, setBifrostFormQuestionWithResponse, submitBifrostFormQuestion, }: BifrostFormInteractiveLoopScreenProps): React.JSX.Element;
