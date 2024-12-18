import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";

interface HandleGetActiveBifrostFormQuestionsWithResponsesProps {
  activeBifrostFormQuestionIds: string[];
  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}

export const handleGetActiveBifrostFormQuestionsWithResponses = ({
  activeBifrostFormQuestionIds,
  bifrostFormQuestionsWithResponses,
}: HandleGetActiveBifrostFormQuestionsWithResponsesProps): BifrostFormQuestionWithResponse[] => {
  return activeBifrostFormQuestionIds
    .filter((activeBifrostFormQuestionId) =>
      bifrostFormQuestionsWithResponses.find(
        (bifrostFormQuestionWithResponse) =>
          bifrostFormQuestionWithResponse.bifrostFormQuestion
            .bifrostFormQuestionId === activeBifrostFormQuestionId
      )
    )
    .map((activeBifrostFormQuestionId) => {
      return bifrostFormQuestionsWithResponses.find(
        (bifrostFormQuestionWithResponse) =>
          bifrostFormQuestionWithResponse.bifrostFormQuestion
            .bifrostFormQuestionId === activeBifrostFormQuestionId
      ) as BifrostFormQuestionWithResponse;
    });
};
