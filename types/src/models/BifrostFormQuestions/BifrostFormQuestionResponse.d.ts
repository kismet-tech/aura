import { PendingCalendarDateRange } from "../core/date/CalendarDateRange";
export declare enum BifrostFormQuestionResponseType {
    TEXT = "TEXT",
    PHONE_NUMBER = "PHONE_NUMBER",
    EMAIL = "EMAIL",
    CALENDAR_DATE_RANGE = "CALENDAR_DATE_RANGE",
    MULTI_CALENDAR_DATE_RANGE = "MULTI_CALENDAR_DATE_RANGE",
    SPLIT_TEXT = "SPLIT_TEXT"
}
export interface BaseBifrostFormQuestionResponse {
    type: BifrostFormQuestionResponseType;
}
export interface BifrostFormQuestionTextResponse {
    type: BifrostFormQuestionResponseType.TEXT;
    responseValue: string;
}
export interface BifrostFormQuestionPhoneNumberResponse {
    type: BifrostFormQuestionResponseType.PHONE_NUMBER;
    responseValue: string;
}
export interface BifrostFormQuestionEmailResponse {
    type: BifrostFormQuestionResponseType.EMAIL;
    responseValue: string;
}
export interface BifrostFormQuestionCalendarDateRangeResponse {
    type: BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE;
    responseValue: PendingCalendarDateRange;
}
export interface BifrostFormQuestionMultiCalendarDateRangeResponse {
    type: BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE;
    responseValue: PendingCalendarDateRange[];
}
export interface BifrostFormQuestionSplitTextResponse {
    type: BifrostFormQuestionResponseType.SPLIT_TEXT;
    responseValue: {
        left: string;
        right: string;
    };
}
export type BifrostFormQuestionResponse = BifrostFormQuestionTextResponse | BifrostFormQuestionPhoneNumberResponse | BifrostFormQuestionEmailResponse | BifrostFormQuestionCalendarDateRangeResponse | BifrostFormQuestionMultiCalendarDateRangeResponse | BifrostFormQuestionSplitTextResponse;
