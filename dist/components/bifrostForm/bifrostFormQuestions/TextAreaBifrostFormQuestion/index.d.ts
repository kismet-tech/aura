import React from "react";
import { RenderableTextAreaBifrostFormQuestion } from "@kismet_ai/foundation";
export interface TextAreaBifrostFormQuestionProps {
    renderableTextAreaBifrostFormQuestion: RenderableTextAreaBifrostFormQuestion;
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
export declare function TextAreaBifrostFormQuestion({ renderableTextAreaBifrostFormQuestion, value, setValue, setIsResponseValid, setHasQuestionBeenRespondedTo, }: TextAreaBifrostFormQuestionProps): React.JSX.Element;
