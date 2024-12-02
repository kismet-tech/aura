import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface HandleGetActiveBifrostFormQuestionsWithResponsesProps {
    activeBifrostFormQuestionIds: string[];
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}
export declare const handleGetActiveBifrostFormQuestionsWithResponses: ({ activeBifrostFormQuestionIds, bifrostFormQuestionsWithResponses, }: HandleGetActiveBifrostFormQuestionsWithResponsesProps) => BifrostFormQuestionWithResponse[];
export {};
