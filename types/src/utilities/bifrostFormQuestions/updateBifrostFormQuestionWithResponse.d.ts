import { BifrostFormQuestionResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionResponse";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface UpdateBifrostFormQuestionWithResponseProps {
    previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    bifrostFormQuestionResponse: BifrostFormQuestionResponse;
}
export declare const updateBifrostFormQuestionWithResponse: ({ previousBifrostFormQuestionWithResponse, bifrostFormQuestionResponse, }: UpdateBifrostFormQuestionWithResponseProps) => BifrostFormQuestionWithResponse;
export {};
