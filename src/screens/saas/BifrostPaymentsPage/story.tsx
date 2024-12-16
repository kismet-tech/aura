import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { BifrostGroupBookingCheckoutRootPage } from ".";
import { RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";
import {
  BifrostGroupBookingCheckoutCart,
  BifrostGroupBookingCheckoutSessionSummary,
} from "@/providers/saas/BifrostGroupBookingCheckoutStateProvider/models";
import {
  mockRenderableItineraryHotelRoomOfferFive,
  mockRenderableItineraryHotelRoomOfferFour,
  mockRenderableItineraryHotelRoomOfferOne,
  mockRenderableItineraryHotelRoomOfferSix,
  mockRenderableItineraryHotelRoomOfferThree,
  mockRenderableItineraryHotelRoomOfferTwo,
} from "@/mockData/bifrost/mockRenderableItineraryOffers";
import { AuthenticatedGuestUser } from "@/models/guests/AuthenticatedGuestUser";
import { useReactStateCache } from "@/utilities/core/react/useReactStateCache";

const meta: Meta<typeof BifrostGroupBookingCheckoutRootPage> = {
  title: "Applications/BifrostGroupBookingCheckoutRootPage",
  component: BifrostGroupBookingCheckoutRootPage,
};
export default meta;

type Story = StoryObj<typeof BifrostGroupBookingCheckoutRootPage>;

const StoryWrapper = () => {
  const initialCart: BifrostGroupBookingCheckoutCart = {
    hotelRooms: [],
  };

  const checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary = {
    hotelName: "Knollcroft",
    groupBookingCheckoutSessionHeroImageUrl:
      "https://www.benziger.com/wp-content/uploads/2024/04/Benziger2023HARVESTPARTYbyAlexanderRubin_0104-scaled.jpg",
    groupBookingCheckoutSessionTitle: "Rachel & Jack’s Wedding",
    groupBookingCheckoutSessionCalendarDateRange: {
      startCalendarDate: {
        day: 2,
        month: 1,
        year: 2025,
      },
      endCalendarDate: {
        day: 4,
        month: 1,
        year: 2025,
      },
    },
  };

  const mockRenderableItineraryHotelRoomOffers: RenderableItineraryHotelRoomOffer[] =
    [
      mockRenderableItineraryHotelRoomOfferOne,
      mockRenderableItineraryHotelRoomOfferTwo,
      mockRenderableItineraryHotelRoomOfferThree,
      mockRenderableItineraryHotelRoomOfferFour,
      mockRenderableItineraryHotelRoomOfferFive,
      mockRenderableItineraryHotelRoomOfferSix,
    ];

  const initialAvailableHotelRooms: RenderableItineraryHotelRoomOffer[] =
    mockRenderableItineraryHotelRoomOffers.map(
      (offer: RenderableItineraryHotelRoomOffer) => {
        return {
          ...offer,
          countOffered: 0,
          countAvailable: offer.countOffered,
        };
      }
    );

  const [hotelRoomOffers, setHotelRoomOffers] = useState<
    RenderableItineraryHotelRoomOffer[]
  >(initialAvailableHotelRooms);

  const [cart, setCart] =
    useState<BifrostGroupBookingCheckoutCart>(initialCart);

  const [authenticatedGuestUser, setAuthenticatedGuestUser] = useState<
    AuthenticatedGuestUser | undefined
  >(undefined);

  return (
    <BifrostGroupBookingCheckoutRootPage
      onClickLogin={() => {
        setAuthenticatedGuestUser({
          firstName: "Julian",
          lastName: "Trajanson",
          userId: "trajanson",
        });
      }}
      authenticatedGuestUser={authenticatedGuestUser}
      checkoutSessionSummary={checkoutSessionSummary}
      cart={cart}
      availableHotelRooms={hotelRoomOffers}
      onClickUpdateHotelRoomCountInCart={({
        updatedCountOffered,
        hotelRoomOfferId,
      }: {
        updatedCountOffered: number;
        hotelRoomOfferId: string;
      }) => {
        setHotelRoomOffers(
          (previousHotelRoomOffers: RenderableItineraryHotelRoomOffer[]) => {
            const updatedHotelRoomOffers = previousHotelRoomOffers.map(
              (previousHotelRoomOffer: RenderableItineraryHotelRoomOffer) => {
                if (
                  previousHotelRoomOffer.hotelRoomOfferId === hotelRoomOfferId
                ) {
                  return {
                    ...previousHotelRoomOffer,
                    countOffered: updatedCountOffered,
                  };
                }
                return previousHotelRoomOffer;
              }
            );

            setCart((previousCart: BifrostGroupBookingCheckoutCart) => {
              const updatedCart = {
                ...previousCart,
                hotelRooms: updatedHotelRoomOffers.filter(
                  (offer: RenderableItineraryHotelRoomOffer) =>
                    offer.countOffered > 0
                ),
              };

              return useReactStateCache({
                updatedValue: updatedCart,
                previousValue: previousCart,
              });
            });

            return useReactStateCache({
              updatedValue: updatedHotelRoomOffers,
              previousValue: previousHotelRoomOffers,
            });
          }
        );
      }}
      onClickCheckout={() => {
        console.log("Checkout clicked");
      }}
    />
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

const LoadingStoryWrapper = () => {
  const initialCart: BifrostGroupBookingCheckoutCart = {
    hotelRooms: [],
  };

  const checkoutSessionSummary = undefined;

  const mockRenderableItineraryHotelRoomOffers: RenderableItineraryHotelRoomOffer[] =
    [
      mockRenderableItineraryHotelRoomOfferOne,
      mockRenderableItineraryHotelRoomOfferTwo,
      mockRenderableItineraryHotelRoomOfferThree,
      mockRenderableItineraryHotelRoomOfferFour,
      mockRenderableItineraryHotelRoomOfferFive,
      mockRenderableItineraryHotelRoomOfferSix,
    ];

  const initialAvailableHotelRooms: RenderableItineraryHotelRoomOffer[] =
    mockRenderableItineraryHotelRoomOffers.map(
      (offer: RenderableItineraryHotelRoomOffer) => {
        return {
          ...offer,
          countOffered: 0,
          countAvailable: offer.countOffered,
        };
      }
    );

  const [hotelRoomOffers, setHotelRoomOffers] = useState<
    RenderableItineraryHotelRoomOffer[]
  >(initialAvailableHotelRooms);

  const [cart, setCart] =
    useState<BifrostGroupBookingCheckoutCart>(initialCart);

  const [authenticatedGuestUser, setAuthenticatedGuestUser] = useState<
    AuthenticatedGuestUser | undefined
  >(undefined);

  return (
    <BifrostGroupBookingCheckoutRootPage
      onClickLogin={() => {
        setAuthenticatedGuestUser({
          firstName: "Julian",
          lastName: "Trajanson",
          userId: "trajanson",
        });
      }}
      authenticatedGuestUser={authenticatedGuestUser}
      checkoutSessionSummary={checkoutSessionSummary}
      cart={cart}
      availableHotelRooms={hotelRoomOffers}
      onClickUpdateHotelRoomCountInCart={({
        updatedCountOffered,
        hotelRoomOfferId,
      }: {
        updatedCountOffered: number;
        hotelRoomOfferId: string;
      }) => {
        setHotelRoomOffers(
          (previousHotelRoomOffers: RenderableItineraryHotelRoomOffer[]) => {
            const updatedHotelRoomOffers = previousHotelRoomOffers.map(
              (previousHotelRoomOffer: RenderableItineraryHotelRoomOffer) => {
                if (
                  previousHotelRoomOffer.hotelRoomOfferId === hotelRoomOfferId
                ) {
                  return {
                    ...previousHotelRoomOffer,
                    countOffered: updatedCountOffered,
                  };
                }
                return previousHotelRoomOffer;
              }
            );

            setCart((previousCart: BifrostGroupBookingCheckoutCart) => {
              const updatedCart = {
                ...previousCart,
                hotelRooms: updatedHotelRoomOffers.filter(
                  (offer: RenderableItineraryHotelRoomOffer) =>
                    offer.countOffered > 0
                ),
              };

              return useReactStateCache({
                updatedValue: updatedCart,
                previousValue: previousCart,
              });
            });

            return useReactStateCache({
              updatedValue: updatedHotelRoomOffers,
              previousValue: previousHotelRoomOffers,
            });
          }
        );
      }}
      onClickCheckout={() => {
        console.log("Checkout clicked");
      }}
    />
  );
};

export const LoadingExample: Story = {
  render: () => <LoadingStoryWrapper />,
  args: {},
};
