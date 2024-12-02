import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface GetHistoricalBifrostFormQuestionsWithResponsesProps {
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    activeBifrostFormQuestionIds: string[];
}
export declare const getHistoricalBifrostFormQuestionsWithResponses: ({ bifrostFormQuestionsWithResponses, activeBifrostFormQuestionIds, }: GetHistoricalBifrostFormQuestionsWithResponsesProps) => BifrostFormQuestionWithResponse[];
export {};
