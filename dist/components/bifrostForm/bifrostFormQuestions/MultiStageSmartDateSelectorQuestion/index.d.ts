import { BifrostFormQuestionMultiStageSmartDateResponseValue, CalendarDateRange, RenderableMultiStageSmartDateSelectorBifrostFormQuestion } from "@kismet_ai/foundation";
import React from "react";
export interface MultiStageSmartDateSelectorQuestionProps {
    renderableMultiStageSmartDateSelectorBifrostFormQuestion: RenderableMultiStageSmartDateSelectorBifrostFormQuestion;
    value: BifrostFormQuestionMultiStageSmartDateResponseValue;
    setValue: ({ updatedValue, }: {
        updatedValue: BifrostFormQuestionMultiStageSmartDateResponseValue;
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
export declare function MultiStageSmartDateSelectorQuestion({ renderableMultiStageSmartDateSelectorBifrostFormQuestion, value, setValue, setIsResponseValid, setHasQuestionBeenRespondedTo, suggestCalendarDateRangesFromConstraints, }: MultiStageSmartDateSelectorQuestionProps): React.JSX.Element;
