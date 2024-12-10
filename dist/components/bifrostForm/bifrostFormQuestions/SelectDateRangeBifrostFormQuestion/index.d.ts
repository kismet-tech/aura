import React from "react";
import { RenderableSelectDateRangeBifrostFormQuestion } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestion";
import { PendingCalendarDateRange } from "@/models/core/date/CalendarDateRange";
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
