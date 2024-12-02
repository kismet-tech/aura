import { BifrostFormQuestionResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionResponse";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface UpdateBifrostFormQuestionWithResponseProps {
    previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    updatedBifrostFormQuestionResponse: BifrostFormQuestionResponse;
}
export declare const updateBifrostFormQuestionWithResponse: ({ previousBifrostFormQuestionWithResponse, updatedBifrostFormQuestionResponse, }: UpdateBifrostFormQuestionWithResponseProps) => BifrostFormQuestionWithResponse;
export {};
