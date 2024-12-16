import React from "react";
interface MultiStageSmartDateSelectorQuestionDescriptionOfPotentialCalendarDatesInputProps {
    value: string;
    setValue: ({ updatedValue }: {
        updatedValue: string;
    }) => void;
    setIsResponseValid: ({ isResponseValid, }: {
        isResponseValid: boolean;
    }) => void;
    setHasQuestionBeenRespondedTo: ({ hasQuestionBeenRespondedTo, }: {
        hasQuestionBeenRespondedTo: boolean;
    }) => void;
}
export declare function MultiStageSmartDateSelectorQuestionDescriptionOfPotentialCalendarDatesInput({ value, setValue, setIsResponseValid, setHasQuestionBeenRespondedTo, }: MultiStageSmartDateSelectorQuestionDescriptionOfPotentialCalendarDatesInputProps): React.JSX.Element;
export {};
