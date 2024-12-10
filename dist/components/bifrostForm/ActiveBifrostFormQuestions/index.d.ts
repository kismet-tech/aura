import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import React from "react";
export interface ActiveBifrostFormQuestionsProps {
    activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
    setAreAllResponsesValid: ({ areAllResponsesValid, }: {
        areAllResponsesValid: boolean;
    }) => void;
    setBifrostFormQuestionIdsRespondedTo: ({ bifrostFormQuestionIdsRespondedTo, }: {
        bifrostFormQuestionIdsRespondedTo: string[];
    }) => void;
}
export declare function ActiveBifrostFormQuestions({ activeBifrostFormQuestionsWithResponses, setBifrostFormQuestionWithResponse, setAreAllResponsesValid, setBifrostFormQuestionIdsRespondedTo, }: ActiveBifrostFormQuestionsProps): React.JSX.Element;
