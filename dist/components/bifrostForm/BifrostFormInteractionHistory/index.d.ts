import { BifrostFormQuestionWithResponse, CalendarDateRange } from "@kismet_ai/foundation";
import React from "react";
export interface BifrostFormInteractionHistoryProps {
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
    suggestCalendarDateRangesFromConstraints: ({ descriptionOfPotentialCalendarDates, }: {
        descriptionOfPotentialCalendarDates: string;
    }) => Promise<CalendarDateRange[]>;
}
export declare function BifrostFormInteractionHistory({ bifrostFormQuestionsWithResponses, setBifrostFormQuestionWithResponse, suggestCalendarDateRangesFromConstraints, }: BifrostFormInteractionHistoryProps): React.JSX.Element;
