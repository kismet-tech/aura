import React from "react";
import { RenderableMultiSelectDateRangeBifrostFormQuestion } from "@kismet_ai/foundation";
import { PendingCalendarDateRange } from "@kismet_ai/foundation";
export interface MultiSelectDateRangeBifrostFormQuestionProps {
    renderableMultiSelectDateRangeBifrostFormQuestion: RenderableMultiSelectDateRangeBifrostFormQuestion;
    calendarDateRanges: PendingCalendarDateRange[];
    setCalendarDateRanges: ({ updatedCalendarDateRanges, }: {
        updatedCalendarDateRanges: PendingCalendarDateRange[];
    }) => void;
    setIsResponseValid: ({ isResponseValid, }: {
        isResponseValid: boolean;
    }) => void;
    setHasQuestionBeenRespondedTo: ({ hasQuestionBeenRespondedTo, }: {
        hasQuestionBeenRespondedTo: boolean;
    }) => void;
}
export declare function MultiSelectDateRangeBifrostFormQuestion({ renderableMultiSelectDateRangeBifrostFormQuestion, calendarDateRanges, setCalendarDateRanges, setIsResponseValid, setHasQuestionBeenRespondedTo, }: MultiSelectDateRangeBifrostFormQuestionProps): React.JSX.Element;
