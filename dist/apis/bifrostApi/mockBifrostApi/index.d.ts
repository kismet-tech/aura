import { BifrostApiInterface } from "../models";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
import { GetOrCreateBifrostTravelerIdRequestDto, GetOrCreateBifrostTravelerIdSuccessResponseDataDto } from "../bifrostApi/core/getOrCreateBifrostTravelerId/GetOrCreateBifrostTravelerId.dto";
import { CreateUserSessionFromBifrostRequestDto, CreateUserSessionFromBifrostSuccessResponseDataDto } from "../bifrostApi/core/createUserSessionFromBifrost/CreateUserSessionFromBifrost.dto";
import { SubmitBifrostFormQuestionsWithResponsesRequestDto, SubmitBifrostFormQuestionsWithResponsesSuccessResponseDataDto } from "../bifrostApi/core/submitBifrostFormQuestionWithResponse/SubmitBifrostFormQuestionsWithResponses.dto";
import { UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountRequestDto, UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto } from "../bifrostApi/core/updateGuestCustomRenderableItineraryOfferHotelRoomOfferCount/UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCount.dto";
import { SuggestCalendarDateRangesFromConstraintsRequestDto, SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto } from "../bifrostApi/helper/suggestCalendarDateRangesFromConstraints/SuggestCalendarDateRangesFromConstraints.dto";
export declare class MockBifrostApi implements BifrostApiInterface {
    apiState: {
        itineraryOffers: RenderableItineraryOffer[];
    };
    constructor();
    getOrCreateBifrostTravelerId(requestBody: GetOrCreateBifrostTravelerIdRequestDto): Promise<GetOrCreateBifrostTravelerIdSuccessResponseDataDto>;
    createUserSessionFromBifrost({ hotelId, bifrostTravelerId, firstName, lastName, emailAddress, phoneNumber, additionalBifrostFormQuestionsWithResponses, }: CreateUserSessionFromBifrostRequestDto): Promise<CreateUserSessionFromBifrostSuccessResponseDataDto>;
    submitBifrostFormQuestionWithResponse({ hotelId, userSessionId, bifrostFormQuestionsWithResponses, }: SubmitBifrostFormQuestionsWithResponsesRequestDto): Promise<SubmitBifrostFormQuestionsWithResponsesSuccessResponseDataDto>;
    guestUpdateCustomRenderableItineraryOfferHotelRoomOfferCount({ userSessionId, itineraryOfferId, hotelRoomId, updatedCountOffered, }: UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountRequestDto): Promise<UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto>;
    suggestCalendarDateRangesFromConstraints({}: SuggestCalendarDateRangesFromConstraintsRequestDto): Promise<SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto>;
}
