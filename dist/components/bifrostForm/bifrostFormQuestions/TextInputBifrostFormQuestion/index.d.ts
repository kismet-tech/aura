import React from "react";
import { RenderableTextInputBifrostFormQuestion } from "@kismet_ai/foundation";
export interface TextInputBifrostFormQuestionProps {
    renderableTextInputBifrostFormQuestion: RenderableTextInputBifrostFormQuestion;
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
export declare function TextInputBifrostFormQuestion({ renderableTextInputBifrostFormQuestion, value, setValue, setIsResponseValid, setHasQuestionBeenRespondedTo, }: TextInputBifrostFormQuestionProps): React.JSX.Element;
