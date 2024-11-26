import React from "react";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
export interface BifrostFormQuestionLoopScreenProps {
    historicalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    renderablePendingItinerary: RenderablePendingItinerary;
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
}
export declare function BifrostFormQuestionLoopScreen({ historicalBifrostFormQuestionsWithResponses, activeBifrostFormQuestionsWithResponses, renderablePendingItinerary, setBifrostFormQuestionWithResponse, }: BifrostFormQuestionLoopScreenProps): React.JSX.Element;
