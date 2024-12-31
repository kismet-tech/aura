import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { BifrostGroupBookingCheckoutRootPage } from ".";
import {
  BifrostGroupBookingCheckoutCart,
  RenderableItineraryHotelRoomOffer,
  RenderableItineraryEventOffer,
  HotelEventOfferStatus,
} from "@kismet_ai/foundation";
import { mockBifrostGroupBookingCheckoutCartOne } from "@kismet_ai/foundation/dist/models/saas/groups/BifrostGroupBookingCheckoutCart/mockBifrostGroupBookingCheckoutCarts";
import { mockBifrostGroupBookingCheckoutSessionSummaryOne } from "@kismet_ai/foundation/dist/models/saas/groups/BifrostGroupBookingCheckoutSessionSummary/mockBifrostGroupBookingCheckoutSessionSummaries";
import { AuthenticatedGuestUser } from "../../../models/guests/AuthenticatedGuestUser";

const meta: Meta<typeof BifrostGroupBookingCheckoutRootPage> = {
  title: "Applications/BifrostGroupBookingCheckoutRootPage",
  component: BifrostGroupBookingCheckoutRootPage,
};
export default meta;

type Story = StoryObj<typeof BifrostGroupBookingCheckoutRootPage>;

const mockEventOffers: RenderableItineraryEventOffer[] = [
  {
    eventOfferId: "event-1",
    eventOfferName: "Rehearsal Dinner",
    startDateTime: "2025-12-19T19:00:00Z",
    endDateTime: "2025-12-19T22:00:00Z",
    status: HotelEventOfferStatus.TENTATIVE,
    numberOfGuests: 60,
    imageUrl: "https://placehold.co/300x200",
    isEventOfferPriceEnabled: true,
    eventOfferPriceInCents: 700000,
    eventOfferListPriceInCents: 700000,
    venueOffers: [
      {
        venueOfferId: "venue-1",
        venueName: "Grand Ballroom",
        pricingInfo: null,
      },
    ],
    details: {
      description:
        "Join us for an elegant rehearsal dinner in the Grand Ballroom",
    },
  },
];

const createStoryWrapper = (variant: "host" | "attendee" | "saas") => () => {
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
  >(
    variant === "attendee"
      ? undefined
      : {
          firstName: "Julian",
          lastName: "Trajanson",
          userId: "trajanson",
        }
  );

  const [currentRSVP, setCurrentRSVP] = useState<"yes" | "no" | "maybe" | null>(
    null
  );

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
      availableEventOffers={mockEventOffers}
      variant={variant}
      onClickEventOffer={({ eventOfferId }) => {
        console.log("Event clicked:", eventOfferId);
      }}
      onEventRSVP={(status) => {
        setCurrentRSVP(status);
        console.log("RSVP status:", status);
      }}
      onDescriptionEdit={(description) => {
        console.log("Description edited:", description);
      }}
      onClickEvents={() => {
        console.log("Events navigation clicked");
      }}
      onClickRoomBlock={() => {
        console.log("Room Block navigation clicked");
      }}
      onClickSettings={() => {
        console.log("Settings navigation clicked");
      }}
      onClickUpdateHotelRoomCountInCart={({
        updatedCountOffered,
        hotelRoomOfferId,
      }) => {
        const updatedHotelRoomOffers = hotelRoomOffers.map((offer) => {
          if (offer.hotelRoomOfferId === hotelRoomOfferId) {
            return {
              ...offer,
              countOffered: updatedCountOffered,
              countAvailable: offer.countAvailable - updatedCountOffered,
            };
          }
          return offer;
        });

        setHotelRoomOffers(updatedHotelRoomOffers);

        const updatedCart = {
          hotelRooms: updatedHotelRoomOffers.filter(
            (offer) => offer.countOffered > 0
          ),
        };

        setCart(updatedCart);
      }}
      onClickCheckout={() => {
        console.log("Checkout clicked");
      }}
      getStripePaymentIntent={async () => {
        return {
          clientSecret: "mock_client_secret",
        };
      }}
    />
  );
};

export const HostView: Story = {
  render: () => createStoryWrapper("host")(),
  args: {},
};

export const SaaSView: Story = {
  render: () => createStoryWrapper("saas")(),
  args: {},
};

export const AttendeeViewLoggedOut: Story = {
  render: () => createStoryWrapper("attendee")(),
  args: {},
};

export const AttendeeViewLoggedIn: Story = {
  render: () => {
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

    // Start with user logged in
    const [authenticatedGuestUser] = useState<AuthenticatedGuestUser>({
      firstName: "Julian",
      lastName: "Trajanson",
      userId: "trajanson",
    });

    const [currentRSVP, setCurrentRSVP] = useState<
      "yes" | "no" | "maybe" | null
    >(null);

    return (
      <BifrostGroupBookingCheckoutRootPage
        onClickLogin={() => {
          console.log("Login clicked (user already logged in)");
        }}
        authenticatedGuestUser={authenticatedGuestUser}
        checkoutSessionSummary={
          mockBifrostGroupBookingCheckoutSessionSummaryOne
        }
        cart={cart}
        availableHotelRooms={hotelRoomOffers}
        availableEventOffers={mockEventOffers}
        variant="attendee"
        onClickEventOffer={({ eventOfferId }) => {
          console.log("Event clicked:", eventOfferId);
        }}
        onEventRSVP={(status) => {
          setCurrentRSVP(status);
          console.log("RSVP status:", status);
        }}
        onClickUpdateHotelRoomCountInCart={({
          updatedCountOffered,
          hotelRoomOfferId,
        }) => {
          const updatedHotelRoomOffers = hotelRoomOffers.map((offer) => {
            if (offer.hotelRoomOfferId === hotelRoomOfferId) {
              return {
                ...offer,
                countOffered: updatedCountOffered,
                countAvailable: offer.countAvailable - updatedCountOffered,
              };
            }
            return offer;
          });

          setHotelRoomOffers(updatedHotelRoomOffers);

          const updatedCart = {
            hotelRooms: updatedHotelRoomOffers.filter(
              (offer) => offer.countOffered > 0
            ),
          };

          setCart(updatedCart);
        }}
        onClickCheckout={() => {
          console.log("Checkout clicked");
        }}
        getStripePaymentIntent={async () => {
          return {
            clientSecret: "mock_client_secret",
          };
        }}
      />
    );
  },
  args: {},
};
