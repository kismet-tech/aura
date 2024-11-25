import React from "react";
import { RenderableEmailInputBifrostFormQuestion } from "@/models/BifrostFormQuestions/BifrostFormQuestion";
export interface EmailInputBifrostFormQuestionProps {
    renderableEmailInputBifrostFormQuestion: RenderableEmailInputBifrostFormQuestion;
    value: string;
    setValue: ({ updatedValue }: {
        updatedValue: string;
    }) => void;
    setIsValid: ({ isValid }: {
        isValid: boolean;
    }) => void;
}
export declare function EmailInputBifrostFormQuestion({ renderableEmailInputBifrostFormQuestion, value, setValue, setIsValid, }: EmailInputBifrostFormQuestionProps): React.JSX.Element;
