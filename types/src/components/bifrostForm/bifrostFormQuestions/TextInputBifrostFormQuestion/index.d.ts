import React from "react";
import { RenderableTextInputBifrostFormQuestion } from "@/models/BifrostFormQuestions/BifrostFormQuestion";
export interface TextInputBifrostFormQuestionProps {
    renderableTextInputBifrostFormQuestion: RenderableTextInputBifrostFormQuestion;
    value: string;
    setValue: ({ updatedValue }: {
        updatedValue: string;
    }) => void;
    setIsResponseValid: ({ isResponseValid, }: {
        isResponseValid: boolean;
    }) => void;
}
export declare function TextInputBifrostFormQuestion({ renderableTextInputBifrostFormQuestion, value, setValue, setIsResponseValid, }: TextInputBifrostFormQuestionProps): React.JSX.Element;
