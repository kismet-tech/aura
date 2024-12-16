import React from "react";
import { BifrostFormQuestionWithEmailResponse } from "@kismet_ai/foundation";
export interface EmailInputBifrostFormQuestionChatHistoryElementProps {
    guestFirstName: string;
    bifrostFormQuestionWithEmailResponse: BifrostFormQuestionWithEmailResponse;
    onClick: () => void;
}
export declare function EmailInputBifrostFormQuestionChatHistoryElement({ guestFirstName, bifrostFormQuestionWithEmailResponse, onClick, }: EmailInputBifrostFormQuestionChatHistoryElementProps): React.JSX.Element;
