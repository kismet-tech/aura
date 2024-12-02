import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { deepClone } from "@/utilities/core/deepClone";
import { useReactStateCache } from "@/utilities/core/react/useReactStateCache";

interface HandleSetBifrostFormQuestionWithResponseProps {
  updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  setBifrostFormQuestionsWithResponses: (
    value: React.SetStateAction<BifrostFormQuestionWithResponse[]>
  ) => void;
}

export const handleSetBifrostFormQuestionWithResponse = ({
  updatedBifrostFormQuestionWithResponse,
  setBifrostFormQuestionsWithResponses,
}: HandleSetBifrostFormQuestionWithResponseProps) => {
  setBifrostFormQuestionsWithResponses(
    (
      previousBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[]
    ) => {
      const updatedBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[] =
        deepClone(previousBifrostFormQuestionsWithResponses).map(
          (
            bifrostFormQuestionWithResponseElement: BifrostFormQuestionWithResponse
          ) => {
            if (
              bifrostFormQuestionWithResponseElement.bifrostFormQuestion
                .bifrostFormQuestionId ===
              updatedBifrostFormQuestionWithResponse.bifrostFormQuestion
                .bifrostFormQuestionId
            ) {
              return updatedBifrostFormQuestionWithResponse;
            } else {
              return bifrostFormQuestionWithResponseElement;
            }
          }
        );

      return useReactStateCache({
        updatedValue: updatedBifrostFormQuestionsWithResponses,
        previousValue: previousBifrostFormQuestionsWithResponses,
      });
    }
  );
};
