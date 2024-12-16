import React from "react";
import { BifrostFormQuestionWithResponse, CalendarDateRange } from "@kismet_ai/foundation";
export interface BifrostFormLaunchScreenProps {
    activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
    handleProgressForward: () => void;
    suggestCalendarDateRangesFromConstraints: ({ descriptionOfPotentialCalendarDates, }: {
        descriptionOfPotentialCalendarDates: string;
    }) => Promise<CalendarDateRange[]>;
}
export declare function BifrostFormLaunchScreen({ activeBifrostFormQuestionsWithResponses, setBifrostFormQuestionWithResponse, handleProgressForward, suggestCalendarDateRangesFromConstraints, }: BifrostFormLaunchScreenProps): React.JSX.Element;
