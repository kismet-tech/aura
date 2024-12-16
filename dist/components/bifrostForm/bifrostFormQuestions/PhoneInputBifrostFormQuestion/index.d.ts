import React from "react";
import { RenderablePhoneInputBifrostFormQuestion } from "@kismet_ai/foundation";
export interface PhoneInputBifrostFormQuestionProps {
    renderablePhoneInputBifrostFormQuestion: RenderablePhoneInputBifrostFormQuestion;
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
export declare function PhoneInputBifrostFormQuestion({ renderablePhoneInputBifrostFormQuestion, value, setValue, setIsResponseValid, setHasQuestionBeenRespondedTo, }: PhoneInputBifrostFormQuestionProps): React.JSX.Element;
