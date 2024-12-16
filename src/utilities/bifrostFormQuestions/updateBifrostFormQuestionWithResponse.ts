import {
  BifrostFormQuestionResponse,
  BifrostFormQuestionResponseType,
} from "@kismet_ai/foundation";
import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";

interface UpdateBifrostFormQuestionWithResponseProps {
  previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  updatedBifrostFormQuestionResponse: BifrostFormQuestionResponse;
}

export const updateBifrostFormQuestionWithResponse = ({
  previousBifrostFormQuestionWithResponse,
  updatedBifrostFormQuestionResponse,
}: UpdateBifrostFormQuestionWithResponseProps): BifrostFormQuestionWithResponse => {
  return {
    ...previousBifrostFormQuestionWithResponse,
    responseData: updatedBifrostFormQuestionResponse,
  } as BifrostFormQuestionWithResponse;
};
