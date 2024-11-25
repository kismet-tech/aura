import { BifrostFormQuestionResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionResponse";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import React from "react";
export interface ActiveFormQuestionsProps {
    bifrostFormQuestionWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionResponse: ({ bifrostFormQuestionResponse, }: {
        bifrostFormQuestionResponse: BifrostFormQuestionResponse;
    }) => void;
}
export declare function ActiveFormQuestions({ bifrostFormQuestionWithResponses, setBifrostFormQuestionResponse, }: ActiveFormQuestionsProps): React.JSX.Element[];
