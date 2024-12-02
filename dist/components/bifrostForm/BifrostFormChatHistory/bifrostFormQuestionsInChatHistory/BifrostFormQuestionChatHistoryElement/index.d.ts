import React from "react";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
export interface BifrostFormQuestionChatHistoryElementProps {
    guestFirstName: string;
    bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    onClick: () => void;
}
export declare function BifrostFormQuestionChatHistoryElement({ guestFirstName, bifrostFormQuestionWithResponse, onClick, }: BifrostFormQuestionChatHistoryElementProps): React.JSX.Element;
