/// <reference types="react" />
import { BifrostApiInterface } from "@/apis/bifrostApi/models";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { RenderableItineraryOffer } from "@/models/RenderableItineraryOffer";
import { BifrostFormApplicationStage } from "../models/BifrostFormApplicationStage";
interface HandleSubmitBifrostFormQuestionProps {
    userSessionId: string;
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    activeBifrostFormQuestionIds: string[];
    setBifrostFormQuestionsWithResponses: React.Dispatch<React.SetStateAction<BifrostFormQuestionWithResponse[]>>;
    setActiveBifrostFormQuestionIds: React.Dispatch<React.SetStateAction<string[]>>;
    setRenderableItineraryOffersFromKismetAI: React.Dispatch<React.SetStateAction<RenderableItineraryOffer[] | undefined>>;
    setBifrostFormApplicationStage: React.Dispatch<React.SetStateAction<BifrostFormApplicationStage>>;
    bifrostApi: BifrostApiInterface;
}
export declare const handleSubmitBifrostFormQuestion: ({ userSessionId, bifrostFormQuestionsWithResponses, activeBifrostFormQuestionIds, setBifrostFormQuestionsWithResponses, setActiveBifrostFormQuestionIds, setRenderableItineraryOffersFromKismetAI, setBifrostFormApplicationStage, bifrostApi, }: HandleSubmitBifrostFormQuestionProps) => void;
export {};
