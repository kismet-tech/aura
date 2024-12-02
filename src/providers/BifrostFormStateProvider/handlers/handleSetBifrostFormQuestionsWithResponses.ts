import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";

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
