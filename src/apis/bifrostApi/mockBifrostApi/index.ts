import {
  BifrostFormQuestionWithResponse,
  ReservedBifrostFormQuestionIds,
  mockBifrostFormQuestionWithMultiStageSmartDateResponseEmpty,
} from "@kismet_ai/foundation";
import { BifrostApiInterface } from "../models";
import {
  mockBifrostFormQuestionWithSplitTextResponseThree,
  mockBifrostFormQuestionWithTextResponseFour,
  mockBifrostFormQuestionWithTextResponseTwo,
  mockBifrostToggleButtonGroupFormQuestionWithTextResponseThree,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import {
  mockRenderableItineraryOfferOne,
  mockRenderableItineraryOfferThree,
  mockRenderableItineraryOfferTwo,
} from "@/mockData/bifrost/mockRenderableItineraryOffers";
import { v4 as uuidv4 } from "uuid";
import { deepClone } from "@/utilities/core/deepClone";
import {
  GetOrCreateBifrostTravelerIdRequestDto,
  GetOrCreateBifrostTravelerIdSuccessResponseDataDto,
} from "../bifrostApi/core/getOrCreateBifrostTravelerId/GetOrCreateBifrostTravelerId.dto";
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
  SuggestCalendarDateRangesFromConstraintsRequestDto,
  SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto,
} from "../bifrostApi/helper/suggestCalendarDateRangesFromConstraints/SuggestCalendarDateRangesFromConstraints.dto";
import {
  SelectBifrostItineraryOfferRequestDto,
  SelectBifrostItineraryOfferSuccessResponseDataDto,
} from "../bifrostApi/core/selectBifrostItineraryOffer/SelectBifrostItineraryOffer.dto";
import {
  ItineraryOfferOriginatorType,
  RenderableItineraryHotelRoomOffer,
  RenderableItineraryOffer,
  mockBifrostFormQuestionWithMultiStageReasonForTravelResponse,
} from "@kismet_ai/foundation";

export class MockBifrostApi implements BifrostApiInterface {
  apiState = {
    itineraryOffers: [
      mockRenderableItineraryOfferOne,
      mockRenderableItineraryOfferTwo,
      mockRenderableItineraryOfferThree,
    ],
  };

  constructor() {}

  //////////////////////////////////////////////////
  // Initialize Session
  //////////////////////////////////////////////////
  async getOrCreateBifrostTravelerId(
    requestBody: GetOrCreateBifrostTravelerIdRequestDto
  ): Promise<GetOrCreateBifrostTravelerIdSuccessResponseDataDto> {
    return { bifrostTravelerId: "mockBifrostTravelerId-1" };
  }

  //////////////////////////////////////////////////
  // Answer Questions
  //////////////////////////////////////////////////

  async createUserSessionFromBifrost({
    hotelId,
    bifrostTravelerId,
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    additionalBifrostFormQuestionsWithResponses,
  }: CreateUserSessionFromBifrostRequestDto): Promise<CreateUserSessionFromBifrostSuccessResponseDataDto> {
    return {
      userSessionId: "mockUserSessionId-1",
      nextQuestionWithResponse: mockBifrostFormQuestionWithTextResponseTwo,
    };
  }

  async submitBifrostFormQuestionWithResponse({
    hotelId,
    userSessionId,
    bifrostFormQuestionsWithResponses,
  }: SubmitBifrostFormQuestionsWithResponsesRequestDto): Promise<SubmitBifrostFormQuestionsWithResponsesSuccessResponseDataDto> {
    let nextQuestionWithResponse: BifrostFormQuestionWithResponse | undefined;
    let renderableItineraryOffers: RenderableItineraryOffer[] | undefined;

    const bifrostFormQuestionWithResponse =
      bifrostFormQuestionsWithResponses[
        bifrostFormQuestionsWithResponses.length - 1
      ];

    console.log(
      `FINAL bifrostFormQuestionWithResponse: ${JSON.stringify(
        bifrostFormQuestionWithResponse,
        null,
        4
      )}`
    );

    if (
      bifrostFormQuestionWithResponse.bifrostFormQuestion
        .bifrostFormQuestionId ===
      ReservedBifrostFormQuestionIds.INQUIRY_DETAILS
    ) {
      nextQuestionWithResponse =
        mockBifrostFormQuestionWithMultiStageReasonForTravelResponse;
    } else if (
      bifrostFormQuestionWithResponse.bifrostFormQuestion
        .bifrostFormQuestionId ===
      ReservedBifrostFormQuestionIds.REASON_FOR_TRAVEL_WITH_DETAILS
    ) {
      nextQuestionWithResponse =
        mockBifrostFormQuestionWithMultiStageSmartDateResponseEmpty;
    } else if (
      [ReservedBifrostFormQuestionIds.CALENDAR_DATES].includes(
        bifrostFormQuestionWithResponse.bifrostFormQuestion
          .bifrostFormQuestionId as ReservedBifrostFormQuestionIds
      )
    ) {
      nextQuestionWithResponse =
        mockBifrostFormQuestionWithSplitTextResponseThree;
    } else if (
      bifrostFormQuestionWithResponse.bifrostFormQuestion
        .bifrostFormQuestionId ===
      mockBifrostFormQuestionWithSplitTextResponseThree.bifrostFormQuestion
        .bifrostFormQuestionId
    ) {
      nextQuestionWithResponse =
        mockBifrostToggleButtonGroupFormQuestionWithTextResponseThree;
      renderableItineraryOffers = this.apiState.itineraryOffers;
    }

    return {
      nextQuestionWithResponse,
      renderableItineraryOffers,
    };
  }

  //////////////////////////////////////////////////
  // Edit RenderableItineraryOffer
  //////////////////////////////////////////////////

  async guestUpdateCustomRenderableItineraryOfferHotelRoomOfferCount({
    userSessionId,
    itineraryOfferId,
    hotelRoomOfferId,
    updatedCountOffered,
  }: UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountRequestDto): Promise<UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto> {
    const existingItineraryOffer = this.apiState.itineraryOffers.find(
      (itineraryOffer) => {
        return itineraryOffer.itineraryOfferId === itineraryOfferId;
      }
    ) as RenderableItineraryOffer;

    if (
      existingItineraryOffer.originatorType ===
      ItineraryOfferOriginatorType.GUEST
    ) {
      this.apiState.itineraryOffers = this.apiState.itineraryOffers.map(
        (
          itineraryOffer: RenderableItineraryOffer
        ): RenderableItineraryOffer => {
          return {
            ...itineraryOffer,
            hotelRoomOffers: itineraryOffer.hotelRoomOffers.map(
              (
                hotelRoomOffer: RenderableItineraryHotelRoomOffer
              ): RenderableItineraryHotelRoomOffer => {
                if (
                  itineraryOffer.itineraryOfferId === itineraryOfferId &&
                  hotelRoomOffer.hotelRoomOfferId === hotelRoomOfferId
                ) {
                  return {
                    ...hotelRoomOffer,
                    countOffered: updatedCountOffered,
                  };
                } else {
                  return hotelRoomOffer;
                }
              }
            ),
          };
        }
      );

      return {
        itineraryOfferId,
        hotelRoomOfferId,
        updatedCountOffered,
      };
    } else if (
      existingItineraryOffer.originatorType ===
      ItineraryOfferOriginatorType.KISMET_AI
    ) {
      const customGuestItineraryOfferId: string = uuidv4();
      const customGuestItineraryOffer: RenderableItineraryOffer = {
        ...deepClone(existingItineraryOffer),
        itineraryOfferId: customGuestItineraryOfferId,
        itineraryOfferName: "Custom Itinerary",
        originatorType: ItineraryOfferOriginatorType.GUEST,
      };

      customGuestItineraryOffer.hotelRoomOffers =
        customGuestItineraryOffer.hotelRoomOffers.map(
          (
            hotelRoomOffer: RenderableItineraryHotelRoomOffer
          ): RenderableItineraryHotelRoomOffer => {
            if (hotelRoomOffer.hotelRoomOfferId === hotelRoomOfferId) {
              return {
                ...hotelRoomOffer,
                countOffered: updatedCountOffered,
              };
            } else {
              return hotelRoomOffer;
            }
          }
        );

      this.apiState.itineraryOffers.push(customGuestItineraryOffer);

      return {
        itineraryOfferId: customGuestItineraryOffer.itineraryOfferId,
        hotelRoomOfferId,
        updatedCountOffered,
      };
    } else {
      throw new Error("Unsupported itineraryOffer originatorType");
    }
  }

  async selectBifrostItineraryOffer({}: SelectBifrostItineraryOfferRequestDto): Promise<SelectBifrostItineraryOfferSuccessResponseDataDto> {
    return {};
  }

  //////////////////////////////////////////////////
  // Helpers
  //////////////////////////////////////////////////

  async suggestCalendarDateRangesFromConstraints({}: SuggestCalendarDateRangesFromConstraintsRequestDto): Promise<SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto> {
    return {
      calendarDateRanges: [
        {
          startCalendarDate: { year: 2025, month: 7, day: 5 },
          endCalendarDate: { year: 2025, month: 7, day: 7 },
        },
        {
          startCalendarDate: { year: 2025, month: 7, day: 4 },
          endCalendarDate: { year: 2025, month: 7, day: 7 },
        },
        {
          startCalendarDate: { year: 2025, month: 7, day: 4 },
          endCalendarDate: { year: 2025, month: 7, day: 8 },
        },
        {
          startCalendarDate: { year: 2025, month: 7, day: 5 },
          endCalendarDate: { year: 2025, month: 7, day: 8 },
        },
      ],
    };
  }
}
