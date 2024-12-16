import { CalendarDateRange } from "@kismet_ai/foundation";
import React from "react";
export interface MultiStageSmartDateSelectorQuestionSuggestedCalendarDateRangeSelectorProps {
    suggestedCalendarDateRanges?: CalendarDateRange[];
    setSuggestedCalendarDateRanges: ({ updatedSuggestedCalendarDateRanges, }: {
        updatedSuggestedCalendarDateRanges: CalendarDateRange[];
    }) => void;
    values: CalendarDateRange[];
    setValues: ({ updatedValue }: {
        updatedValue: CalendarDateRange[];
    }) => void;
    descriptionOfPotentialCalendarDates: string;
    suggestCalendarDateRangesFromConstraints: ({ descriptionOfPotentialCalendarDates, }: {
        descriptionOfPotentialCalendarDates: string;
    }) => Promise<CalendarDateRange[]>;
}
export declare function MultiStageSmartDateSelectorQuestionSuggestedCalendarDateRangeSelector({ suggestedCalendarDateRanges, setSuggestedCalendarDateRanges, values, setValues, descriptionOfPotentialCalendarDates, suggestCalendarDateRangesFromConstraints, }: MultiStageSmartDateSelectorQuestionSuggestedCalendarDateRangeSelectorProps): React.JSX.Element;
