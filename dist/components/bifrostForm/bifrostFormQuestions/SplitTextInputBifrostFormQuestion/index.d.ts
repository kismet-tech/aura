import React from "react";
import { RenderableSplitTextInputBifrostFormQuestion } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestion";
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
    setIsResponseValid: ({ isResponseValid, }: {
        isResponseValid: boolean;
    }) => void;
}
export declare function SplitTextInputBifrostFormQuestion({ renderableSplitTextInputBifrostFormQuestion, leftValue, setLeftValue, rightValue, setRightValue, setIsResponseValid, }: SplitTextInputBifrostFormQuestionProps): React.JSX.Element;