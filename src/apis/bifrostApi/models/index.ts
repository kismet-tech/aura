import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
import {
  CreateUserSessionFromBifrostRequestDto,
  CreateUserSessionFromBifrostSuccessResponseDataDto,
} from "../bifrostApi/core/createUserSessionFromBifrost/CreateUserSessionFromBifrost.dto";
import {
  SubmitBifrostFormQuestionsWithResponsesRequestDto,
  SubmitBifrostFormQuestionsWithResponsesSuccessResponseDataDto,
} from "../bifrostApi/core/submitBifrostFormQuestionWithResponse/SubmitBifrostFormQuestionsWithResponses.dto";
import {
  UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountRequestDto,
  UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto,
} from "../bifrostApi/core/updateGuestCustomRenderableItineraryOfferHotelRoomOfferCount/UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCount.dto";
import {
  GetOrCreateBifrostTravelerIdRequestDto,
  GetOrCreateBifrostTravelerIdSuccessResponseDataDto,
} from "../bifrostApi/core/getOrCreateBifrostTravelerId/GetOrCreateBifrostTravelerId.dto";
import {
  SuggestCalendarDateRangesFromConstraintsRequestDto,
  SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto,
} from "../bifrostApi/helper/suggestCalendarDateRangesFromConstraints/SuggestCalendarDateRangesFromConstraints.dto";
import {
  SelectBifrostItineraryOfferRequestDto,
  SelectBifrostItineraryOfferSuccessResponseDataDto,
} from "../bifrostApi/core/selectBifrostItineraryOffer/SelectBifrostItineraryOffer.dto";
import {
  GetBifrostFormItineraryOffersRequestDto,
  GetBifrostFormItineraryOffersSuccessResponseDataDto,
} from "../bifrostApi/core/getBifrostFormItineraryOffers/GetBifrostFormItineraryOffers.dto";
import { UpdateGroupReservationRequestDto, UpdateGroupReservationSuccessResponseDataDto } from "./UpdateGroupReservation.dto";

export interface BifrostApiInterface {
  //////////////////////////////////////////////////
  // Initialize Session
  //////////////////////////////////////////////////
  getOrCreateBifrostTravelerId: (
    requestBody: GetOrCreateBifrostTravelerIdRequestDto
  ) => Promise<GetOrCreateBifrostTravelerIdSuccessResponseDataDto>;

  //////////////////////////////////////////////////
  // Answer Questions
  //////////////////////////////////////////////////

  createUserSessionFromBifrost: (
    requestBody: CreateUserSessionFromBifrostRequestDto
  ) => Promise<CreateUserSessionFromBifrostSuccessResponseDataDto>;

  submitBifrostFormQuestionWithResponse: (
    requestBody: SubmitBifrostFormQuestionsWithResponsesRequestDto
  ) => Promise<SubmitBifrostFormQuestionsWithResponsesSuccessResponseDataDto>;

  getBifrostFormItineraryOffers: (
    requestBody: GetBifrostFormItineraryOffersRequestDto
  ) => Promise<GetBifrostFormItineraryOffersSuccessResponseDataDto>;

  //////////////////////////////////////////////////
  // Edit RenderableItineraryOffer
  //////////////////////////////////////////////////

  guestUpdateCustomRenderableItineraryOfferHotelRoomOfferCount: (
    requestBody: UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountRequestDto
  ) => Promise<UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto>;

  selectBifrostItineraryOffer: (
    requestBody: SelectBifrostItineraryOfferRequestDto
  ) => Promise<SelectBifrostItineraryOfferSuccessResponseDataDto>;

  //////////////////////////////////////////////////
  // Group Reservation
  //////////////////////////////////////////////////

  updateGroupReservation: (
    requestBody: UpdateGroupReservationRequestDto
  ) => Promise<UpdateGroupReservationSuccessResponseDataDto>;

  //////////////////////////////////////////////////
  // Helpers
  //////////////////////////////////////////////////
  suggestCalendarDateRangesFromConstraints: (
    requestBody: SuggestCalendarDateRangesFromConstraintsRequestDto
  ) => Promise<SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto>;
}
