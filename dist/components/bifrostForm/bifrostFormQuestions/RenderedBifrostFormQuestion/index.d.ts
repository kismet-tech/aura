import React from "react";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { BifrostFormQuestionResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionResponse";
export interface RenderedBifrostFormQuestionProps {
    bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    setBifrostFormQuestionResponse: ({ updatedBifrostFormQuestionResponse, }: {
        updatedBifrostFormQuestionResponse: BifrostFormQuestionResponse;
    }) => void;
    setIsResponseValid: ({ isResponseValid, }: {
        isResponseValid: boolean;
    }) => void;
}
export declare function RenderedBifrostFormQuestion({ bifrostFormQuestionWithResponse, setBifrostFormQuestionResponse, setIsResponseValid, }: RenderedBifrostFormQuestionProps): React.JSX.Element;
