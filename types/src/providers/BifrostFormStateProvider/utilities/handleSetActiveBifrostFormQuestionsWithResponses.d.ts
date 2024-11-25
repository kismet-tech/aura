/// <reference types="react" />
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface HandleSetActiveBifrostFormQuestionsWithResponsesProps {
    updatedActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionsWithResponses: React.Dispatch<React.SetStateAction<BifrostFormQuestionWithResponse[]>>;
    setActiveBifrostFormQuestionsWithResponses: React.Dispatch<React.SetStateAction<BifrostFormQuestionWithResponse[]>>;
}
export declare const handleSetActiveBifrostFormQuestionsWithResponses: ({ updatedActiveBifrostFormQuestionsWithResponses, setBifrostFormQuestionsWithResponses, setActiveBifrostFormQuestionsWithResponses, }: HandleSetActiveBifrostFormQuestionsWithResponsesProps) => void;
export {};
