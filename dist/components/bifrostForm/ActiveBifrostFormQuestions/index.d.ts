import { CalendarDateRange } from "@kismet_ai/foundation";
import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";
import React from "react";
export interface ActiveBifrostFormQuestionsProps {
    activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
    setBifrostFormQuestionIdsWithValidResponses: ({ bifrostFormQuestionIdsWithValidResponses, }: {
        bifrostFormQuestionIdsWithValidResponses: string[];
    }) => void;
    setBifrostFormQuestionIdsRespondedTo: ({ bifrostFormQuestionIdsRespondedTo, }: {
        bifrostFormQuestionIdsRespondedTo: string[];
    }) => void;
    suggestCalendarDateRangesFromConstraints: ({ descriptionOfPotentialCalendarDates, }: {
        descriptionOfPotentialCalendarDates: string;
    }) => Promise<CalendarDateRange[]>;
}
export declare function ActiveBifrostFormQuestions({ activeBifrostFormQuestionsWithResponses, setBifrostFormQuestionWithResponse, setBifrostFormQuestionIdsWithValidResponses, setBifrostFormQuestionIdsRespondedTo, suggestCalendarDateRangesFromConstraints, }: ActiveBifrostFormQuestionsProps): React.JSX.Element;
