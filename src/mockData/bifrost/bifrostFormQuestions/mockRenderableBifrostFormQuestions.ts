import {
  FormQuestionType,
  RenderableEmailInputBifrostFormQuestion,
  RenderableMultiSelectDateRangeBifrostFormQuestion,
  RenderablePhoneInputBifrostFormQuestion,
  RenderableSelectDateRangeBifrostFormQuestion,
  RenderableSplitTextInputBifrostFormQuestion,
  RenderableTextAreaBifrostFormQuestion,
  RenderableTextInputBifrostFormQuestion,
  RenderableToggleButtonGroupBifrostFormQuestion,
} from "@/models/BifrostFormQuestions/BifrostFormQuestion";
import { ReservedBifrostFormQuestionIds } from "@/models/BifrostFormQuestions/ReservedBifrostFormQuestionIds";
import {
  ReservedBifrostDateFlexibilityOptionValues,
  ReservedBifrostReasonForTravelOptionValues,
} from "@/models/BifrostFormQuestions/ReservedBifrostFormQuestionValues";

//////////////////////////////////////////////////
// Text Inputs
//////////////////////////////////////////////////

export const mockRenderableTextInputBifrostFormQuestionOne: RenderableTextInputBifrostFormQuestion =
  {
    type: FormQuestionType.TEXT_INPUT,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.FIRST_NAME,
    label: "First",
    required: true,
  };

export const mockRenderableTextInputBifrostFormQuestionTwo: RenderableTextInputBifrostFormQuestion =
  {
    type: FormQuestionType.TEXT_INPUT,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.LAST_NAME,
    label: "Last",
    required: true,
  };

export const mockRenderableEmailInputBifrostFormQuestionOne: RenderableEmailInputBifrostFormQuestion =
  {
    type: FormQuestionType.EMAIL,
    bifrostFormQuestionId: FormQuestionType.EMAIL,
    label: "Email",
    required: true,
  };

export const mockRenderablePhoneInputBifrostFormQuestionOne: RenderablePhoneInputBifrostFormQuestion =
  {
    type: FormQuestionType.PHONE,
    bifrostFormQuestionId: FormQuestionType.PHONE,
    label: "Phone",
    required: true,
  };

export const mockRenderableTextAreaBifrostFormQuestionOne: RenderableTextAreaBifrostFormQuestion =
  {
    type: FormQuestionType.TEXT_AREA,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.INQUIRY_DETAILS,
    label: "Inquiry details",
  };

//////////////////////////////////////////////////
// Buttons
//////////////////////////////////////////////////

export const mockRenderableToggleButtonGroupBifrostFormQuestionOne: RenderableToggleButtonGroupBifrostFormQuestion =
  {
    type: FormQuestionType.TOGGLE_BUTTON_GROUP,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.REASON_FOR_TRAVEL,
    label: "Dates",
    options: [
      {
        label: "Business",
        value: ReservedBifrostReasonForTravelOptionValues.BUSINESS,
      },
      {
        label: "Social",
        value: ReservedBifrostReasonForTravelOptionValues.SOCIAL,
      },
      {
        label: "Other",
        value: ReservedBifrostReasonForTravelOptionValues.OTHER,
      },
    ],
  };

export const mockRenderableToggleButtonGroupBifrostFormQuestionTwo: RenderableToggleButtonGroupBifrostFormQuestion =
  {
    type: FormQuestionType.TOGGLE_BUTTON_GROUP,
    bifrostFormQuestionId:
      ReservedBifrostFormQuestionIds.ARE_ITINERARY_DATES_FLEXIBLE,
    label: "Dates",
    options: [
      {
        label: "my dates are firm",
        value: ReservedBifrostDateFlexibilityOptionValues.FIRM_DATES,
      },
      {
        label: "flexible",
        value: ReservedBifrostDateFlexibilityOptionValues.FLEXIBLE_DATES,
      },
      {
        label: "still deciding",
        value: ReservedBifrostDateFlexibilityOptionValues.STILL_DECIDING,
      },
    ],
  };

//////////////////////////////////////////////////
// DateTime Inputs
//////////////////////////////////////////////////

export const mockRenderableSelectDateRangeBifrostFormQuestionOne: RenderableSelectDateRangeBifrostFormQuestion =
  {
    type: FormQuestionType.SELECT_DATE_RANGE,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.DATES,
    label: "Dates",
  };

export const mockRenderableMultiSelectDateRangeBifrostFormQuestionOne: RenderableMultiSelectDateRangeBifrostFormQuestion =
  {
    type: FormQuestionType.MULTI_SELECT_DATE_RANGE,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.POTENTIAL_DATES,
    label: "Potential dates",
  };

//////////////////////////////////////////////////
// Multi-Field Inputs
//////////////////////////////////////////////////

export const mockRenderableSplitTextInputBifrostFormQuestionOne: RenderableSplitTextInputBifrostFormQuestion =
  {
    bifrostFormQuestionId: `${mockRenderableTextInputBifrostFormQuestionOne.bifrostFormQuestionId}-${mockRenderableTextInputBifrostFormQuestionTwo.bifrostFormQuestionId}`,
    type: FormQuestionType.SPLIT_TEXT_INPUT,
    label: "Contact info",

    left: mockRenderableTextInputBifrostFormQuestionOne,
    right: mockRenderableTextInputBifrostFormQuestionTwo,
  };
