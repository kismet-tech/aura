import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { deepClone } from "@/utilities/core/deepClone";
import { deepEqual } from "@/utilities/core/deepEqual";

interface HandleSetActiveBifrostFormQuestionsWithResponsesProps {
  updatedActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  setBifrostFormQuestionsWithResponses: React.Dispatch<
    React.SetStateAction<BifrostFormQuestionWithResponse[]>
  >;
  setActiveBifrostFormQuestionIds: React.Dispatch<
    React.SetStateAction<string[]>
  >;
}

export const handleSetActiveBifrostFormQuestionsWithResponses = ({
  updatedActiveBifrostFormQuestionsWithResponses,
  setBifrostFormQuestionsWithResponses,
  setActiveBifrostFormQuestionIds,
}: HandleSetActiveBifrostFormQuestionsWithResponsesProps) => {
  console.log(`REQUESTING TO PROGRESS TO NEXT STAGE INNER`);
  console.log(
    JSON.stringify(
      {
        updatedActiveBifrostFormQuestionsWithResponses,
      },
      null,
      4
    )
  );

  setBifrostFormQuestionsWithResponses(
    (
      previousBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[]
    ) => {
      // Extract existing answers if they exist in the previous form questions
      const updatedActiveBifrostFormQuestionsWithResponsesWithExistingAnswers: BifrostFormQuestionWithResponse[] =
        deepClone(updatedActiveBifrostFormQuestionsWithResponses).map(
          (
            updatedActiveBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse
          ) => {
            const maybeExistingBifrostFormQuestionWithResponse:
              | BifrostFormQuestionWithResponse
              | undefined = previousBifrostFormQuestionsWithResponses.find(
              (previousBifrostFormQuestionWithResponse) =>
                previousBifrostFormQuestionWithResponse.bifrostFormQuestion
                  .bifrostFormQuestionId ===
                updatedActiveBifrostFormQuestionWithResponse.bifrostFormQuestion
                  .bifrostFormQuestionId
            );
            if (maybeExistingBifrostFormQuestionWithResponse) {
              return maybeExistingBifrostFormQuestionWithResponse;
            }
            return updatedActiveBifrostFormQuestionWithResponse;
          }
        );

      // Filter out previous form questions that are not in the updated active form questions
      const previousBifrostFormQuestionsWithResponsesFilteredFromUpdatedActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[] =
        deepClone(previousBifrostFormQuestionsWithResponses).filter(
          (
            previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse
          ) =>
            !updatedActiveBifrostFormQuestionsWithResponses.find(
              (updatedActiveBifrostFormQuestionWithResponse) =>
                updatedActiveBifrostFormQuestionWithResponse.bifrostFormQuestion
                  .bifrostFormQuestionId ===
                previousBifrostFormQuestionWithResponse.bifrostFormQuestion
                  .bifrostFormQuestionId
            )
        );

      const updatedBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[] =
        [
          ...updatedActiveBifrostFormQuestionsWithResponsesWithExistingAnswers,
          ...previousBifrostFormQuestionsWithResponsesFilteredFromUpdatedActiveBifrostFormQuestionsWithResponses,
        ];

      setActiveBifrostFormQuestionIds(
        (previousActiveBifrostFormQuestionIds: string[]) => {
          const updatedActiveBifrostFormQuestionIds: string[] =
            updatedActiveBifrostFormQuestionsWithResponses.map(
              (
                updatedActiveBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse
              ) =>
                updatedActiveBifrostFormQuestionWithResponse.bifrostFormQuestion
                  .bifrostFormQuestionId
            );

          console.log("\n\nDOWN HERE 3");
          console.log(
            JSON.stringify(
              {
                updatedActiveBifrostFormQuestionsWithResponses,
              },
              null,
              4
            )
          );

          console.log(
            `updatedActiveBifrostFormQuestionIds: ${updatedActiveBifrostFormQuestionIds}`
          );
          console.log(
            `previousActiveBifrostFormQuestionIds: ${previousActiveBifrostFormQuestionIds}`
          );

          if (
            deepEqual(
              updatedActiveBifrostFormQuestionIds,
              previousActiveBifrostFormQuestionIds
            )
          ) {
            return previousActiveBifrostFormQuestionIds;
          } else {
            return updatedActiveBifrostFormQuestionIds;
          }
        }
      );

      if (
        deepEqual(
          updatedBifrostFormQuestionsWithResponses,
          previousBifrostFormQuestionsWithResponses
        )
      ) {
        return previousBifrostFormQuestionsWithResponses;
      } else {
        return updatedBifrostFormQuestionsWithResponses;
      }
    }
  );
};
