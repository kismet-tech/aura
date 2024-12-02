/// <reference types="react" />
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface HandleSetActiveBifrostFormQuestionsWithResponsesProps {
    updatedActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionsWithResponses: React.Dispatch<React.SetStateAction<BifrostFormQuestionWithResponse[]>>;
    setActiveBifrostFormQuestionIds: React.Dispatch<React.SetStateAction<string[]>>;
}
export declare const handleSetActiveBifrostFormQuestionsWithResponses: ({ updatedActiveBifrostFormQuestionsWithResponses, setBifrostFormQuestionsWithResponses, setActiveBifrostFormQuestionIds, }: HandleSetActiveBifrostFormQuestionsWithResponsesProps) => void;
export {};
