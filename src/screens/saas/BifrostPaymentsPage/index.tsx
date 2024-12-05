import React from "react";
import { BifrostGroupBookingCheckoutHeader } from "./BifrostGroupBookingCheckoutHeader";
import { BifrostGroupBookingCheckoutBody } from "./BifrostGroupBookingCheckoutBody";
import { MadeWithKismetLogo } from "@/components/atoms/icons/MadeWithKismetLogo";
import {
  BifrostGroupBookingCheckoutCart,
  BifrostGroupBookingCheckoutSessionSummary,
} from "@/providers/saas/BifrostGroupBookingCheckoutStateProvider/models";
import { RenderableItineraryHotelRoomOffer } from "@/models/bifrost/RenderableItineraryOffer";
import { renderCalendarDateRange } from "@/utilities/dates/render/renderCalendarDateRange";
import { RenderedCalendarDateFormat } from "@/utilities/dates/render/RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "@/utilities/dates/render/RenderedCalendarDateRangeJoinFormat";
import { AuthenticatedGuestUser } from "@/models/guests/AuthenticatedGuestUser";
import { Button } from "@/components/shadcn/button";

interface BifrostGroupBookingCheckoutRootPageProps {
  authenticatedGuestUser: AuthenticatedGuestUser | undefined;
  checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary;
  cart: BifrostGroupBookingCheckoutCart;
  availableHotelRooms: RenderableItineraryHotelRoomOffer[];
  onClickLogin: () => void;
  onClickUpdateHotelRoomCountInCart: ({
    updatedCountOffered,
    hotelRoomId,
  }: {
    updatedCountOffered: number;
    hotelRoomId: string;
  }) => void;
  onClickCheckout: () => void;
}

export function BifrostGroupBookingCheckoutRootPage({
  authenticatedGuestUser,
  checkoutSessionSummary,
  cart,
  availableHotelRooms,
  onClickLogin,
  onClickUpdateHotelRoomCountInCart,
  onClickCheckout,
}: BifrostGroupBookingCheckoutRootPageProps) {
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

  return (
    <div className="h-screen max-h-screen min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <BifrostGroupBookingCheckoutHeader
          authenticatedGuestUser={authenticatedGuestUser}
          onClickLogin={onClickLogin}
          cart={cart}
          checkoutSessionSummary={checkoutSessionSummary}
        />
        <div className="mt-5 w-3/4 mx-auto relative">
          <div className="text-center text-3xl font-palatino">
            {checkoutSessionSummary.groupBookingCheckoutSessionTitle}
          </div>
          <div className="text-center mt-2 font-palatino">
            {renderCalendarDateRange({
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
            })}
          </div>
          <div className="mt-4">
            <img
              src={
                checkoutSessionSummary.groupBookingCheckoutSessionHeroImageUrl
              }
              className="h-[250px] w-full object-cover"
              alt="The hero image for the event"
            />
          </div>
          <div className="mt-4 border-b-2 border-black w-full" />
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
      <footer className="bg-white bg-opacity-0 border-t-2 border-black w-full p-2 flex justify-end">
        <div className="transform scale-75 pb-">
          <MadeWithKismetLogo />
        </div>
      </footer>
    </div>
  );
}
