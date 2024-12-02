import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  BifrostItineraryOfferPresentationScreen,
  BifrostItineraryOfferPresentationScreenProps,
} from ".";
import {
  mockBifrostFormQuestionWithSplitTextResponseTwo,
  mockBifrostFormQuestionWithEmailResponseTwo,
  mockBifrostFormQuestionWithPhoneNumberResponseTwo,
  mockBifrostFormQuestionWithTextResponseTwo,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { MockBifrostApi } from "@/apis/bifrostApi/mockBifrostApi";
import { AppViewport } from "@/components/atoms/AppViewport";
import { BifrostFormStateProvider } from "@/providers/BifrostFormStateProvider";
import { MockBifrostFormStateProvider } from "@/providers/MockBifrostFormStateProvider";
import {
  mockRenderableItineraryOfferOne,
  mockRenderableItineraryOfferTwo,
  mockRenderableItineraryOfferThree,
} from "@/mockData/bifrost/mockRenderableItineraryOffers";
import { useBifrostFormState } from "@/providers/BifrostFormStateProvider/useBifrostFormState";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";

const meta: Meta<typeof BifrostItineraryOfferPresentationScreen> = {
  title: "BifrostForm/Screens/BifrostItineraryOfferPresentationScreen",
  component: BifrostItineraryOfferPresentationScreen,
};
export default meta;

type Story = StoryObj<typeof BifrostItineraryOfferPresentationScreen>;

const StoryWrapper = () => {
  const {
    updateItineraryOfferHotelRoomCount,
    renderableItineraryOffersFromKismetAI,
    customRenderableItineraryOfferFromGuest,
    renderablePendingItinerary,
  } = useBifrostFormState();

  const renderableItineraryOffers: RenderableItineraryOffer[] = [];
  if (renderableItineraryOffersFromKismetAI) {
    renderableItineraryOffers.push(...renderableItineraryOffersFromKismetAI);
  }
  if (customRenderableItineraryOfferFromGuest) {
    renderableItineraryOffers.push(customRenderableItineraryOfferFromGuest);
  }

  const dynamicArgs: BifrostItineraryOfferPresentationScreenProps = {
    renderableItineraryOffers,
    renderablePendingItinerary,
    paymentsPageUrl: "https://www.checkout.com",
    onClickUpdateItineraryOfferHotelRoomCount: async ({
      itineraryOfferId,
      updatedCountOffered,
      hotelRoomId,
    }: {
      itineraryOfferId: string;
      updatedCountOffered: number;
      hotelRoomId: string;
    }): Promise<{ updatedItineraryOfferId: string }> => {
      return updateItineraryOfferHotelRoomCount({
        itineraryOfferId,
        updatedCountOffered,
        hotelRoomId,
      });
    },
  };

  return <BifrostItineraryOfferPresentationScreen {...dynamicArgs} />;
};

export const Example: Story = {
  render: () => {
    const historicalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[] =
      [
        mockBifrostFormQuestionWithSplitTextResponseTwo,
        mockBifrostFormQuestionWithEmailResponseTwo,
        mockBifrostFormQuestionWithPhoneNumberResponseTwo,
      ];

    const activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[] =
      [mockBifrostFormQuestionWithTextResponseTwo];

    return (
      <AppViewport>
        <BifrostFormStateProvider bifrostApi={new MockBifrostApi()}>
          <MockBifrostFormStateProvider
            mockBifrostFormQuestionsWithResponses={[
              ...historicalBifrostFormQuestionsWithResponses,
              ...activeBifrostFormQuestionsWithResponses,
            ]}
            mockActiveBifrostFormQuestionsWithResponses={
              activeBifrostFormQuestionsWithResponses
            }
            mockRenderableItineraryOffersFromKismetAI={[
              mockRenderableItineraryOfferOne,
              mockRenderableItineraryOfferTwo,
              mockRenderableItineraryOfferThree,
            ]}
            createUserSession={true}
          >
            <StoryWrapper />
          </MockBifrostFormStateProvider>
        </BifrostFormStateProvider>
      </AppViewport>
    );
  },
  args: {},
};
