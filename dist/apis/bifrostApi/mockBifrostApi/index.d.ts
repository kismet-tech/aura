import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { BifrostApiInterface } from "../models";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
export declare class MockBifrostApi implements BifrostApiInterface {
    apiState: {
        itineraryOffers: RenderableItineraryOffer[];
    };
    constructor();
    createUserSessionFromBifrost({ bifrostFormQuestionsWithResponses, }: {
        bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    }): Promise<{
        userSessionId: string;
        nextQuestionWithResponse: BifrostFormQuestionWithResponse;
    }>;
    submitBifrostFormQuestionWithResponse({ bifrostFormQuestionWithResponse, }: {
        userSessionId: string;
        bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }): Promise<{
        nextQuestionWithResponse?: BifrostFormQuestionWithResponse;
        renderableItineraryOffers?: RenderableItineraryOffer[];
    }>;
    guestUpdateCustomRenderableItineraryOfferHotelRoomOfferCount({ userSessionId, itineraryOfferId, hotelRoomId, updatedCountOffered, }: {
        userSessionId: string;
        itineraryOfferId: string;
        hotelRoomId: string;
        updatedCountOffered: number;
    }): Promise<{
        itineraryOfferId: string;
        hotelRoomId: string;
        updatedCountOffered: number;
    }>;
}
