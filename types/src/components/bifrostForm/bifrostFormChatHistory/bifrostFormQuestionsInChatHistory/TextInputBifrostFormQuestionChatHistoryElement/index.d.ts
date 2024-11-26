import React from "react";
import { BifrostTextInputFormQuestionWithTextResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
export interface TextInputBifrostFormQuestionChatHistoryElementProps {
    guestFirstName: string;
    bifrostTextInputFormQuestionWithTextResponse: BifrostTextInputFormQuestionWithTextResponse;
    onClick: () => void;
}
export declare function TextInputBifrostFormQuestionChatHistoryElement({ guestFirstName, bifrostTextInputFormQuestionWithTextResponse, onClick, }: TextInputBifrostFormQuestionChatHistoryElementProps): React.JSX.Element;
