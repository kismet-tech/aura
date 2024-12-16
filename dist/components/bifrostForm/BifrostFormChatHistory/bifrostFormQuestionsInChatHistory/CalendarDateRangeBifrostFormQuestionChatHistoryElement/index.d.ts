import React from "react";
import { BifrostFormQuestionWithCalendarDateRangeResponse } from "@kismet_ai/foundation";
export interface CalendarDateRangeBifrostFormQuestionChatHistoryElementProps {
    guestFirstName: string;
    bifrostFormQuestionWithCalendarDateRangeResponse: BifrostFormQuestionWithCalendarDateRangeResponse;
    onClick: () => void;
}
export declare function CalendarDateRangeBifrostFormQuestionChatHistoryElement({ guestFirstName, bifrostFormQuestionWithCalendarDateRangeResponse, onClick, }: CalendarDateRangeBifrostFormQuestionChatHistoryElementProps): React.JSX.Element;
