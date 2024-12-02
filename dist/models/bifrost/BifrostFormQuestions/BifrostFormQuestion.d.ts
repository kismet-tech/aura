export declare enum BifrostFormQuestionType {
    TEXT_INPUT = "TEXT_INPUT",
    EMAIL = "EMAIL",
    PHONE = "PHONE",
    TEXT_AREA = "TEXT_AREA",
    TOGGLE_BUTTON_GROUP = "TOGGLE_BUTTON_GROUP",
    SELECT_DATE_RANGE = "SELECT_DATE_RANGE",
    MULTI_SELECT_DATE_RANGE = "MULTI_SELECT_DATE_RANGE",
    SPLIT_TEXT_INPUT = "SPLIT_TEXT_INPUT"
}
export interface BaseRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType;
    bifrostFormQuestionId: string;
    chatLabel: string;
}
export interface SingleRenderableBifrostFormQuestion extends BaseRenderableBifrostFormQuestion {
    label: string;
    required?: boolean;
}
export interface RenderableTextInputBifrostFormQuestion extends SingleRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.TEXT_INPUT;
    autocomplete?: string;
}
export interface RenderableEmailInputBifrostFormQuestion extends SingleRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.EMAIL;
    autocomplete?: string;
}
export interface RenderablePhoneInputBifrostFormQuestion extends SingleRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.PHONE;
    autocomplete?: string;
}
export interface RenderableTextAreaBifrostFormQuestion extends SingleRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.TEXT_AREA;
}
export interface RenderableToggleButtonGroupBifrostFormQuestionOption {
    label: string;
    value: string;
}
export interface RenderableToggleButtonGroupBifrostFormQuestion extends SingleRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.TOGGLE_BUTTON_GROUP;
    options: RenderableToggleButtonGroupBifrostFormQuestionOption[];
}
export interface RenderableSelectDateRangeBifrostFormQuestion extends SingleRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.SELECT_DATE_RANGE;
}
export interface RenderableMultiSelectDateRangeBifrostFormQuestion extends SingleRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.MULTI_SELECT_DATE_RANGE;
}
export interface RenderableSplitTextInputBifrostFormQuestion extends BaseRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.SPLIT_TEXT_INPUT;
    label?: string;
    left: RenderableTextInputBifrostFormQuestion;
    right: RenderableTextInputBifrostFormQuestion;
}
export type BifrostFormQuestion = RenderableTextInputBifrostFormQuestion | RenderableEmailInputBifrostFormQuestion | RenderablePhoneInputBifrostFormQuestion | RenderableTextAreaBifrostFormQuestion | RenderableToggleButtonGroupBifrostFormQuestion | RenderableSelectDateRangeBifrostFormQuestion | RenderableMultiSelectDateRangeBifrostFormQuestion | RenderableSplitTextInputBifrostFormQuestion;
