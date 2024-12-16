import { BifrostApiInterface } from "../models";
import { CreateUserSessionFromBifrostRequestDto, CreateUserSessionFromBifrostSuccessResponseDataDto } from "./core/createUserSessionFromBifrost/CreateUserSessionFromBifrost.dto";
import { SubmitBifrostFormQuestionsWithResponsesRequestDto, SubmitBifrostFormQuestionsWithResponsesSuccessResponseDataDto } from "./core/submitBifrostFormQuestionWithResponse/SubmitBifrostFormQuestionsWithResponses.dto";
import { UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountRequestDto, UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto } from "./core/updateGuestCustomRenderableItineraryOfferHotelRoomOfferCount/UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCount.dto";
import { GetOrCreateBifrostTravelerIdRequestDto, GetOrCreateBifrostTravelerIdSuccessResponseDataDto } from "./core/getOrCreateBifrostTravelerId/GetOrCreateBifrostTravelerId.dto";
import { SuggestCalendarDateRangesFromConstraintsRequestDto, SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto } from "./helper/suggestCalendarDateRangesFromConstraints/SuggestCalendarDateRangesFromConstraints.dto";
import { SelectBifrostItineraryOfferRequestDto, SelectBifrostItineraryOfferSuccessResponseDataDto } from "./core/selectBifrostItineraryOffer/SelectBifrostItineraryOffer.dto";
import { GetBifrostFormItineraryOffersRequestDto, GetBifrostFormItineraryOffersSuccessResponseDataDto } from "./core/getBifrostFormItineraryOffers/GetBifrostFormItineraryOffers.dto";
export declare class BifrostApi implements BifrostApiInterface {
    Api: any;
    constructor({ apiBaseUrl }: {
        apiBaseUrl: string;
    });
    getOrCreateBifrostTravelerId(requestBody: GetOrCreateBifrostTravelerIdRequestDto): Promise<GetOrCreateBifrostTravelerIdSuccessResponseDataDto>;
    createUserSessionFromBifrost(requestBody: CreateUserSessionFromBifrostRequestDto): Promise<CreateUserSessionFromBifrostSuccessResponseDataDto>;
    submitBifrostFormQuestionWithResponse(requestBody: SubmitBifrostFormQuestionsWithResponsesRequestDto): Promise<SubmitBifrostFormQuestionsWithResponsesSuccessResponseDataDto>;
    getBifrostFormItineraryOffers(requestBody: GetBifrostFormItineraryOffersRequestDto): Promise<GetBifrostFormItineraryOffersSuccessResponseDataDto>;
    guestUpdateCustomRenderableItineraryOfferHotelRoomOfferCount(requestBody: UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountRequestDto): Promise<UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto>;
    selectBifrostItineraryOffer(requestBody: SelectBifrostItineraryOfferRequestDto): Promise<SelectBifrostItineraryOfferSuccessResponseDataDto>;
    suggestCalendarDateRangesFromConstraints(requestBody: SuggestCalendarDateRangesFromConstraintsRequestDto): Promise<SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto>;
}
