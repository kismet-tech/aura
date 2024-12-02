import {
  BifrostFormQuestionResponse,
  BifrostFormQuestionResponseType,
} from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionResponse";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";

interface UpdateBifrostFormQuestionWithResponseProps {
  previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  updatedBifrostFormQuestionResponse: BifrostFormQuestionResponse;
}

export const updateBifrostFormQuestionWithResponse = ({
  previousBifrostFormQuestionWithResponse,
  updatedBifrostFormQuestionResponse,
}: UpdateBifrostFormQuestionWithResponseProps): BifrostFormQuestionWithResponse => {
  if (
    previousBifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.TEXT &&
    updatedBifrostFormQuestionResponse.type ===
      BifrostFormQuestionResponseType.TEXT
  ) {
    return {
      ...previousBifrostFormQuestionWithResponse,
      responseData: updatedBifrostFormQuestionResponse,
    };
  } else if (
    previousBifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.EMAIL &&
    updatedBifrostFormQuestionResponse.type ===
      BifrostFormQuestionResponseType.EMAIL
  ) {
    return {
      ...previousBifrostFormQuestionWithResponse,
      responseData: updatedBifrostFormQuestionResponse,
    };
  } else if (
    previousBifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.PHONE_NUMBER &&
    updatedBifrostFormQuestionResponse.type ===
      BifrostFormQuestionResponseType.PHONE_NUMBER
  ) {
    return {
      ...previousBifrostFormQuestionWithResponse,
      responseData: updatedBifrostFormQuestionResponse,
    };
  } else if (
    previousBifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE &&
    updatedBifrostFormQuestionResponse.type ===
      BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE
  ) {
    return {
      ...previousBifrostFormQuestionWithResponse,
      responseData: updatedBifrostFormQuestionResponse,
    };
  } else if (
    previousBifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE &&
    updatedBifrostFormQuestionResponse.type ===
      BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE
  ) {
    return {
      ...previousBifrostFormQuestionWithResponse,
      responseData: updatedBifrostFormQuestionResponse,
    };
  } else if (
    previousBifrostFormQuestionWithResponse.responseType ===
      BifrostFormQuestionResponseType.SPLIT_TEXT &&
    updatedBifrostFormQuestionResponse.type ===
      BifrostFormQuestionResponseType.SPLIT_TEXT
  ) {
    return {
      ...previousBifrostFormQuestionWithResponse,
      responseData: updatedBifrostFormQuestionResponse,
    };
  }

  return previousBifrostFormQuestionWithResponse;
};
