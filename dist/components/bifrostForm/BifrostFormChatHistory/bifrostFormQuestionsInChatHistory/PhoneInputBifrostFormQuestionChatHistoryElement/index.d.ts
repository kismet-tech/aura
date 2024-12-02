import React from "react";
import { BifrostFormQuestionWithPhoneNumberResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
export interface PhoneInputBifrostFormQuestionChatHistoryElementProps {
    guestFirstName: string;
    bifrostFormQuestionWithPhoneNumberResponse: BifrostFormQuestionWithPhoneNumberResponse;
    onClick: () => void;
}
export declare function PhoneInputBifrostFormQuestionChatHistoryElement({ guestFirstName, bifrostFormQuestionWithPhoneNumberResponse, onClick, }: PhoneInputBifrostFormQuestionChatHistoryElementProps): React.JSX.Element;
