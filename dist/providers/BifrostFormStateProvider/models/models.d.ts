import { BifrostFormQuestionWithResponse, CalendarDateRange } from "@kismet_ai/foundation";
import { ReactNode } from "react";
import { BifrostFormApplicationStage } from "./BifrostFormApplicationStage";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { BifrostApiInterface } from "@/apis/bifrostApi/models";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
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
    suggestCalendarDateRangesFromConstraints: ({ descriptionOfPotentialCalendarDates, }: {
        descriptionOfPotentialCalendarDates: string;
    }) => Promise<CalendarDateRange[]>;
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
    updateItineraryOfferHotelRoomCount: ({ itineraryOfferId, hotelRoomOfferId, updatedCountOffered, }: {
        itineraryOfferId: string;
        hotelRoomOfferId: string;
        updatedCountOffered: number;
    }) => Promise<{
        updatedItineraryOfferId: string;
    }>;
    selectItineraryOffer: ({ itineraryOfferId, }: {
        itineraryOfferId: string;
    }) => Promise<void>;
}
