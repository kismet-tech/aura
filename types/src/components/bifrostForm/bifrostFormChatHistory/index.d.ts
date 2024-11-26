import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import React from "react";
export interface BifrostFormChatHistoryProps {
    guestFirstName: string;
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}
export declare function BifrostFormChatHistory({ guestFirstName, bifrostFormQuestionsWithResponses, }: BifrostFormChatHistoryProps): React.JSX.Element;
