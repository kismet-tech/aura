import { BifrostApiInterface } from "../models";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import {
  CreateUserSessionFromBifrostRequestDto,
  CreateUserSessionFromBifrostSuccessResponseDataDto,
  CreateUserSessionFromBifrostSuccessResponseDto,
} from "./core/createUserSessionFromBifrost/CreateUserSessionFromBifrost.dto";
import { ErrorResponseDto } from "@/models/core/monads/monads.dto";
import {
  SubmitBifrostFormQuestionsWithResponsesRequestDto,
  SubmitBifrostFormQuestionsWithResponsesSuccessResponseDataDto,
  SubmitBifrostFormQuestionsWithResponsesSuccessResponseDto,
} from "./core/submitBifrostFormQuestionWithResponse/SubmitBifrostFormQuestionsWithResponses.dto";
import {
  UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountRequestDto,
  UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto,
  UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDto,
} from "./core/updateGuestCustomRenderableItineraryOfferHotelRoomOfferCount/UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCount.dto";
import {
  GetOrCreateBifrostTravelerIdRequestDto,
  GetOrCreateBifrostTravelerIdSuccessResponseDataDto,
  GetOrCreateBifrostTravelerIdSuccessResponseDto,
} from "./core/getOrCreateBifrostTravelerId/GetOrCreateBifrostTravelerId.dto";
import {
  SuggestCalendarDateRangesFromConstraintsRequestDto,
  SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto,
  SuggestCalendarDateRangesFromConstraintsSuccessResponseDto,
} from "./helper/suggestCalendarDateRangesFromConstraints/SuggestCalendarDateRangesFromConstraints.dto";
import {
  SelectBifrostItineraryOfferRequestDto,
  SelectBifrostItineraryOfferSuccessResponseDataDto,
  SelectBifrostItineraryOfferSuccessResponseDto,
} from "./core/selectBifrostItineraryOffer/SelectBifrostItineraryOffer.dto";

export class BifrostApi implements BifrostApiInterface {
  Api: AxiosInstance;

  constructor() {
    const API_BASE_URL = "http://localhost:4000";
    this.Api = axios.create({ baseURL: API_BASE_URL });
    axiosRetry(this.Api, { retries: 3 });
  }

  //////////////////////////////////////////////////
  // Initialize Session
  //////////////////////////////////////////////////
  async getOrCreateBifrostTravelerId(
    requestBody: GetOrCreateBifrostTravelerIdRequestDto
  ): Promise<GetOrCreateBifrostTravelerIdSuccessResponseDataDto> {
    const response: AxiosResponse<
      GetOrCreateBifrostTravelerIdSuccessResponseDto | ErrorResponseDto
    > = await this.Api.post(
      `/Bifrost/GetOrCreateBifrostTravelerId`,
      requestBody,
      {}
    );

    if ("error" in response.data) {
      console.error(response.data.error.reason);
    }

    const successResponseValue = (
      response.data as GetOrCreateBifrostTravelerIdSuccessResponseDto
    ).success;

    return successResponseValue;
  }

  //////////////////////////////////////////////////
  // Answer Questions
  //////////////////////////////////////////////////

  async createUserSessionFromBifrost(
    requestBody: CreateUserSessionFromBifrostRequestDto
  ): Promise<CreateUserSessionFromBifrostSuccessResponseDataDto> {
    const response: AxiosResponse<
      CreateUserSessionFromBifrostSuccessResponseDto | ErrorResponseDto
    > = await this.Api.post(
      `/Bifrost/CreateUserSessionFromBifrost`,
      requestBody,
      {}
    );

    if ("error" in response.data) {
      console.error(response.data.error.reason);
    }

    const successResponseValue = (
      response.data as CreateUserSessionFromBifrostSuccessResponseDto
    ).success;

    return successResponseValue;
  }

  async submitBifrostFormQuestionWithResponse(
    requestBody: SubmitBifrostFormQuestionsWithResponsesRequestDto
  ): Promise<SubmitBifrostFormQuestionsWithResponsesSuccessResponseDataDto> {
    const response: AxiosResponse<
      | SubmitBifrostFormQuestionsWithResponsesSuccessResponseDto
      | ErrorResponseDto
    > = await this.Api.post(
      `/Bifrost/SubmitBifrostFormQuestionsWithResponses`,
      requestBody,
      {}
    );

    if ("error" in response.data) {
      console.error(response.data.error.reason);
    }

    const successResponseValue = (
      response.data as SubmitBifrostFormQuestionsWithResponsesSuccessResponseDto
    ).success;

    return successResponseValue;
  }

  //////////////////////////////////////////////////
  // Edit RenderableItineraryOffer
  //////////////////////////////////////////////////

  async guestUpdateCustomRenderableItineraryOfferHotelRoomOfferCount(
    requestBody: UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountRequestDto
  ): Promise<UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto> {
    const response: AxiosResponse<
      | UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDto
      | ErrorResponseDto
    > = await this.Api.post(
      `/Bifrost/UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCount`,
      requestBody,
      {}
    );

    if ("error" in response.data) {
      console.error(response.data.error.reason);
    }

    const successResponseValue = (
      response.data as UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDto
    ).success;

    return successResponseValue;
  }

  async selectBifrostItineraryOffer(
    requestBody: SelectBifrostItineraryOfferRequestDto
  ): Promise<SelectBifrostItineraryOfferSuccessResponseDataDto> {
    const response: AxiosResponse<
      SelectBifrostItineraryOfferSuccessResponseDto | ErrorResponseDto
    > = await this.Api.post(
      `/Bifrost/SelectBifrostItineraryOffer`,
      requestBody,
      {}
    );

    if ("error" in response.data) {
      console.error(response.data.error.reason);
    }

    const successResponseValue = (
      response.data as UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDto
    ).success;

    return successResponseValue;
  }

  //////////////////////////////////////////////////
  // Helpers
  //////////////////////////////////////////////////
  async suggestCalendarDateRangesFromConstraints(
    requestBody: SuggestCalendarDateRangesFromConstraintsRequestDto
  ): Promise<SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto> {
    const response: AxiosResponse<
      | SuggestCalendarDateRangesFromConstraintsSuccessResponseDto
      | ErrorResponseDto
    > = await this.Api.post(
      `/Bifrost/SuggestCalendarDateRangesFromConstraints`,
      requestBody,
      {}
    );

    if ("error" in response.data) {
      console.error(response.data.error.reason);
    }

    const successResponseValue = (
      response.data as SuggestCalendarDateRangesFromConstraintsSuccessResponseDto
    ).success;

    return successResponseValue;
  }
}
