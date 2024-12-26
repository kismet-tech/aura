import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { BifrostGroupBookingCheckoutRootPage } from ".";
import {
  BifrostGroupBookingCheckoutCart,
  RenderableItineraryHotelRoomOffer,
} from "@kismet_ai/foundation";
import { mockBifrostGroupBookingCheckoutCartOne } from "@kismet_ai/foundation/dist/models/saas/groups/BifrostGroupBookingCheckoutCart/mockBifrostGroupBookingCheckoutCarts";
import { mockBifrostGroupBookingCheckoutSessionSummaryOne } from "@kismet_ai/foundation/dist/models/saas/groups/BifrostGroupBookingCheckoutSessionSummary/mockBifrostGroupBookingCheckoutSessionSummaries";
import { AuthenticatedGuestUser } from "../../../models/guests/AuthenticatedGuestUser";
import { useReactStateCache } from "@/utilities/core/react/useReactStateCache";
import { mockCreatePaymentIntent } from "@/components/molecules/StripePaymentForm/mockCreatePaymentIntent";

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

  const initialAvailableHotelRooms: RenderableItineraryHotelRoomOffer[] =
    mockBifrostGroupBookingCheckoutCartOne.hotelRooms.map(
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
      checkoutSessionSummary={mockBifrostGroupBookingCheckoutSessionSummaryOne}
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
      getStripePaymentIntent={async ({}: {}) => {
        const { clientSecret } = await mockCreatePaymentIntent({});
        return { clientSecret };
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

  const initialAvailableHotelRooms: RenderableItineraryHotelRoomOffer[] =
    mockBifrostGroupBookingCheckoutCartOne.hotelRooms.map(
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
      getStripePaymentIntent={async ({}: {}) => {
        const { clientSecret } = await mockCreatePaymentIntent({});
        return { clientSecret };
      }}
    />
  );
};

export const LoadingExample: Story = {
  render: () => <LoadingStoryWrapper />,
  args: {},
};
