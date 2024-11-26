import React from "react";
import { BifrostTextAreaFormQuestionWithTextResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
export interface TextAreaInputBifrostFormQuestionChatHistoryElementProps {
    guestFirstName: string;
    bifrostTextAreaFormQuestionWithTextResponse: BifrostTextAreaFormQuestionWithTextResponse;
    onClick: () => void;
}
export declare function TextAreaInputBifrostFormQuestionChatHistoryElement({ guestFirstName, bifrostTextAreaFormQuestionWithTextResponse, onClick, }: TextAreaInputBifrostFormQuestionChatHistoryElementProps): React.JSX.Element;
