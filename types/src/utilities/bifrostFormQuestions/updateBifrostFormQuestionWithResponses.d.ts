import { BifrostFormQuestionResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionResponse";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface UpdateBifrostFormQuestionWithResponsesProps {
    previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    bifrostFormQuestionResponse: BifrostFormQuestionResponse;
}
export declare const updateBifrostFormQuestionWithResponses: ({ previousBifrostFormQuestionWithResponse, bifrostFormQuestionResponse, }: UpdateBifrostFormQuestionWithResponsesProps) => BifrostFormQuestionWithResponse;
export {};
