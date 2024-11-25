import React from "react";
import { RenderableToggleButtonGroupBifrostFormQuestion } from "@/models/BifrostFormQuestions/BifrostFormQuestion";
export interface ToggleButtonGroupBifrostFormQuestionProps {
    renderableToggleButtonGroupBifrostFormQuestion: RenderableToggleButtonGroupBifrostFormQuestion;
    value: string | undefined;
    setValue: ({ updatedValue }: {
        updatedValue: string;
    }) => void;
}
export declare function ToggleButtonGroupBifrostFormQuestion({ renderableToggleButtonGroupBifrostFormQuestion, value, setValue, }: ToggleButtonGroupBifrostFormQuestionProps): React.JSX.Element;
