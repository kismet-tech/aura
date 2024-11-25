import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface GetUpdatedBifrostFormQuestionsWithResponsesProps {
    previousBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
}
export declare const getUpdatedBifrostFormQuestionsWithResponses: ({ previousBifrostFormQuestionsWithResponses, updatedBifrostFormQuestionWithResponse, }: GetUpdatedBifrostFormQuestionsWithResponsesProps) => BifrostFormQuestionWithResponse[];
export {};
