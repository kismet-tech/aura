import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface GetHistoricalBifrostFormQuestionsWithResponsesProps {
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    activeBifrostFormQuestionIds: string[];
}
export declare const getHistoricalBifrostFormQuestionsWithResponses: ({ bifrostFormQuestionsWithResponses, activeBifrostFormQuestionIds, }: GetHistoricalBifrostFormQuestionsWithResponsesProps) => BifrostFormQuestionWithResponse[];
export {};
