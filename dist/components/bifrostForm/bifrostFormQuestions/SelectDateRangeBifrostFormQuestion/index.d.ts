import React from "react";
import { RenderableSelectDateRangeBifrostFormQuestion } from "@kismet_ai/foundation";
import { PendingCalendarDateRange } from "@kismet_ai/foundation";
export interface SelectDateRangeBifrostFormQuestionProps {
    renderableSelectDateRangeBifrostFormQuestion: RenderableSelectDateRangeBifrostFormQuestion;
    calendarDateRange: PendingCalendarDateRange;
    setCalendarDateRange: ({ updatedCalendarDateRange, }: {
        updatedCalendarDateRange: PendingCalendarDateRange;
    }) => void;
    setIsResponseValid: ({ isResponseValid, }: {
        isResponseValid: boolean;
    }) => void;
    setHasQuestionBeenRespondedTo: ({ hasQuestionBeenRespondedTo, }: {
        hasQuestionBeenRespondedTo: boolean;
    }) => void;
}
export declare function SelectDateRangeBifrostFormQuestion({ renderableSelectDateRangeBifrostFormQuestion, calendarDateRange, setCalendarDateRange, setIsResponseValid, setHasQuestionBeenRespondedTo, }: SelectDateRangeBifrostFormQuestionProps): React.JSX.Element;
