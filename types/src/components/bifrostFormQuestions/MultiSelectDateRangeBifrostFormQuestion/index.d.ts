import React from "react";
import { RenderableMultiSelectDateRangeBifrostFormQuestion } from "@/models/BifrostFormQuestions/BifrostFormQuestion";
import { PendingCalendarDateRange } from "@/models/core/date/CalendarDateRange";
export interface MultiSelectDateRangeBifrostFormQuestionProps {
    renderableMultiSelectDateRangeBifrostFormQuestion: RenderableMultiSelectDateRangeBifrostFormQuestion;
    calendarDateRanges: PendingCalendarDateRange[];
    setCalendarDateRanges: ({ updatedCalendarDateRanges, }: {
        updatedCalendarDateRanges: PendingCalendarDateRange[];
    }) => void;
}
export declare function MultiSelectDateRangeBifrostFormQuestion({ renderableMultiSelectDateRangeBifrostFormQuestion, calendarDateRanges, setCalendarDateRanges, }: MultiSelectDateRangeBifrostFormQuestionProps): React.JSX.Element;
