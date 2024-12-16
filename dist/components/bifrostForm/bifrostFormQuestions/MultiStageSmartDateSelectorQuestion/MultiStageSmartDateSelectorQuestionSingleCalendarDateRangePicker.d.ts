import { PendingCalendarDateRange } from "@kismet_ai/foundation";
import React from "react";
interface MultiStageSmartDateSelectorQuestionSingleCalendarDateRangePickerProps {
    value: PendingCalendarDateRange;
    setValue: ({ updatedValue, }: {
        updatedValue: PendingCalendarDateRange | undefined;
    }) => void;
    setIsResponseValid: ({ isResponseValid, }: {
        isResponseValid: boolean;
    }) => void;
    setHasQuestionBeenRespondedTo: ({ hasQuestionBeenRespondedTo, }: {
        hasQuestionBeenRespondedTo: boolean;
    }) => void;
}
export declare function MultiStageSmartDateSelectorQuestionSingleCalendarDateRangePicker({ value, setValue, setIsResponseValid, setHasQuestionBeenRespondedTo, }: MultiStageSmartDateSelectorQuestionSingleCalendarDateRangePickerProps): React.JSX.Element;
export {};
