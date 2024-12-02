/// <reference types="react" />
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { BifrostFormApplicationStage } from "../models/BifrostFormApplicationStage";
import { BifrostApiInterface } from "@/apis/bifrostApi/models";
interface HandleProgressToNextBifrostFormApplicationStageProps {
    setBifrostFormApplicationStage: React.Dispatch<React.SetStateAction<BifrostFormApplicationStage>>;
    setActiveBifrostFormQuestionIds: React.Dispatch<React.SetStateAction<string[]>>;
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionsWithResponses: React.Dispatch<React.SetStateAction<BifrostFormQuestionWithResponse[]>>;
    setUserSessionId: React.Dispatch<React.SetStateAction<string | undefined>>;
    hotelId: string;
    bifrostApi: BifrostApiInterface;
}
export declare const handleProgressToNextBifrostFormApplicationStage: ({ setBifrostFormApplicationStage, setActiveBifrostFormQuestionIds, bifrostFormQuestionsWithResponses, setBifrostFormQuestionsWithResponses, setUserSessionId, hotelId, bifrostApi, }: HandleProgressToNextBifrostFormApplicationStageProps) => void;
export {};
