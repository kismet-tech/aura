import React from "react";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { RenderableItineraryOffer } from "@/models/RenderableItineraryOffer";
interface MockBifrostFormStateProviderProps {
    mockBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    mockActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    mockRenderableItineraryOffersFromKismetAI?: RenderableItineraryOffer[];
    createUserSession: boolean;
    children: React.ReactNode;
}
export declare const MockBifrostFormStateProvider: React.MemoExoticComponent<({ mockBifrostFormQuestionsWithResponses, mockActiveBifrostFormQuestionsWithResponses, mockRenderableItineraryOffersFromKismetAI, createUserSession, children, }: MockBifrostFormStateProviderProps) => React.JSX.Element>;
export {};
