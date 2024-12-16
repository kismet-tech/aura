import React from "react";
import { BifrostFormQuestionWithPhoneNumberResponse } from "@kismet_ai/foundation";
export interface PhoneInputBifrostFormQuestionChatHistoryElementProps {
    guestFirstName: string;
    bifrostFormQuestionWithPhoneNumberResponse: BifrostFormQuestionWithPhoneNumberResponse;
    onClick: () => void;
}
export declare function PhoneInputBifrostFormQuestionChatHistoryElement({ guestFirstName, bifrostFormQuestionWithPhoneNumberResponse, onClick, }: PhoneInputBifrostFormQuestionChatHistoryElementProps): React.JSX.Element;
