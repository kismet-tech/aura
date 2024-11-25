import {
  BifrostFormQuestionResponse,
  BifrostFormQuestionResponseType,
} from "@/models/BifrostFormQuestions/BifrostFormQuestionResponse";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";

interface UpdateBifrostFormQuestionWithResponseProps {
  previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  bifrostFormQuestionResponse: BifrostFormQuestionResponse;
}

export const updateBifrostFormQuestionWithResponse = ({
  previousBifrostFormQuestionWithResponse,
  bifrostFormQuestionResponse,
}: UpdateBifrostFormQuestionWithResponseProps): BifrostFormQuestionWithResponse => {
  if (
    previousBifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.TEXT &&
    bifrostFormQuestionResponse.type === BifrostFormQuestionResponseType.TEXT
  ) {
    return {
      ...previousBifrostFormQuestionWithResponse,
      responseData: bifrostFormQuestionResponse,
    };
  } else if (
    previousBifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.EMAIL &&
    bifrostFormQuestionResponse.type === BifrostFormQuestionResponseType.EMAIL
  ) {
    return {
      ...previousBifrostFormQuestionWithResponse,
      responseData: bifrostFormQuestionResponse,
    };
  } else if (
    previousBifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.PHONE_NUMBER &&
    bifrostFormQuestionResponse.type ===
      BifrostFormQuestionResponseType.PHONE_NUMBER
  ) {
    return {
      ...previousBifrostFormQuestionWithResponse,
      responseData: bifrostFormQuestionResponse,
    };
  } else if (
    previousBifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE &&
    bifrostFormQuestionResponse.type ===
      BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE
  ) {
    return {
      ...previousBifrostFormQuestionWithResponse,
      responseData: bifrostFormQuestionResponse,
    };
  } else if (
    previousBifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE &&
    bifrostFormQuestionResponse.type ===
      BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE
  ) {
    return {
      ...previousBifrostFormQuestionWithResponse,
      responseData: bifrostFormQuestionResponse,
    };
  } else if (
    previousBifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.SPLIT_TEXT &&
    bifrostFormQuestionResponse.type ===
      BifrostFormQuestionResponseType.SPLIT_TEXT
  ) {
    return {
      ...previousBifrostFormQuestionWithResponse,
      responseData: bifrostFormQuestionResponse,
    };
  }

  return previousBifrostFormQuestionWithResponse;
};
