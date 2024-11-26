import React from "react";
import { BifrostFormQuestionWithCalendarDateRangeResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
export interface CalendarDateRangeBifrostFormQuestionChatHistoryElementProps {
    guestFirstName: string;
    bifrostFormQuestionWithCalendarDateRangeResponse: BifrostFormQuestionWithCalendarDateRangeResponse;
    onClick: () => void;
}
export declare function CalendarDateRangeBifrostFormQuestionChatHistoryElement({ guestFirstName, bifrostFormQuestionWithCalendarDateRangeResponse, onClick, }: CalendarDateRangeBifrostFormQuestionChatHistoryElementProps): React.JSX.Element;
