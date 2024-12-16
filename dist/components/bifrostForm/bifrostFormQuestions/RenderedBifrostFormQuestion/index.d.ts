import React from "react";
import { BifrostFormQuestionResponse, BifrostFormQuestionWithResponse, CalendarDateRange } from "@kismet_ai/foundation";
export interface RenderedBifrostFormQuestionProps {
    bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    setBifrostFormQuestionResponse: ({ updatedBifrostFormQuestionResponse, }: {
        updatedBifrostFormQuestionResponse: BifrostFormQuestionResponse;
    }) => void;
    setIsResponseValid: ({ isResponseValid, }: {
        isResponseValid: boolean;
    }) => void;
    setHasQuestionBeenRespondedTo: ({ hasQuestionBeenRespondedTo, }: {
        hasQuestionBeenRespondedTo: boolean;
    }) => void;
    suggestCalendarDateRangesFromConstraints: ({ descriptionOfPotentialCalendarDates, }: {
        descriptionOfPotentialCalendarDates: string;
    }) => Promise<CalendarDateRange[]>;
}
export declare function RenderedBifrostFormQuestion({ bifrostFormQuestionWithResponse, setBifrostFormQuestionResponse, setIsResponseValid, setHasQuestionBeenRespondedTo, suggestCalendarDateRangesFromConstraints, }: RenderedBifrostFormQuestionProps): React.JSX.Element;
