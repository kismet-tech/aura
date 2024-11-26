import { BifrostFormQuestion, RenderableEmailInputBifrostFormQuestion, RenderableMultiSelectDateRangeBifrostFormQuestion, RenderablePhoneInputBifrostFormQuestion, RenderableSelectDateRangeBifrostFormQuestion, RenderableSplitTextInputBifrostFormQuestion, RenderableTextAreaBifrostFormQuestion, RenderableTextInputBifrostFormQuestion, RenderableToggleButtonGroupBifrostFormQuestion } from "./BifrostFormQuestion";
import { BifrostFormQuestionCalendarDateRangeResponse, BifrostFormQuestionEmailResponse, BifrostFormQuestionMultiCalendarDateRangeResponse, BifrostFormQuestionPhoneNumberResponse, BifrostFormQuestionResponse, BifrostFormQuestionResponseType, BifrostFormQuestionSplitTextResponse, BifrostFormQuestionTextResponse } from "./BifrostFormQuestionResponse";
export interface BaseBifrostFormQuestionWithResponse {
    responseType: BifrostFormQuestionResponseType;
    bifrostFormQuestion: BifrostFormQuestion;
    responseData: BifrostFormQuestionResponse;
}
export interface BifrostTextInputFormQuestionWithTextResponse {
    responseType: BifrostFormQuestionResponseType.TEXT;
    bifrostFormQuestion: RenderableTextInputBifrostFormQuestion;
    responseData: BifrostFormQuestionTextResponse;
}
export interface BifrostTextAreaFormQuestionWithTextResponse {
    responseType: BifrostFormQuestionResponseType.TEXT;
    bifrostFormQuestion: RenderableTextAreaBifrostFormQuestion;
    responseData: BifrostFormQuestionTextResponse;
}
export interface BifrostToggleButtonGroupFormQuestionWithTextResponse {
    responseType: BifrostFormQuestionResponseType.TEXT;
    bifrostFormQuestion: RenderableToggleButtonGroupBifrostFormQuestion;
    responseData: BifrostFormQuestionTextResponse;
}
export type BifrostFormQuestionWithTextResponse = BifrostTextInputFormQuestionWithTextResponse | BifrostTextAreaFormQuestionWithTextResponse | BifrostToggleButtonGroupFormQuestionWithTextResponse;
export interface BifrostFormQuestionWithPhoneNumberResponse {
    responseType: BifrostFormQuestionResponseType.PHONE_NUMBER;
    bifrostFormQuestion: RenderablePhoneInputBifrostFormQuestion;
    responseData: BifrostFormQuestionPhoneNumberResponse;
}
export interface BifrostFormQuestionWithEmailResponse {
    responseType: BifrostFormQuestionResponseType.EMAIL;
    bifrostFormQuestion: RenderableEmailInputBifrostFormQuestion;
    responseData: BifrostFormQuestionEmailResponse;
}
export interface BifrostFormQuestionWithCalendarDateRangeResponse {
    responseType: BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE;
    bifrostFormQuestion: RenderableSelectDateRangeBifrostFormQuestion;
    responseData: BifrostFormQuestionCalendarDateRangeResponse;
}
export interface BifrostFormQuestionWithMultiCalendarDateRangeResponse {
    responseType: BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE;
    bifrostFormQuestion: RenderableMultiSelectDateRangeBifrostFormQuestion;
    responseData: BifrostFormQuestionMultiCalendarDateRangeResponse;
}
export interface BifrostFormQuestionWithSplitTextResponse {
    responseType: BifrostFormQuestionResponseType.SPLIT_TEXT;
    bifrostFormQuestion: RenderableSplitTextInputBifrostFormQuestion;
    responseData: BifrostFormQuestionSplitTextResponse;
}
export type BifrostFormQuestionWithResponse = BifrostFormQuestionWithTextResponse | BifrostFormQuestionWithPhoneNumberResponse | BifrostFormQuestionWithEmailResponse | BifrostFormQuestionWithCalendarDateRangeResponse | BifrostFormQuestionWithMultiCalendarDateRangeResponse | BifrostFormQuestionWithSplitTextResponse;
