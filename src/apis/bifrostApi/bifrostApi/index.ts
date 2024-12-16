import { BifrostApiInterface } from "../models";
import {
  CreateUserSessionFromBifrostRequestDto,
  CreateUserSessionFromBifrostSuccessResponseDataDto,
  CreateUserSessionFromBifrostSuccessResponseDto,
} from "./core/createUserSessionFromBifrost/CreateUserSessionFromBifrost.dto";
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
import { ErrorResponseDto } from "@kismet_ai/foundation";
import {
  GetBifrostFormItineraryOffersRequestDto,
  GetBifrostFormItineraryOffersSuccessResponseDataDto,
  GetBifrostFormItineraryOffersSuccessResponseDto,
} from "./core/getBifrostFormItineraryOffers/GetBifrostFormItineraryOffers.dto";

interface AxiosResponse<T> {
  data: T;
}

export class BifrostApi implements BifrostApiInterface {
  Api: any;

  constructor({ apiBaseUrl }: { apiBaseUrl: string }) {
    // const API_BASE_URL = "http://localhost:4000";
    // this.Api = axios.create({ baseURL: API_BASE_URL });

    this.Api = {
      post: async (urlPath: string, requestBody: any): Promise<any> => {
        console.log(
          `making api request requestBody | ${JSON.stringify(
            requestBody,
            null,
            4
          )} `
        );
        const response = await fetch(`${apiBaseUrl}/${urlPath}`, {
          method: "POST",
          body: JSON.stringify(requestBody),
        });

        const result = await response.json();

        return { data: result };
      },
    };
  }

  //////////////////////////////////////////////////
  // Initialize Session
  //////////////////////////////////////////////////
  async getOrCreateBifrostTravelerId(
    requestBody: GetOrCreateBifrostTravelerIdRequestDto
  ): Promise<GetOrCreateBifrostTravelerIdSuccessResponseDataDto> {
    const response: AxiosResponse<
      GetOrCreateBifrostTravelerIdSuccessResponseDto | ErrorResponseDto<string>
    > = await this.Api.post(
      `Bifrost/GetOrCreateBifrostTravelerId`,
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
      CreateUserSessionFromBifrostSuccessResponseDto | ErrorResponseDto<string>
    > = await this.Api.post(
      `Bifrost/CreateUserSessionFromBifrost`,
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
    console.log();

    const response: AxiosResponse<
      | SubmitBifrostFormQuestionsWithResponsesSuccessResponseDto
      | ErrorResponseDto<string>
    > = await this.Api.post(
      `Bifrost/SubmitBifrostFormQuestionsWithResponses`,
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

  async getBifrostFormItineraryOffers(
    requestBody: GetBifrostFormItineraryOffersRequestDto
  ): Promise<GetBifrostFormItineraryOffersSuccessResponseDataDto> {
    const response: AxiosResponse<
      GetBifrostFormItineraryOffersSuccessResponseDto | ErrorResponseDto<string>
    > = await this.Api.post(
      `Bifrost/GetBifrostFormItineraryOffers`,
      requestBody,
      {}
    );

    if ("error" in response.data) {
      console.error(response.data.error.reason);
    }

    const successResponseValue = (
      response.data as GetBifrostFormItineraryOffersSuccessResponseDto
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
      | ErrorResponseDto<string>
    > = await this.Api.post(
      `Bifrost/UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCount`,
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
      SelectBifrostItineraryOfferSuccessResponseDto | ErrorResponseDto<string>
    > = await this.Api.post(
      `Bifrost/SelectBifrostItineraryOffer`,
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
      | ErrorResponseDto<string>
    > = await this.Api.post(
      `Bifrost/SuggestCalendarDateRangesFromConstraints`,
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
