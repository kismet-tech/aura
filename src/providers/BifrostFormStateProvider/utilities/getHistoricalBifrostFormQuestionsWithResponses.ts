import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";

interface GetHistoricalBifrostFormQuestionsWithResponsesProps {
  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  activeBifrostFormQuestionIds: string[];
}

export const getHistoricalBifrostFormQuestionsWithResponses = ({
  bifrostFormQuestionsWithResponses,
  activeBifrostFormQuestionIds,
}: GetHistoricalBifrostFormQuestionsWithResponsesProps): BifrostFormQuestionWithResponse[] => {
  return bifrostFormQuestionsWithResponses.filter(
    (bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse) => {
      return !activeBifrostFormQuestionIds.includes(
        bifrostFormQuestionsWithResponses.bifrostFormQuestion
          .bifrostFormQuestionId
      );
    }
  );
};
