/// <reference types="react" />
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { BifrostFormApplicationStage } from "../models/BifrostFormApplicationStage";
interface HandleProgressToNextBifrostFormApplicationStageProps {
    setBifrostFormApplicationStage: React.Dispatch<React.SetStateAction<BifrostFormApplicationStage>>;
    setActiveBifrostFormQuestionIds: React.Dispatch<React.SetStateAction<string[]>>;
    setBifrostFormQuestionsWithResponses: React.Dispatch<React.SetStateAction<BifrostFormQuestionWithResponse[]>>;
}
export declare const handleProgressToNextBifrostFormApplicationStage: ({ setBifrostFormApplicationStage, setActiveBifrostFormQuestionIds, setBifrostFormQuestionsWithResponses, }: HandleProgressToNextBifrostFormApplicationStageProps) => void;
export {};
