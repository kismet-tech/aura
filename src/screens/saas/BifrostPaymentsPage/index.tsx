import React, { useState } from "react";
import { BifrostGroupBookingCheckoutHeader } from "./BifrostGroupBookingCheckoutHeader";
import { BifrostGroupBookingCheckoutBody } from "./BifrostGroupBookingCheckoutBody";
import { MadeWithKismetLogo } from "@/components/atoms/icons/MadeWithKismetLogo";
import {
  BifrostGroupBookingCheckoutCart,
  BifrostGroupBookingCheckoutSessionSummary,
  RenderableItineraryHotelRoomOffer,
  RenderableItineraryEventOffer,
} from "@kismet_ai/foundation";
import { renderCalendarDateRange } from "@/utilities/dates/render/renderCalendarDateRange";
import { RenderedCalendarDateFormat } from "@/utilities/dates/render/RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "@/utilities/dates/render/RenderedCalendarDateRangeJoinFormat";
import { AuthenticatedGuestUser } from "../../../../src/models/guests/AuthenticatedGuestUser";
import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Sheet } from "@/components/shadcn/sheet";
import { BifrostGroupBookingSheetSequence } from "./BifrostGroupBookingSheetSequence";
import { BifrostEventsPage } from "./BifrostEventsPage";
import { BifrostRoomBlockPage } from "./BifrostRoomBlockPage";
import { BifrostSettingsPage } from "./BifrostSettingsPage";

interface BifrostGroupBookingCheckoutRootPageProps {
  authenticatedGuestUser: AuthenticatedGuestUser | undefined;
  checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary | undefined;
  cart: BifrostGroupBookingCheckoutCart;
  availableHotelRooms: RenderableItineraryHotelRoomOffer[];
  availableEventOffers: RenderableItineraryEventOffer[];
  variant?: "host" | "attendee" | "saas";
  onClickLogin: () => void;
  onClickUpdateHotelRoomCountInCart: ({
    updatedCountOffered,
    hotelRoomOfferId,
  }: {
    updatedCountOffered: number;
    hotelRoomOfferId: string;
  }) => void;
  onClickEventOffer: ({ eventOfferId }: { eventOfferId: string }) => void;
  onEventRSVP?: (status: "yes" | "no" | "maybe" | null) => void;
  onDescriptionEdit?: (description: string) => void;
  onClickCheckout: () => void;
  onClickEvents?: () => void;
  onClickRoomBlock?: () => void;
  onClickSettings?: () => void;
  getStripePaymentIntent: ({}: {}) => Promise<{ clientSecret: string }>;
}

type PageView = "overview" | "events" | "room-block" | "settings";

export function BifrostGroupBookingCheckoutRootPage({
  authenticatedGuestUser,
  checkoutSessionSummary,
  cart,
  availableHotelRooms,
  availableEventOffers,
  variant = "attendee",
  onClickLogin,
  onClickUpdateHotelRoomCountInCart,
  onClickEventOffer,
  onEventRSVP,
  onDescriptionEdit,
  onClickCheckout,
  onClickEvents,
  onClickRoomBlock,
  onClickSettings,
  getStripePaymentIntent,
}: BifrostGroupBookingCheckoutRootPageProps) {
  const [isGroupBookingSheetOpen, setIsGroupBookingSheetOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RenderableItineraryHotelRoomOffer | null>(null);
  const [currentRSVP, setCurrentRSVP] = useState<"yes" | "no" | "maybe" | null>(null);
  const [currentPage, setCurrentPage] = useState<PageView>("overview");

  const handleRoomClick = (room: RenderableItineraryHotelRoomOffer) => {
    if (variant === "attendee") {
      setSelectedRoom(room);
      setIsGroupBookingSheetOpen(true);
    }
  };

  let renderedCheckoutButton: JSX.Element = <></>;
  if (cart.hotelRooms.length > 0) {
    if (authenticatedGuestUser) {
      renderedCheckoutButton = (
        <div className="sticky bottom-5 right-0 flex justify-end z-50">
          <Button
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              event.preventDefault();
              onClickCheckout();
            }}
            className="border-3 rounded-full"
          >
            1-Click Checkout
          </Button>
        </div>
      );
    } else {
      renderedCheckoutButton = (
        <div className="sticky bottom-5 right-0 flex justify-end z-50">
          <Button
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              event.preventDefault();
              setIsGroupBookingSheetOpen(true);
            }}
            className="border-3 rounded-full"
          >
            Checkout
          </Button>
        </div>
      );
    }
  }
  const onClickCart = () => {
    console.log(`Cart clicked`);
    setIsGroupBookingSheetOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "events":
        return (
          <BifrostEventsPage
            events={availableEventOffers}
            variant={variant as "host" | "saas"}
            onClickEventOffer={onClickEventOffer}
            onDescriptionEdit={onDescriptionEdit}
            onBack={() => setCurrentPage("overview")}
          />
        );
      case "room-block":
        return (
          <BifrostRoomBlockPage
            rooms={availableHotelRooms}
            variant={variant as "host" | "saas"}
            onUpdateCount={onClickUpdateHotelRoomCountInCart}
            onBack={() => setCurrentPage("overview")}
          />
        );
      case "settings":
        return (
          <BifrostSettingsPage
            variant={variant as "host" | "saas"}
            onBack={() => setCurrentPage("overview")}
          />
        );
      default:
        return (
          <>
            <div className="text-center text-3xl font-palatino">
              {checkoutSessionSummary ? (
                checkoutSessionSummary.groupBookingCheckoutSessionTitle
              ) : (
                <Skeleton className="text-center w-[100px] h-[20px] rounded-full" />
              )}
            </div>
            <div className="text-center mt-2 font-palatino">
              {checkoutSessionSummary ? (
                renderCalendarDateRange({
                  calendarDateRange:
                    checkoutSessionSummary.groupBookingCheckoutSessionCalendarDateRange,
                  renderedCalendarDateFormat:
                    RenderedCalendarDateFormat.MONTH_DAY_YEAR,
                  renderedCalendarDateRangeJoinFormat:
                    RenderedCalendarDateRangeJoinFormat.SPACE_DASH_SPACE,
                  collapseStrategy: {
                    collapseSameMonth: true,
                    collapseSameDay: true,
                  },
                })
              ) : (
                <Skeleton className="text-center w-[100px] h-[20px] rounded-full" />
              )}
            </div>
            <div className="mt-4">
              {checkoutSessionSummary ? (
                <img
                  src={
                    checkoutSessionSummary.groupBookingCheckoutSessionHeroImageUrl
                  }
                  className="h-[250px] w-full object-cover"
                  alt="The hero image for the event"
                />
              ) : (
                <Skeleton className="w-full h-[250px] rounded-full" />
              )}
            </div>
            <div className="mt-4 border-b border-black w-full" />
            <div className="mt-4 mb-10">
              <BifrostGroupBookingCheckoutBody
                availableHotelRooms={availableHotelRooms}
                availableEventOffers={availableEventOffers}
                variant={variant}
                isLoggedIn={!!authenticatedGuestUser}
                onClickLogin={onClickLogin}
                onClickUpdateHotelRoomCountInCart={onClickUpdateHotelRoomCountInCart}
                onClickEventOffer={onClickEventOffer}
                onEventRSVP={onEventRSVP}
                currentRSVP={currentRSVP}
                onDescriptionEdit={onDescriptionEdit}
                onRoomClick={handleRoomClick}
              />
            </div>
            {renderedCheckoutButton}
          </>
        );
    }
  };

  return (
    <div className="h-screen max-h-screen min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <BifrostGroupBookingCheckoutHeader
          authenticatedGuestUser={authenticatedGuestUser}
          onClickLogin={onClickLogin}
          onClickCart={onClickCart}
          cart={cart}
          checkoutSessionSummary={checkoutSessionSummary}
          variant={variant}
          onClickEvents={() => setCurrentPage("events")}
          onClickRoomBlock={() => setCurrentPage("room-block")}
          onClickSettings={() => setCurrentPage("settings")}
        />
        <div className="mt-5 w-3/4 mx-auto relative">
          {renderPage()}
        </div>
      </div>
      <footer className="bg-white bg-opacity-0 border-t border-black w-full p-2 flex justify-end">
        <div className="transform scale-75 pb-">
          <MadeWithKismetLogo />
        </div>
      </footer>
      {checkoutSessionSummary ? (
        <Sheet
          open={isGroupBookingSheetOpen}
          onOpenChange={(updatedOpenValue) => {
            setIsGroupBookingSheetOpen(updatedOpenValue);
            if (!updatedOpenValue) {
              setSelectedRoom(null);
            }
          }}
        >
          <BifrostGroupBookingSheetSequence
            getStripePaymentIntent={getStripePaymentIntent}
            checkoutSessionSummary={checkoutSessionSummary}
            cart={cart}
            selectedRoom={selectedRoom}
          />
        </Sheet>
      ) : (
        ""
      )}
    </div>
  );
}
