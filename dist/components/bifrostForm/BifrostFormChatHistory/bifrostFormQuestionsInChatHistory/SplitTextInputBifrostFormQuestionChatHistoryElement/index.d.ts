import React from "react";
import { BifrostFormQuestionWithSplitTextResponse } from "@kismet_ai/foundation";
export interface SplitTextInputBifrostFormQuestionChatHistoryElementProps {
    guestFirstName: string;
    bifrostFormQuestionWithSplitTextResponse: BifrostFormQuestionWithSplitTextResponse;
    onClick: () => void;
}
export declare function SplitTextInputBifrostFormQuestionChatHistoryElement({ guestFirstName, bifrostFormQuestionWithSplitTextResponse, onClick, }: SplitTextInputBifrostFormQuestionChatHistoryElementProps): React.JSX.Element;
