import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface HandleGetActiveBifrostFormQuestionsWithResponsesProps {
    activeBifrostFormQuestionIds: string[];
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}
export declare const handleGetActiveBifrostFormQuestionsWithResponses: ({ activeBifrostFormQuestionIds, bifrostFormQuestionsWithResponses, }: HandleGetActiveBifrostFormQuestionsWithResponsesProps) => BifrostFormQuestionWithResponse[];
export {};
