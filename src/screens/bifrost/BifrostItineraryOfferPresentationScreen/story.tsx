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
import {
  BifrostFormQuestionWithResponse,
  mockHotelBifrostFormMetadata,
} from "@kismet_ai/foundation";
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
import { RenderableItineraryOffer } from "@kismet_ai/foundation";

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
    bifrostFormMetadata: mockHotelBifrostFormMetadata,
    onClickUpdateItineraryOfferHotelRoomCount: async ({
      itineraryOfferId,
      updatedCountOffered,
      hotelRoomOfferId,
    }: {
      itineraryOfferId: string;
      updatedCountOffered: number;
      hotelRoomOfferId: string;
    }): Promise<{ updatedItineraryOfferId: string }> => {
      return updateItineraryOfferHotelRoomCount({
        itineraryOfferId,
        updatedCountOffered,
        hotelRoomOfferId,
      });
    },
    onClickSelectItineraryOfferAndGoToPaymentsPage: async ({
      itineraryOfferId,
    }: {
      itineraryOfferId: string;
    }) => {
      console.log(`Clicked go to payments page for ${itineraryOfferId}`);
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
