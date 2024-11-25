import React from "react";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { BifrostFormQuestionResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionResponse";
export interface RenderedBifrostFormQuestionProps {
    bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    setBifrostFormQuestionResponse: ({ bifrostFormQuestionResponse, }: {
        bifrostFormQuestionResponse: BifrostFormQuestionResponse;
    }) => void;
}
export declare function RenderedBifrostFormQuestion({ bifrostFormQuestionWithResponse, setBifrostFormQuestionResponse, }: RenderedBifrostFormQuestionProps): React.JSX.Element;
