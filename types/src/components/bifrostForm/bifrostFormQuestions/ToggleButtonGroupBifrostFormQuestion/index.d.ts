import React from "react";
import { RenderableToggleButtonGroupBifrostFormQuestion } from "@/models/BifrostFormQuestions/BifrostFormQuestion";
export interface ToggleButtonGroupBifrostFormQuestionProps {
    renderableToggleButtonGroupBifrostFormQuestion: RenderableToggleButtonGroupBifrostFormQuestion;
    value: string | undefined;
    setValue: ({ updatedValue }: {
        updatedValue: string;
    }) => void;
    setIsResponseValid: ({ isResponseValid, }: {
        isResponseValid: boolean;
    }) => void;
}
export declare function ToggleButtonGroupBifrostFormQuestion({ renderableToggleButtonGroupBifrostFormQuestion, value, setValue, setIsResponseValid, }: ToggleButtonGroupBifrostFormQuestionProps): React.JSX.Element;
