/// <reference types="react" />
import { BifrostApiInterface } from "@/apis/bifrostApi/models";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
import { BifrostFormApplicationStage } from "../models/BifrostFormApplicationStage";
interface HandleSubmitBifrostFormQuestionProps {
    userSessionId: string;
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    activeBifrostFormQuestionIds: string[];
    setBifrostFormQuestionsWithResponses: React.Dispatch<React.SetStateAction<BifrostFormQuestionWithResponse[]>>;
    setActiveBifrostFormQuestionIds: React.Dispatch<React.SetStateAction<string[]>>;
    setRenderableItineraryOffersFromKismetAI: React.Dispatch<React.SetStateAction<RenderableItineraryOffer[] | undefined>>;
    setBifrostFormApplicationStage: React.Dispatch<React.SetStateAction<BifrostFormApplicationStage>>;
    hotelId: string;
    bifrostApi: BifrostApiInterface;
}
export declare const handleSubmitBifrostFormQuestion: ({ userSessionId, bifrostFormQuestionsWithResponses, activeBifrostFormQuestionIds, setBifrostFormQuestionsWithResponses, setActiveBifrostFormQuestionIds, setRenderableItineraryOffersFromKismetAI, setBifrostFormApplicationStage, hotelId, bifrostApi, }: HandleSubmitBifrostFormQuestionProps) => void;
export {};
