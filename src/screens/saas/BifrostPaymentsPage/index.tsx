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

interface BifrostGroupBookingCheckoutRootPageProps {
  checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary;
  cart: BifrostGroupBookingCheckoutCart;
  availableHotelRooms: RenderableItineraryHotelRoomOffer[];
}

export function BifrostGroupBookingCheckoutRootPage({
  checkoutSessionSummary,
  cart,
  availableHotelRooms,
}: BifrostGroupBookingCheckoutRootPageProps) {
  return (
    <div className="h-screen max-h-screen min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <BifrostGroupBookingCheckoutHeader
          cart={cart}
          checkoutSessionSummary={checkoutSessionSummary}
        />
        <div className="mt-5 w-3/4 mx-auto pb-">
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
            />
          </div>
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
