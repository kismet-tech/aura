import React from "react";
import { RenderablePhoneInputBifrostFormQuestion } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestion";
export interface PhoneInputBifrostFormQuestionProps {
    renderablePhoneInputBifrostFormQuestion: RenderablePhoneInputBifrostFormQuestion;
    value: string;
    setValue: ({ updatedValue }: {
        updatedValue: string;
    }) => void;
    setIsResponseValid: ({ isResponseValid, }: {
        isResponseValid: boolean;
    }) => void;
}
export declare function PhoneInputBifrostFormQuestion({ renderablePhoneInputBifrostFormQuestion, value, setValue, setIsResponseValid, }: PhoneInputBifrostFormQuestionProps): React.JSX.Element;