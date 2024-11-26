import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";

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
