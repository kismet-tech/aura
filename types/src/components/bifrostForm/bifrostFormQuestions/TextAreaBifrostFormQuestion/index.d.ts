import React from "react";
import { RenderableTextAreaBifrostFormQuestion } from "@/models/BifrostFormQuestions/BifrostFormQuestion";
export interface TextAreaBifrostFormQuestionProps {
    renderableTextAreaBifrostFormQuestion: RenderableTextAreaBifrostFormQuestion;
    value: string;
    setValue: ({ updatedValue }: {
        updatedValue: string;
    }) => void;
    setIsResponseValid: ({ isResponseValid, }: {
        isResponseValid: boolean;
    }) => void;
}
export declare function TextAreaBifrostFormQuestion({ renderableTextAreaBifrostFormQuestion, value, setValue, setIsResponseValid, }: TextAreaBifrostFormQuestionProps): React.JSX.Element;
