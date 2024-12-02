import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { BifrostApiInterface } from "../models";
import {
  mockBifrostFormQuestionWithCalendarDateRangeResponseOne,
  mockBifrostFormQuestionWithMultiCalendarDateRangeResponseOne,
  mockBifrostFormQuestionWithSplitTextResponseThree,
  mockBifrostFormQuestionWithTextResponseFour,
  mockBifrostFormQuestionWithTextResponseTwo,
  mockBifrostTextInputFormQuestionWithTextResponseOne,
  mockBifrostToggleButtonGroupFormQuestionWithTextResponseThree,
  mockBifrostToggleButtonGroupFormQuestionWithTextResponseTwo,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import {
  ItineraryOfferOriginatorType,
  RenderableItineraryHotelRoomOffer,
  RenderableItineraryOffer,
} from "@/models/bifrost/RenderableItineraryOffer";
import { ReservedBifrostFormQuestionIds } from "@/models/bifrost/BifrostFormQuestions/ReservedBifrostFormQuestionIds";
import { ReservedBifrostDateFlexibilityOptionValues } from "@/models/bifrost/BifrostFormQuestions/ReservedBifrostFormQuestionValues";
import {
  mockRenderableItineraryOfferOne,
  mockRenderableItineraryOfferThree,
  mockRenderableItineraryOfferTwo,
} from "@/mockData/bifrost/mockRenderableItineraryOffers";
import { v4 as uuidv4 } from "uuid";
import { deepClone } from "@/utilities/core/deepClone";

export class MockBifrostApi implements BifrostApiInterface {
  apiState = {
    itineraryOffers: [
      mockRenderableItineraryOfferOne,
      mockRenderableItineraryOfferTwo,
      mockRenderableItineraryOfferThree,
    ],
  };

  constructor() {}

  async createUserSessionFromBifrost({
    bifrostFormQuestionsWithResponses,
  }: {
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  }): Promise<{
    userSessionId: string;
    nextQuestionWithResponse: BifrostFormQuestionWithResponse;
  }> {
    return {
      userSessionId: "mockUserSessionId-1",
      nextQuestionWithResponse: mockBifrostFormQuestionWithTextResponseTwo,
    };
  }

  async submitBifrostFormQuestionWithResponse({
    bifrostFormQuestionWithResponse,
  }: {
    userSessionId: string;
    bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  }): Promise<{
    nextQuestionWithResponse?: BifrostFormQuestionWithResponse;
    renderableItineraryOffers?: RenderableItineraryOffer[];
  }> {
    let nextQuestionWithResponse: BifrostFormQuestionWithResponse | undefined;
    let renderableItineraryOffers: RenderableItineraryOffer[] | undefined;

    if (
      bifrostFormQuestionWithResponse.bifrostFormQuestion
        .bifrostFormQuestionId ===
      ReservedBifrostFormQuestionIds.INQUIRY_DETAILS
    ) {
      nextQuestionWithResponse = mockBifrostFormQuestionWithTextResponseFour;
    } else if (
      bifrostFormQuestionWithResponse.bifrostFormQuestion
        .bifrostFormQuestionId ===
      ReservedBifrostFormQuestionIds.REASON_FOR_TRAVEL
    ) {
      nextQuestionWithResponse =
        mockBifrostToggleButtonGroupFormQuestionWithTextResponseTwo;
    } else if (
      bifrostFormQuestionWithResponse.bifrostFormQuestion
        .bifrostFormQuestionId ===
      ReservedBifrostFormQuestionIds.ARE_ITINERARY_DATES_FLEXIBLE
    ) {
      if (
        bifrostFormQuestionWithResponse.responseData.responseValue ===
        ReservedBifrostDateFlexibilityOptionValues.FIRM_DATES
      ) {
        nextQuestionWithResponse =
          mockBifrostFormQuestionWithCalendarDateRangeResponseOne;
      } else if (
        bifrostFormQuestionWithResponse.responseData.responseValue ===
        ReservedBifrostDateFlexibilityOptionValues.FLEXIBLE_DATES
      ) {
        nextQuestionWithResponse =
          mockBifrostFormQuestionWithMultiCalendarDateRangeResponseOne;
      } else if (
        bifrostFormQuestionWithResponse.responseData.responseValue ===
        ReservedBifrostDateFlexibilityOptionValues.STILL_DECIDING
      ) {
        nextQuestionWithResponse =
          mockBifrostTextInputFormQuestionWithTextResponseOne;
      }
    } else if (
      [
        mockBifrostFormQuestionWithCalendarDateRangeResponseOne
          .bifrostFormQuestion.bifrostFormQuestionId,
        mockBifrostFormQuestionWithMultiCalendarDateRangeResponseOne
          .bifrostFormQuestion.bifrostFormQuestionId,
        mockBifrostTextInputFormQuestionWithTextResponseOne.bifrostFormQuestion
          .bifrostFormQuestionId,
      ].includes(
        bifrostFormQuestionWithResponse.bifrostFormQuestion
          .bifrostFormQuestionId
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

  async guestUpdateCustomRenderableItineraryOfferHotelRoomOfferCount({
    userSessionId,
    itineraryOfferId,
    hotelRoomId,
    updatedCountOffered,
  }: {
    userSessionId: string;
    itineraryOfferId: string;
    hotelRoomId: string;
    updatedCountOffered: number;
  }): Promise<{
    itineraryOfferId: string;
    hotelRoomId: string;
    updatedCountOffered: number;
  }> {
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
                  hotelRoomOffer.hotelRoomId === hotelRoomId
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
        hotelRoomId,
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
            if (hotelRoomOffer.hotelRoomId === hotelRoomId) {
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
        hotelRoomId,
        updatedCountOffered,
      };
    } else {
      throw new Error("Unsupported itineraryOffer originatorType");
    }
  }
}
