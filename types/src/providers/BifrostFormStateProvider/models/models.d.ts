import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { ReactNode } from "react";
import { BifrostFormApplicationStage } from "./BifrostFormApplicationStage";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { BifrostApiInterface } from "@/apis/bifrostApi/models";
import { RenderableItineraryOffer } from "@/models/RenderableItineraryOffer";
export interface BifrostFormStateProviderProps {
    children: ReactNode;
    bifrostApi: BifrostApiInterface;
}
export interface BifrostFormStateContextValue {
    bifrostFormApplicationStage: BifrostFormApplicationStage;
    stepBackToPreviousBifrostFormApplicationStage: () => Promise<void>;
    beginUserSession: () => Promise<void>;
    submitBifrostFormQuestion: () => Promise<void>;
    paymentsPageUrl: string;
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionsWithResponses: ({ updatedBifrostFormQuestionsWithResponses, }: {
        updatedBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    }) => void;
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
    activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setActiveBifrostFormQuestionsWithResponses: ({ updatedActiveBifrostFormQuestionsWithResponses, }: {
        updatedActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    }) => void;
    historicalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    renderablePendingItinerary: RenderablePendingItinerary;
    renderableItineraryOffersFromKismetAI: RenderableItineraryOffer[] | undefined;
    customRenderableItineraryOfferFromGuest: RenderableItineraryOffer | undefined;
    setRenderableItineraryOffersFromKismetAI: ({ updatedRenderableItineraryOffers, }: {
        updatedRenderableItineraryOffers: RenderableItineraryOffer[];
    }) => void;
    updateItineraryOfferHotelRoomCount: ({ itineraryOfferId, hotelRoomId, updatedCountOffered, }: {
        itineraryOfferId: string;
        hotelRoomId: string;
        updatedCountOffered: number;
    }) => Promise<{
        updatedItineraryOfferId: string;
    }>;
}
