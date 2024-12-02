import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import React from "react";
export interface ActiveBifrostFormQuestionsProps {
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
    setAreAllResponsesValid: ({ areAllResponsesValid, }: {
        areAllResponsesValid: boolean;
    }) => void;
}
export declare function ActiveBifrostFormQuestions({ bifrostFormQuestionsWithResponses, setBifrostFormQuestionWithResponse, setAreAllResponsesValid, }: ActiveBifrostFormQuestionsProps): React.JSX.Element;
