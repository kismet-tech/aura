/// <reference types="react" />
import { BifrostApiInterface } from "@/apis/bifrostApi/models";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { BifrostFormApplicationStage } from "../models/BifrostFormApplicationStage";
interface HandleBeginUserSessionProps {
    setBifrostFormApplicationStage: React.Dispatch<React.SetStateAction<BifrostFormApplicationStage>>;
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionsWithResponses: React.Dispatch<React.SetStateAction<BifrostFormQuestionWithResponse[]>>;
    setActiveBifrostFormQuestionIds: React.Dispatch<React.SetStateAction<string[]>>;
    setUserSessionId: React.Dispatch<React.SetStateAction<string | undefined>>;
    hotelId: string;
    bifrostTravelerId?: string;
    bifrostApi: BifrostApiInterface;
}
export declare const handleBeginUserSession: ({ setBifrostFormApplicationStage, bifrostFormQuestionsWithResponses, setBifrostFormQuestionsWithResponses, setActiveBifrostFormQuestionIds, setUserSessionId, hotelId, bifrostTravelerId, bifrostApi, }: HandleBeginUserSessionProps) => Promise<void>;
export {};
