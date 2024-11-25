import React from "react";
import { RenderablePhoneInputBifrostFormQuestion } from "@/models/BifrostFormQuestions/BifrostFormQuestion";
export interface PhoneInputBifrostFormQuestionProps {
    renderablePhoneInputBifrostFormQuestion: RenderablePhoneInputBifrostFormQuestion;
    value: string;
    setValue: ({ updatedValue }: {
        updatedValue: string;
    }) => void;
    setIsValid: ({ isValid }: {
        isValid: boolean;
    }) => void;
}
export declare function PhoneInputBifrostFormQuestion({ renderablePhoneInputBifrostFormQuestion, value, setValue, setIsValid, }: PhoneInputBifrostFormQuestionProps): React.JSX.Element;
