import React from "react";
import { BifrostFormQuestionWithEmailResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
export interface EmailInputBifrostFormQuestionChatHistoryElementProps {
    guestFirstName: string;
    bifrostFormQuestionWithEmailResponse: BifrostFormQuestionWithEmailResponse;
    onClick: () => void;
}
export declare function EmailInputBifrostFormQuestionChatHistoryElement({ guestFirstName, bifrostFormQuestionWithEmailResponse, onClick, }: EmailInputBifrostFormQuestionChatHistoryElementProps): React.JSX.Element;
