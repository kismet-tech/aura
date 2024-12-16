import React from "react";
interface MultiStageReasonForTravelQuestionCompanyNameInputProps {
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
export declare function MultiStageReasonForTravelQuestionCompanyNameInput({ value, setValue, setIsResponseValid, setHasQuestionBeenRespondedTo, }: MultiStageReasonForTravelQuestionCompanyNameInputProps): React.JSX.Element;
export {};
