import React from "react";
import { RenderableEmailInputBifrostFormQuestion } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestion";
export interface EmailInputBifrostFormQuestionProps {
    renderableEmailInputBifrostFormQuestion: RenderableEmailInputBifrostFormQuestion;
    value: string;
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
export declare function EmailInputBifrostFormQuestion({ renderableEmailInputBifrostFormQuestion, value, setValue, setIsResponseValid, setHasQuestionBeenRespondedTo, }: EmailInputBifrostFormQuestionProps): React.JSX.Element;
