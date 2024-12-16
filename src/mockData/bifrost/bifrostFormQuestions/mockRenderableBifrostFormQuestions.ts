import {
  BifrostFormQuestionType,
  RenderableEmailInputBifrostFormQuestion,
  RenderableMultiSelectDateRangeBifrostFormQuestion,
  RenderablePhoneInputBifrostFormQuestion,
  RenderableSelectDateRangeBifrostFormQuestion,
  RenderableSplitTextInputBifrostFormQuestion,
  RenderableTextAreaBifrostFormQuestion,
  RenderableTextInputBifrostFormQuestion,
  RenderableToggleButtonGroupBifrostFormQuestion,
} from "@kismet_ai/foundation";
import { ReservedBifrostFormQuestionIds } from "@kismet_ai/foundation";
import {
  ReservedBifrostDateFlexibilityOptionValues,
  ReservedBifrostReasonForTravelOptionValues,
  ReservedBifrostSplitPaymentOptionValues,
} from "@kismet_ai/foundation";

//////////////////////////////////////////////////
// Text Inputs
//////////////////////////////////////////////////

export const mockRenderableTextInputBifrostFormQuestionOne: RenderableTextInputBifrostFormQuestion =
  {
    type: BifrostFormQuestionType.TEXT_INPUT,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.FIRST_NAME,
    label: "First",
    chatLabel: "Can you please share your first name?",
    required: true,
  };

export const mockRenderableTextInputBifrostFormQuestionTwo: RenderableTextInputBifrostFormQuestion =
  {
    type: BifrostFormQuestionType.TEXT_INPUT,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.LAST_NAME,
    label: "Last",
    chatLabel: "Can you please share your last name?",
    required: true,
  };

export const mockRenderableTextInputBifrostFormQuestionThree: RenderableTextInputBifrostFormQuestion =
  {
    type: BifrostFormQuestionType.TEXT_INPUT,
    bifrostFormQuestionId:
      ReservedBifrostFormQuestionIds.FLEXIBLE_DATE_DESCRIPTION,
    label: "Details",
    chatLabel: "Can you share any details on your date flexibility?",
    required: true,
  };

export const mockRenderableTextInputBifrostFormQuestionFour: RenderableTextInputBifrostFormQuestion =
  {
    type: BifrostFormQuestionType.TEXT_INPUT,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.ESTIMATED_GUEST_COUNT,
    label: "Guests",
    chatLabel: "How many guests will be traveling?",
    required: false,
  };

export const mockRenderableTextInputBifrostFormQuestionFive: RenderableTextInputBifrostFormQuestion =
  {
    type: BifrostFormQuestionType.TEXT_INPUT,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.COUNT_OF_ROOMS_NEEDED,
    label: "Rooms",
    chatLabel: "How many rooms will you need?",
    required: false,
  };

export const mockRenderableEmailInputBifrostFormQuestionOne: RenderableEmailInputBifrostFormQuestion =
  {
    type: BifrostFormQuestionType.EMAIL,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.EMAIL,
    label: "Email",
    chatLabel: "What is your email?",
    required: true,
  };

export const mockRenderablePhoneInputBifrostFormQuestionOne: RenderablePhoneInputBifrostFormQuestion =
  {
    type: BifrostFormQuestionType.PHONE,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.PHONE,
    label: "Phone",
    chatLabel: "What is your phone number?",
    required: true,
  };

export const mockRenderableTextAreaBifrostFormQuestionOne: RenderableTextAreaBifrostFormQuestion =
  {
    type: BifrostFormQuestionType.TEXT_AREA,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.INQUIRY_DETAILS,
    label: "Inquiry details",
    chatLabel: "Inquiry Details",
    required: true,
  };

//////////////////////////////////////////////////
// Buttons
//////////////////////////////////////////////////

export const mockRenderableToggleButtonGroupBifrostFormQuestionOne: RenderableToggleButtonGroupBifrostFormQuestion =
  {
    type: BifrostFormQuestionType.TOGGLE_BUTTON_GROUP,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.REASON_FOR_TRAVEL,
    label: "",
    chatLabel: "What is your reason for travel?",
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
    type: BifrostFormQuestionType.TOGGLE_BUTTON_GROUP,
    bifrostFormQuestionId:
      ReservedBifrostFormQuestionIds.ARE_ITINERARY_DATES_FLEXIBLE,
    label: "Dates",
    chatLabel: "Are your dates flexible?",
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

export const mockRenderableToggleButtonGroupBifrostFormQuestionThree: RenderableToggleButtonGroupBifrostFormQuestion =
  {
    type: BifrostFormQuestionType.TOGGLE_BUTTON_GROUP,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.PAYMENT_SPLIT,
    label: "Split payment?",
    chatLabel: "Split payment?",
    options: [
      {
        label: "guests pay individually",
        value: ReservedBifrostSplitPaymentOptionValues.SINGLE_PAYER,
      },
      {
        label: "host will pay for rooms",
        value: ReservedBifrostSplitPaymentOptionValues.SPLIT_PAYER,
      },
    ],
  };

//////////////////////////////////////////////////
// DateTime Inputs
//////////////////////////////////////////////////

export const mockRenderableSelectDateRangeBifrostFormQuestionOne: RenderableSelectDateRangeBifrostFormQuestion =
  {
    type: BifrostFormQuestionType.SELECT_DATE_RANGE,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.DATES,
    label: "Dates",
    chatLabel: "What are your dates for travel?",
  };

export const mockRenderableMultiSelectDateRangeBifrostFormQuestionOne: RenderableMultiSelectDateRangeBifrostFormQuestion =
  {
    type: BifrostFormQuestionType.MULTI_SELECT_DATE_RANGE,
    bifrostFormQuestionId: ReservedBifrostFormQuestionIds.POTENTIAL_DATES,
    label: "Potential dates",
    chatLabel:
      "Can you share any details related to the expected dates for your trip?",
  };

//////////////////////////////////////////////////
// Multi-Field Inputs
//////////////////////////////////////////////////

export const mockRenderableSplitTextInputBifrostFormQuestionOne: RenderableSplitTextInputBifrostFormQuestion =
  {
    bifrostFormQuestionId: `${mockRenderableTextInputBifrostFormQuestionOne.bifrostFormQuestionId}-${mockRenderableTextInputBifrostFormQuestionTwo.bifrostFormQuestionId}`,
    type: BifrostFormQuestionType.SPLIT_TEXT_INPUT,
    // label: "Contact info",
    label: "",
    chatLabel: "Can you please share your first and last name?",

    left: mockRenderableTextInputBifrostFormQuestionOne,
    right: mockRenderableTextInputBifrostFormQuestionTwo,
  };

export const mockRenderableSplitTextInputBifrostFormQuestionTwo: RenderableSplitTextInputBifrostFormQuestion =
  {
    bifrostFormQuestionId: `${mockRenderableTextInputBifrostFormQuestionFour.bifrostFormQuestionId}-${mockRenderableTextInputBifrostFormQuestionFive.bifrostFormQuestionId}`,
    type: BifrostFormQuestionType.SPLIT_TEXT_INPUT,
    chatLabel:
      "How many rooms do you require? How many guests will be joining you?",

    left: mockRenderableTextInputBifrostFormQuestionFour,
    right: mockRenderableTextInputBifrostFormQuestionFive,
  };
