/// <reference types="react" />
import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";
interface HandleSetBifrostFormQuestionsWithResponsesProps {
    setBifrostFormQuestionsWithResponses: React.Dispatch<React.SetStateAction<BifrostFormQuestionWithResponse[]>>;
    updatedBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}
export declare const handleSetBifrostFormQuestionsWithResponses: ({ setBifrostFormQuestionsWithResponses, updatedBifrostFormQuestionsWithResponses, }: HandleSetBifrostFormQuestionsWithResponsesProps) => void;
export {};
