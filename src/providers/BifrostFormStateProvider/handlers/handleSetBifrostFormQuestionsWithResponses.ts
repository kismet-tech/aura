import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";

interface HandleSetBifrostFormQuestionsWithResponsesProps {
  setBifrostFormQuestionsWithResponses: React.Dispatch<
    React.SetStateAction<BifrostFormQuestionWithResponse[]>
  >;
  updatedBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}

export const handleSetBifrostFormQuestionsWithResponses = ({
  setBifrostFormQuestionsWithResponses,
  updatedBifrostFormQuestionsWithResponses,
}: HandleSetBifrostFormQuestionsWithResponsesProps) => {
  setBifrostFormQuestionsWithResponses(
    updatedBifrostFormQuestionsWithResponses
  );
};
