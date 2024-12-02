import React from "react";
import { BifrostToggleButtonGroupFormQuestionWithTextResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
export interface ToggleButtonGroupBifrostFormQuestionChatHistoryElementProps {
    guestFirstName: string;
    bifrostToggleButtonGroupFormQuestionWithTextResponse: BifrostToggleButtonGroupFormQuestionWithTextResponse;
    onClick: () => void;
}
export declare function ToggleButtonGroupBifrostFormQuestionChatHistoryElement({ guestFirstName, bifrostToggleButtonGroupFormQuestionWithTextResponse, onClick, }: ToggleButtonGroupBifrostFormQuestionChatHistoryElementProps): React.JSX.Element;
