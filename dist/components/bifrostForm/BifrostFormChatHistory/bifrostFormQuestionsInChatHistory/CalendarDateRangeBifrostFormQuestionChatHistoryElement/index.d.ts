import React from "react";
import { BifrostFormQuestionWithCalendarDateRangeResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
export interface CalendarDateRangeBifrostFormQuestionChatHistoryElementProps {
    guestFirstName: string;
    bifrostFormQuestionWithCalendarDateRangeResponse: BifrostFormQuestionWithCalendarDateRangeResponse;
    onClick: () => void;
}
export declare function CalendarDateRangeBifrostFormQuestionChatHistoryElement({ guestFirstName, bifrostFormQuestionWithCalendarDateRangeResponse, onClick, }: CalendarDateRangeBifrostFormQuestionChatHistoryElementProps): React.JSX.Element;
