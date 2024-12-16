/// <reference types="react" />
import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";
interface HandleSetActiveBifrostFormQuestionsWithResponsesProps {
    updatedActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionsWithResponses: React.Dispatch<React.SetStateAction<BifrostFormQuestionWithResponse[]>>;
    setActiveBifrostFormQuestionIds: React.Dispatch<React.SetStateAction<string[]>>;
}
export declare const handleSetActiveBifrostFormQuestionsWithResponses: ({ updatedActiveBifrostFormQuestionsWithResponses, setBifrostFormQuestionsWithResponses, setActiveBifrostFormQuestionIds, }: HandleSetActiveBifrostFormQuestionsWithResponsesProps) => void;
export {};
