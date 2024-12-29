import React from "react";
import { RenderableItineraryEventOffer } from "@kismet_ai/foundation";
import { ChevronRight } from "lucide-react";
import { MoreInfoTooltip } from "@/components/MoreInfoTooltip";

/**
 * The EventCard variant determines what information is displayed:
 * 
 * - "host": Full management view for hosts/planners
 *   Shows event details, status, capacity, and venue information
 * 
 * - "attendee": Booking view for event attendees
 *   Shows event details, date/time, and capacity for booking
 * 
 * - "saas": Administrative view for venue managers
 *   Shows full event details and pricing without booking controls
 */
type EventCardVariant = "host" | "attendee" | "saas";

interface EventCardProps {
  event: RenderableItineraryEventOffer & {
    badgeText?: string;
  };
  variant: EventCardVariant;
  className?: string;
  onClick?: () => void;
}

export function EventCard({
  event,
  variant,
  className = "",
  onClick,
}: EventCardProps) {
  const formatDateTime = (startDateTime: string, endDateTime: string) => {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
      });
    };

    const formatTime = (date: Date) => {
      return date
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: true,
        })
        .toLowerCase()
        .replace(" ", "");
    };

    return `${formatDate(start)}, ${formatTime(start)}-${formatTime(end)}`;
  };

  const formatPrice = (priceInCents: number) => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(priceInCents / 100);

    return formatted.replace(".00", "");
  };

  const getVenueNames = () => {
    return event.venueOffers.map((offer) => offer.venueName).join(", ");
  };

  const formatVenuePrices = () => {
    return event.venueOffers
      .map((offer) => {
        const formattedPrice = formatPrice(offer.pricingInfo.priceInCents);
        const fbMinimumSuffix =
          offer.pricingInfo.pricingType === "ALT_FOOD_BEV_MIN"
            ? " F&B Minimum"
            : "";
        return `${formattedPrice}${fbMinimumSuffix} @ ${offer.venueName}`;
      })
      .join(", ");
  };

  return (
    <div
      className={`relative flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Image and Status Badge */}
      <div className="relative">
        <img
          src={event.imageUrl}
          alt={event.eventOfferName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-white rounded-full px-3 py-1 text-sm font-medium">
            {event.status.charAt(0).toUpperCase() + event.status.slice(1).toLowerCase()}
          </span>
        </div>
        {event.badgeText && (
          <div className="absolute top-2 right-2">
            <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium">
              {event.badgeText}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{event.eventOfferName}</h3>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>

        <div className="text-sm text-gray-600">
          {formatDateTime(event.startDateTime, event.endDateTime)}
        </div>

        {variant !== "attendee" && (
          <div className="text-sm text-gray-600">
            {getVenueNames()}
          </div>
        )}

        <div className="text-sm">
          <span className="font-medium">
            {event.numberOfGuests} guests
          </span>
        </div>

        {variant === "saas" && (
          <div className="text-sm">
            {event.isEventOfferPriceEnabled ? (
              <span className="font-medium">
                {formatPrice(event.eventOfferPriceInCents)}
              </span>
            ) : (
              <span className="font-medium">
                {formatVenuePrices()}
              </span>
            )}
          </div>
        )}

        {variant === "host" && (
          <div className="text-sm">
            {event.isEventOfferPriceEnabled ? (
              <div className="flex items-center gap-1">
                <span className="font-medium">
                  {formatPrice(event.eventOfferPriceInCents)}
                </span>
                <MoreInfoTooltip
                  content="Total event price including all venues and services"
                />
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span className="font-medium">
                  {formatVenuePrices()}
                </span>
                <MoreInfoTooltip
                  content="Individual venue pricing and food & beverage minimums"
                />
              </div>
            )}
          </div>
        )}

        {variant === "attendee" && event.isEventOfferPriceEnabled && (
          <div className="text-sm">
            <span className="font-medium">
              {formatPrice(event.eventOfferPriceInCents)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
} 