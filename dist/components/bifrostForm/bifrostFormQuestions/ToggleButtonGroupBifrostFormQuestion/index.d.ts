import React from "react";
import { RenderableToggleButtonGroupBifrostFormQuestion } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestion";
export interface ToggleButtonGroupBifrostFormQuestionProps {
    renderableToggleButtonGroupBifrostFormQuestion: RenderableToggleButtonGroupBifrostFormQuestion;
    value: string | undefined;
    setValue: ({ updatedValue }: {
        updatedValue: string;
    }) => void;
    setIsResponseValid: ({ isResponseValid, }: {
        isResponseValid: boolean;
    }) => void;
    setHasQuestionBeenRespondedTo: ({ hasQuestionBeenRespondedTo, }: {
        hasQuestionBeenRespondedTo: boolean;
    }) => void;
}
export declare function ToggleButtonGroupBifrostFormQuestion({ renderableToggleButtonGroupBifrostFormQuestion, value, setValue, setIsResponseValid, setHasQuestionBeenRespondedTo, }: ToggleButtonGroupBifrostFormQuestionProps): React.JSX.Element;
