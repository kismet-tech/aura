import React from "react";
import { RenderableTextAreaBifrostFormQuestion } from "@/models/BifrostFormQuestions/BifrostFormQuestion";
export interface TextAreaBifrostFormQuestionProps {
    renderableTextAreaBifrostFormQuestion: RenderableTextAreaBifrostFormQuestion;
    value: string;
    setValue: ({ updatedValue }: {
        updatedValue: string;
    }) => void;
}
export declare function TextAreaBifrostFormQuestion({ renderableTextAreaBifrostFormQuestion, value, setValue, }: TextAreaBifrostFormQuestionProps): React.JSX.Element;
