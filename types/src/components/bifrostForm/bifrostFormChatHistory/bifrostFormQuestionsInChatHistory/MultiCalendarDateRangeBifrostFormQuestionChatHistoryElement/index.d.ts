import React from "react";
import { BifrostFormQuestionWithMultiCalendarDateRangeResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
export interface MultiCalendarDateRangeBifrostFormQuestionChatHistoryElementProps {
    guestFirstName: string;
    bifrostFormQuestionWithMultiCalendarDateRangeResponse: BifrostFormQuestionWithMultiCalendarDateRangeResponse;
    onClick: () => void;
}
export declare function MultiCalendarDateRangeBifrostFormQuestionChatHistoryElement({ guestFirstName, bifrostFormQuestionWithMultiCalendarDateRangeResponse, onClick, }: MultiCalendarDateRangeBifrostFormQuestionChatHistoryElementProps): React.JSX.Element;
