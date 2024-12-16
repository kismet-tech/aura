import { PendingCalendarDateRange } from "@kismet_ai/foundation";
import React from "react";
interface MultiStageSmartDateSelectorQuestionMultiCalendarDateRangePickerProps {
    value: PendingCalendarDateRange[];
    setValue: ({ updatedValue, }: {
        updatedValue: PendingCalendarDateRange[];
    }) => void;
    setIsResponseValid: ({ isResponseValid, }: {
        isResponseValid: boolean;
    }) => void;
}
export declare function MultiStageSmartDateSelectorQuestionMultiCalendarDateRangePicker({ value, setValue, setIsResponseValid, }: MultiStageSmartDateSelectorQuestionMultiCalendarDateRangePickerProps): React.JSX.Element;
export {};
