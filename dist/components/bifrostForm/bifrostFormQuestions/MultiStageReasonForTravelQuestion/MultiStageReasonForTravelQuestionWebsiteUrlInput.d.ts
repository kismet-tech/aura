import React from "react";
interface MultiStageReasonForTravelQuestionWebsiteUrlInputProps {
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
export declare function MultiStageReasonForTravelQuestionWebsiteUrlInput({ value, setValue, setIsResponseValid, setHasQuestionBeenRespondedTo, }: MultiStageReasonForTravelQuestionWebsiteUrlInputProps): React.JSX.Element;
export {};
