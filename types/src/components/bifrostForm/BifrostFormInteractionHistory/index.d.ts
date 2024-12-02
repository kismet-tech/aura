import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import React from "react";
export interface BifrostFormInteractionHistoryProps {
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
}
export declare function BifrostFormInteractionHistory({ bifrostFormQuestionsWithResponses, setBifrostFormQuestionWithResponse, }: BifrostFormInteractionHistoryProps): React.JSX.Element;
