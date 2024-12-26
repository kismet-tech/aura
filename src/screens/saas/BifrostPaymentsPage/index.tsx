import React, { useState } from "react";
import { BifrostGroupBookingCheckoutHeader } from "./BifrostGroupBookingCheckoutHeader";
import { BifrostGroupBookingCheckoutBody } from "./BifrostGroupBookingCheckoutBody";
import { MadeWithKismetLogo } from "@/components/atoms/icons/MadeWithKismetLogo";
import { BifrostGroupBookingCheckoutCart } from "../../../providers/saas/BifrostGroupBookingCheckoutStateProvider/models";
import {
  BifrostGroupBookingCheckoutSessionSummary,
  RenderableItineraryHotelRoomOffer,
} from "@kismet_ai/foundation";
import { renderCalendarDateRange } from "@/utilities/dates/render/renderCalendarDateRange";
import { RenderedCalendarDateFormat } from "@/utilities/dates/render/RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "@/utilities/dates/render/RenderedCalendarDateRangeJoinFormat";
import { AuthenticatedGuestUser } from "../../../../src/models/guests/AuthenticatedGuestUser";
import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Sheet } from "@/components/shadcn/sheet";
import { BifrostGroupBookingSheetSequence } from "./BifrostGroupBookingSheetSequence";

interface BifrostGroupBookingCheckoutRootPageProps {
  authenticatedGuestUser: AuthenticatedGuestUser | undefined;
  checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary | undefined;
  cart: BifrostGroupBookingCheckoutCart;
  availableHotelRooms: RenderableItineraryHotelRoomOffer[];
  onClickLogin: () => void;
  onClickUpdateHotelRoomCountInCart: ({
    updatedCountOffered,
    hotelRoomOfferId,
  }: {
    updatedCountOffered: number;
    hotelRoomOfferId: string;
  }) => void;
  onClickCheckout: () => void;
  getStripePaymentIntent: ({}: {}) => Promise<{ clientSecret: string }>;
}

export function BifrostGroupBookingCheckoutRootPage({
  authenticatedGuestUser,
  checkoutSessionSummary,
  cart,
  availableHotelRooms,
  onClickLogin,
  onClickUpdateHotelRoomCountInCart,
  onClickCheckout,
  getStripePaymentIntent,
}: BifrostGroupBookingCheckoutRootPageProps) {
  const [isGroupBookingSheetOpen, setIsGroupBookingSheetOpen] = useState(false);

  let renderedCheckoutButton: JSX.Element = <></>;
  if (cart.hotelRooms.length > 0) {
    if (authenticatedGuestUser) {
      renderedCheckoutButton = (
        <div className="sticky bottom-5 right-0 flex justify-end z-50">
          <Button
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.preventDefault();
              onClickCheckout();
            }}
          >
            Checkout
          </Button>
        </div>
      );
    } else {
      renderedCheckoutButton = (
        <div className="sticky bottom-5 right-0 flex justify-end z-50">
          <Button disabled>Log In to Checkout</Button>
        </div>
      );
    }
  }
  const onClickCart = () => {
    console.log(`Cart clicked`);
    setIsGroupBookingSheetOpen(true);
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
        />
        <div className="mt-5 w-3/4 mx-auto relative">
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
              onClickUpdateHotelRoomCountInCart={
                onClickUpdateHotelRoomCountInCart
              }
            />
          </div>
          {/* Fixed Checkout Button within the div */}
          {renderedCheckoutButton}
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
          }}
        >
          <BifrostGroupBookingSheetSequence
            getStripePaymentIntent={getStripePaymentIntent}
            checkoutSessionSummary={checkoutSessionSummary}
          />
        </Sheet>
      ) : (
        ""
      )}
    </div>
  );
}
