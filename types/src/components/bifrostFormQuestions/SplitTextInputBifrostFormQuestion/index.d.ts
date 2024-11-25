import React from "react";
import { RenderableSplitTextInputBifrostFormQuestion } from "@/models/BifrostFormQuestions/BifrostFormQuestion";
export interface SplitTextInputBifrostFormQuestionProps {
    renderableSplitTextInputBifrostFormQuestion: RenderableSplitTextInputBifrostFormQuestion;
    leftValue: string;
    setLeftValue: ({ updatedValue }: {
        updatedValue: string;
    }) => void;
    rightValue: string;
    setRightValue: ({ updatedValue }: {
        updatedValue: string;
    }) => void;
}
export declare function SplitTextInputBifrostFormQuestion({ renderableSplitTextInputBifrostFormQuestion, leftValue, setLeftValue, rightValue, setRightValue, }: SplitTextInputBifrostFormQuestionProps): React.JSX.Element;
