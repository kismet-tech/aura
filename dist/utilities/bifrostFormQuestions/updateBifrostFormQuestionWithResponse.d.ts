import { BifrostFormQuestionResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionResponse";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface UpdateBifrostFormQuestionWithResponseProps {
    previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    updatedBifrostFormQuestionResponse: BifrostFormQuestionResponse;
}
export declare const updateBifrostFormQuestionWithResponse: ({ previousBifrostFormQuestionWithResponse, updatedBifrostFormQuestionResponse, }: UpdateBifrostFormQuestionWithResponseProps) => BifrostFormQuestionWithResponse;
export {};
