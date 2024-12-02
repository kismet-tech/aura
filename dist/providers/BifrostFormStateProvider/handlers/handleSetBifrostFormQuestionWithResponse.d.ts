/// <reference types="react" />
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface HandleSetBifrostFormQuestionWithResponseProps {
    updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    setBifrostFormQuestionsWithResponses: (value: React.SetStateAction<BifrostFormQuestionWithResponse[]>) => void;
}
export declare const handleSetBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, setBifrostFormQuestionsWithResponses, }: HandleSetBifrostFormQuestionWithResponseProps) => void;
export {};
