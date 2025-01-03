import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { BifrostGroupBookingSheetSequenceContentSummaryLineItem } from "../BifrostGroupBookingSheetSequenceContentSummaryLineItem";
import { BifrostGroupBookingSheetSequenceContentSummaryEventLineItem } from "../BifrostGroupBookingSheetSequenceContentSummaryEventLineItem";
import { MoreInfoTooltip } from "@/components/MoreInfoTooltip";
import {
  BifrostGroupBookingCheckoutCart,
  getDaysBetweenCalendarDates,
  getEarliestCalendarDate,
  getLatestCalendarDate,
  RenderableItineraryHotelRoomOffer,
  renderCalendarDateRange,
  RenderedCalendarDateFormat,
  RenderedCalendarDateRangeJoinFormat,
} from "@kismet_ai/foundation";

/**
 * Terms Data Structure from Backend
 *
 * @description
 * Terms are generated based on the following data points:
 * - Room block minimums and pickup requirements
 * - Event contract dependencies (e.g. F&B minimums)
 * - Release dates for room blocks
 * - Comped room conditions
 * - Failure clauses and penalty rates
 *
 * @example Backend Response
 * {
 *   // For comped rooms:
 *   terms: {
 *     type: "comped",
 *     conditions: {
 *       minRoomPickup: 25,
 *       minNights: 2,
 *       requiredEvents: [{
 *         name: "Rehearsal Dinner",
 *         fbMinimum: 7000
 *       }],
 *       failureRate: 1295
 *     }
 *   }
 *
 *   // For room blocks:
 *   terms: {
 *     type: "block",
 *     conditions: {
 *       roomCount: 29,
 *       releaseDate: "30 days before event"
 *     }
 *   }
 * }
 *
 * Hey Julian - Terms should be generated server-side based on:
 * 1. Room block details (minimum pickups, dates, rates)
 * 2. Event contracts that affect room rates (like F&B minimums)
 * 3. Release dates for room blocks
 * 4. Comped room conditions and fallback rates
 *
 * The frontend will receive these as formatted strings to display,
 * but the logic for determining terms should live in the backend
 * based on the offer data structure.
 *
 * TODO: Room count adjustments will be handled through the Room Editor modal
 * instead of the carousel UI. Backend changes needed:
 * - Remove /updateHotelRoomCount endpoint
 * - Add room count adjustment to Room Editor mutation
 * - Update validation logic for room modifications
 */

interface BifrostGroupBookingSheetSequenceContentSummaryProps {
  cart: BifrostGroupBookingCheckoutCart;
  yourRooms: {
    count: number;
    dates: string;
    total: number;
  };
  heldRooms: {
    count: number;
    dates: string;
  };
  pendingEvents: {
    count: number;
    total: number;
  };
  confirmedEvents: {
    count: number;
    total: number;
  };
  stage?: "default" | "summary" | "checkout";
}

export function BifrostGroupBookingSheetSequenceContentSummary({
  cart,
  // yourRooms = { count: 0, dates: "", total: 0 },
  heldRooms = { count: 0, dates: "" },
  pendingEvents = { count: 0, total: 0 },
  confirmedEvents = { count: 0, total: 0 },
  stage = "default",
}: BifrostGroupBookingSheetSequenceContentSummaryProps) {
  const [expandedSections, setExpandedSections] = useState<{
    yourRooms: boolean;
    heldRooms: boolean;
    pendingEvents: boolean;
    confirmedEvents: boolean;
  }>({
    yourRooms: false,
    heldRooms: false,
    pendingEvents: false,
    confirmedEvents: false,
  });

  const yourRoomsStartCalendarDate = getEarliestCalendarDate(
    cart.hotelRooms.map(
      (hotelRoomOffer) => hotelRoomOffer.calendarDateRange.startCalendarDate
    )
  );
  const yourRoomsEndCalendarDate = getLatestCalendarDate(
    cart.hotelRooms.map(
      (hotelRoomOffer) => hotelRoomOffer.calendarDateRange.startCalendarDate
    )
  );

  const yourRoomsSummary: { count: number; dates: string; total: number } = {
    count: cart.hotelRooms.reduce((accum: number, hotelRoomOffer) => {
      return accum + hotelRoomOffer.countOffered;
    }, 0),
    dates: renderCalendarDateRange({
      calendarDateRange: {
        startCalendarDate: yourRoomsStartCalendarDate,
        endCalendarDate: yourRoomsEndCalendarDate,
      },
      renderedCalendarDateFormat:
        RenderedCalendarDateFormat.ABBREVIATED_MONTH_DAY_OPTIONAL_YEAR,
      renderedCalendarDateRangeJoinFormat:
        RenderedCalendarDateRangeJoinFormat.SPACE_DASH_SPACE,
      collapseStrategy: {
        collapseSameDay: true,
        collapseSameMonth: true,
      },
    }),
    total: cart.hotelRooms.reduce(
      (accum: number, hotelRoomOffer: RenderableItineraryHotelRoomOffer) => {
        return (
          accum +
          hotelRoomOffer.countOffered *
            hotelRoomOffer.offerPriceInCents *
            getDaysBetweenCalendarDates({
              startCalendarDate:
                hotelRoomOffer.calendarDateRange.startCalendarDate,
              endCalendarDate: hotelRoomOffer.calendarDateRange.endCalendarDate,
            }).days
        );
      },
      0
    ),
  };

  const yourRooms = cart.hotelRooms;

  const isAccordionEnabled = stage !== "summary" && stage !== "checkout";
  return (
    <div className="space-y-6">
      <h2 className="font-semibold">In Cart</h2>

      <div className="space-y-4">
        {yourRoomsSummary.count > 0 && (
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">
                {yourRoomsSummary.count === 1 ? "Your Room" : "Your Rooms"}
              </h3>
              <button
                onClick={() =>
                  setExpandedSections((prev) => ({
                    ...prev,
                    yourRooms: !prev.yourRooms,
                  }))
                }
                className="text-gray-500"
              >
                {expandedSections.yourRooms ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>

            {!expandedSections.yourRooms && (
              <div className="flex justify-between text-sm pt-2 border-t">
                <div>{yourRoomsSummary.count} Room Total</div>
                <div className="flex items-center gap-1">
                  <span>${yourRoomsSummary.total / 100}</span>
                  <MoreInfoTooltip content="Room is comped based on 25 rooms from room block getting picked up for at least 2 nights and confirmed Rehearsal Dinner event with $7,000 F&B minimum" />
                </div>
              </div>
            )}

            {expandedSections.yourRooms && (
              <div className="space-y-4">
                {yourRooms.map(
                  (hotelRoomOffer: RenderableItineraryHotelRoomOffer) => {
                    console.log(
                      `hotelRoomOffer: ${JSON.stringify(hotelRoomOffer)}`
                    );

                    return (
                      <BifrostGroupBookingSheetSequenceContentSummaryLineItem
                        roomCount={hotelRoomOffer.countOffered}
                        title={hotelRoomOffer.hotelRoomName}
                        nights={3}
                        dates={renderCalendarDateRange({
                          calendarDateRange: hotelRoomOffer.calendarDateRange,
                          renderedCalendarDateFormat:
                            RenderedCalendarDateFormat.ABBREVIATED_MONTH_DAY_OPTIONAL_YEAR,
                          renderedCalendarDateRangeJoinFormat:
                            RenderedCalendarDateRangeJoinFormat.SPACE_DASH_SPACE,
                          collapseStrategy: {
                            collapseSameDay: true,
                            collapseSameMonth: true,
                          },
                        })}
                        price={{
                          amountInCents: hotelRoomOffer.offerPriceInCents,
                          label: "/room/night + taxes and fees",
                        }}
                        keyTerms={[
                          "Comped based on 25 rooms from room block getting picked up for at least 2 nights",
                          "Rehearsal dinner held at hotel with a $7,000 F&B minimum",
                          "Failure to meet these terms will result in a charge for King Room of $1,295/night + taxes and fees",
                        ]}
                        termTitle="Comped Room Terms"
                        termInfoTip="Terms and conditions for complimentary room rates."
                        imageUrl={hotelRoomOffer.heroImageUrl}
                      />
                    );
                  }
                )}

                <div className="flex justify-between text-sm pt-2 border-t">
                  <div>{yourRoomsSummary.count} Room Total</div>
                  <div className="flex items-center gap-1">
                    <span>${(yourRoomsSummary.total / 100).toFixed(0)}</span>
                    <MoreInfoTooltip content="Room is comped based on 25 rooms from room block getting picked up for at least 2 nights and confirmed Rehearsal Dinner event with $7,000 F&B minimum" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {heldRooms.count > 0 && (
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Blocked Rooms</h3>
              <button
                onClick={() =>
                  setExpandedSections((prev) => ({
                    ...prev,
                    heldRooms: !prev.heldRooms,
                  }))
                }
                className="text-gray-500"
              >
                {expandedSections.heldRooms ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>

            {!expandedSections.heldRooms && (
              <div className="flex justify-between text-sm pt-2 border-t">
                <div>{heldRooms.count} Rooms Total</div>
                <div className="flex items-center gap-1">
                  <span>Guests pay</span>
                  <MoreInfoTooltip content="Your guests will pay for their own rooms when they book" />
                </div>
              </div>
            )}

            {expandedSections.heldRooms && (
              <div className="space-y-4">
                <BifrostGroupBookingSheetSequenceContentSummaryLineItem
                  roomCount={29}
                  title="Run of House"
                  nights={3}
                  dates="Dec 18-21"
                  price={{
                    amountInCents: 523,
                    label: "/room/night + taxes and fees",
                  }}
                  keyTerms={[
                    "29 Rooms will be held for guest booking",
                    "Unbooked rooms will be released 30 days before event",
                  ]}
                  imageUrl="https://placehold.co/48x48"
                />

                <div className="flex justify-between text-sm pt-2 border-t">
                  <div>{heldRooms.count} Rooms Total</div>
                  <div className="flex items-center gap-1">
                    <span>Guests pay</span>
                    <MoreInfoTooltip content="Your guests will pay for their own rooms when they book" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {confirmedEvents.count > 0 && (
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Confirmed Events</h3>
              {isAccordionEnabled && (
                <button
                  onClick={() =>
                    setExpandedSections((prev) => ({
                      ...prev,
                      confirmedEvents: !prev.confirmedEvents,
                    }))
                  }
                  className="text-gray-500"
                >
                  {expandedSections.confirmedEvents ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>

            {!isAccordionEnabled || expandedSections.confirmedEvents ? (
              <div className="space-y-4">
                <BifrostGroupBookingSheetSequenceContentSummaryEventLineItem
                  status="confirmed"
                  title="Rehearsal Dinner"
                  date="Friday 12/19"
                  time="7-10pm"
                  capacity={{
                    count: 60,
                    label: "Guest Capacity (Maximum)",
                  }}
                  price={{
                    amount: 7000,
                    label: "F&B Minimum",
                  }}
                  keyTerms={["Confirmed event with $7,000 F&B minimum"]}
                  image="https://placehold.co/48x48"
                />

                <div className="flex justify-between text-sm pt-2 border-t">
                  <div>{confirmedEvents.count} Event Total</div>
                  <div>${confirmedEvents.total.toFixed(2)}</div>
                </div>
              </div>
            ) : (
              <div className="flex justify-between text-sm pt-2 border-t">
                <div>{confirmedEvents.count} Event Total</div>
                <div>${confirmedEvents.total.toFixed(2)}</div>
              </div>
            )}
          </div>
        )}

        {pendingEvents.count > 0 && (
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Pending Events</h3>
              {isAccordionEnabled && (
                <button
                  onClick={() =>
                    setExpandedSections((prev) => ({
                      ...prev,
                      pendingEvents: !prev.pendingEvents,
                    }))
                  }
                  className="text-gray-500"
                >
                  {expandedSections.pendingEvents ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>

            {!isAccordionEnabled || expandedSections.pendingEvents ? (
              <div className="space-y-4">
                <BifrostGroupBookingSheetSequenceContentSummaryEventLineItem
                  status="pending"
                  title="Rehearsal Dinner"
                  date="Friday 12/19"
                  time="7-10pm"
                  capacity={{
                    count: 60,
                    label: "Guest Capacity (Maximum)",
                  }}
                  price={{
                    amount: 7000,
                    label: "F&B Minimum",
                  }}
                  keyTerms={[
                    "$100 refundable hold pending approval of the Rehearsal Dinner Event",
                  ]}
                  image="https://placehold.co/48x48"
                />

                <div className="flex justify-between text-sm pt-2 border-t">
                  <div>{pendingEvents.count} Event Total</div>
                  <div className="text-right">
                    <div>${pendingEvents.total.toFixed(2)}</div>
                    <div className="text-gray-500 text-xs">refundable hold</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-between text-sm pt-2 border-t">
                <div>{pendingEvents.count} Event Total</div>
                <div className="text-right">
                  <div>${pendingEvents.total.toFixed(2)}</div>
                  <div className="text-gray-500 text-xs">refundable hold</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
