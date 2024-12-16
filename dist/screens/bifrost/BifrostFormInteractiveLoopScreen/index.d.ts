import React from "react";
import { BifrostFormQuestionWithResponse, CalendarDateRange } from "@kismet_ai/foundation";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
export interface BifrostFormInteractiveLoopScreenProps {
    historicalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    renderablePendingItinerary: RenderablePendingItinerary;
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
    submitBifrostFormQuestion: () => Promise<void>;
    suggestCalendarDateRangesFromConstraints: ({ descriptionOfPotentialCalendarDates, }: {
        descriptionOfPotentialCalendarDates: string;
    }) => Promise<CalendarDateRange[]>;
}
export declare function BifrostFormInteractiveLoopScreen({ historicalBifrostFormQuestionsWithResponses, activeBifrostFormQuestionsWithResponses, renderablePendingItinerary, setBifrostFormQuestionWithResponse, submitBifrostFormQuestion, suggestCalendarDateRangesFromConstraints, }: BifrostFormInteractiveLoopScreenProps): React.JSX.Element;
