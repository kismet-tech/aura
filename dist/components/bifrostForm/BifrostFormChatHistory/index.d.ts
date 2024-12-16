import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";
import React from "react";
export interface BifrostFormChatHistoryProps {
    guestFirstName: string;
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}
export declare function BifrostFormChatHistory({ guestFirstName, bifrostFormQuestionsWithResponses, }: BifrostFormChatHistoryProps): React.JSX.Element;
