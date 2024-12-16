import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";
interface GetHistoricalBifrostFormQuestionsWithResponsesProps {
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    activeBifrostFormQuestionIds: string[];
}
export declare const getHistoricalBifrostFormQuestionsWithResponses: ({ bifrostFormQuestionsWithResponses, activeBifrostFormQuestionIds, }: GetHistoricalBifrostFormQuestionsWithResponsesProps) => BifrostFormQuestionWithResponse[];
export {};
