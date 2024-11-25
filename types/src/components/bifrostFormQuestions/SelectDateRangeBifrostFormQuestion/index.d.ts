import React from "react";
import { RenderableSelectDateRangeBifrostFormQuestion } from "@/models/BifrostFormQuestions/BifrostFormQuestion";
import { PendingCalendarDateRange } from "@/models/core/date/CalendarDateRange";
export interface SelectDateRangeBifrostFormQuestionProps {
    renderableSelectDateRangeBifrostFormQuestion: RenderableSelectDateRangeBifrostFormQuestion;
    calendarDateRange: PendingCalendarDateRange;
    setCalendarDateRange: ({ updatedCalendarDateRange, }: {
        updatedCalendarDateRange: PendingCalendarDateRange;
    }) => void;
}
export declare function SelectDateRangeBifrostFormQuestion({ renderableSelectDateRangeBifrostFormQuestion, calendarDateRange, setCalendarDateRange, }: SelectDateRangeBifrostFormQuestionProps): React.JSX.Element;
