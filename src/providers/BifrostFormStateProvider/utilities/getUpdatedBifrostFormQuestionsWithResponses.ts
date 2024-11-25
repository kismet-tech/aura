import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { deepClone } from "@/utilities/core/deepClone";

interface GetUpdatedBifrostFormQuestionsWithResponsesProps {
  previousBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
}

export const getUpdatedBifrostFormQuestionsWithResponses = ({
  previousBifrostFormQuestionsWithResponses,
  updatedBifrostFormQuestionWithResponse,
}: GetUpdatedBifrostFormQuestionsWithResponsesProps): BifrostFormQuestionWithResponse[] => {
  const updatedBifrostFormQuestionsWithResponses =
    previousBifrostFormQuestionsWithResponses.map(
      (bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse) => {
        if (
          bifrostFormQuestionWithResponse.bifrostFormQuestion
            .bifrostFormQuestionId ===
          updatedBifrostFormQuestionWithResponse.bifrostFormQuestion
            .bifrostFormQuestionId
        ) {
          return updatedBifrostFormQuestionWithResponse;
        }
        return bifrostFormQuestionWithResponse;
      }
    );

  return deepClone(updatedBifrostFormQuestionsWithResponses);
};
