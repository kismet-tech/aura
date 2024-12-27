import React, { useState } from "react";
import { RenderableItineraryEventOffer } from "@kismet_ai/foundation";
import {
  CalendarDaysIcon,
  HomeIcon,
  Users2Icon,
  HandCoins,
  FileTextIcon,
  ChevronDown,
  Pencil,
  Check,
  X,
  HelpCircle,
} from "lucide-react";
import { MoreInfoTooltip } from "@/components/MoreInfoTooltip";

/**
 * The EventOfferListItem variant determines what information is displayed:
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
type EventOfferListItemVariant = "host" | "attendee" | "saas";

type RSVPStatus = "yes" | "no" | "maybe" | null;

export interface EventOfferListItemProps {
  eventOffer: RenderableItineraryEventOffer;
  variant: EventOfferListItemVariant;
  onClick: ({ eventOfferId }: { eventOfferId: string }) => void;
  onDescriptionEdit?: (description: string) => void;
  onRSVP?: (status: RSVPStatus) => void;
  currentRSVP?: RSVPStatus;
}

export function EventOfferListItem({
  eventOffer,
  variant,
  onClick,
  onDescriptionEdit,
  onRSVP,
  currentRSVP,
}: EventOfferListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState((eventOffer.details as any).description || "");
  const startDate = new Date(eventOffer.startDateTime);
  const endDate = new Date(eventOffer.endDateTime);

  const formatDateTime = (start: Date, end: Date) => {
    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
      });
    };

    const formatTime = (date: Date) => {
      const timeStr = date
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: true,
        })
        .toLowerCase();
      return timeStr.replace(" ", "");
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

  const getVenueNames = (eventOffer: RenderableItineraryEventOffer) => {
    return eventOffer.venueOffers.map((offer) => offer.venueName).join(", ");
  };

  const formatVenuePrices = (eventOffer: RenderableItineraryEventOffer) => {
    return eventOffer.venueOffers
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

  const handleDescriptionSubmit = () => {
    setIsEditingDescription(false);
    onDescriptionEdit?.(description);
  };

  const handleDescriptionKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleDescriptionSubmit();
    } else if (e.key === "Escape") {
      setIsEditingDescription(false);
      setDescription((eventOffer.details as any).description || "");
    }
  };

  const RSVPButton = ({ status, icon: Icon, label }: { status: RSVPStatus; icon: React.ElementType; label: string }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRSVP?.(status === currentRSVP ? null : status);
      }}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors
        ${currentRSVP === status 
          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => onClick({ eventOfferId: eventOffer.eventOfferId })}
      >
        {/* Left side: Image and basic info */}
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <img
              src={eventOffer.imageUrl}
              alt={eventOffer.eventOfferName}
              className="w-full h-full object-cover rounded"
            />
            {variant !== "attendee" && (
              <div className="absolute top-0 left-0 bg-white px-2 py-0.5 text-xs rounded-br">
                {eventOffer.status.charAt(0).toUpperCase() +
                  eventOffer.status.slice(1).toLowerCase()}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium">{eventOffer.eventOfferName}</h3>
            <div className="text-sm text-gray-600">
              {formatDateTime(startDate, endDate)}
            </div>
            {variant !== "attendee" && (
              <div className="text-sm text-gray-600">
                {getVenueNames(eventOffer)}
              </div>
            )}
          </div>
        </div>

        {/* Right side: Price and expand button */}
        <div className="flex items-center space-x-4">
          {variant === "saas" && (
            <div className="text-sm font-medium">
              {eventOffer.isEventOfferPriceEnabled ? (
                <span>{formatPrice(eventOffer.eventOfferPriceInCents)}</span>
              ) : (
                <span>{formatVenuePrices(eventOffer)}</span>
              )}
            </div>
          )}

          {variant === "host" && (
            <div className="text-sm">
              {eventOffer.isEventOfferPriceEnabled ? (
                <div className="flex items-center gap-1">
                  <span className="font-medium">
                    {formatPrice(eventOffer.eventOfferPriceInCents)}
                  </span>
                  <MoreInfoTooltip
                    content="Total event price including all venues and services"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span className="font-medium">
                    {formatVenuePrices(eventOffer)}
                  </span>
                  <MoreInfoTooltip
                    content="Individual venue pricing and food & beverage minimums"
                  />
                </div>
              )}
            </div>
          )}

          {variant === "attendee" && (
            <div className="flex items-center gap-2">
              <RSVPButton status="yes" icon={Check} label="Yes" />
              <RSVPButton status="no" icon={X} label="No" />
              <RSVPButton status="maybe" icon={HelpCircle} label="Maybe" />
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronDown
              className={`w-5 h-5 transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expandable details */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 bg-gray-50">
          {variant !== "attendee" && (
            <>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <HomeIcon className="w-4 h-4" />
                <span>{getVenueNames(eventOffer)}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users2Icon className="w-4 h-4" />
                <span>{eventOffer.numberOfGuests} guests</span>
              </div>
            </>
          )}

          {variant === "attendee" && (
            <button className="text-sm text-gray-600 hover:text-gray-800">
              <div className="font-medium">Guest List</div>
              <div className="text-gray-400 text-xs">Coming soon</div>
            </button>
          )}

          {(eventOffer.details as any).description && (
            <div className={`text-sm text-gray-600 ${variant === "saas" ? "flex items-center space-x-2" : ""}`}>
              {variant === "saas" && <FileTextIcon className="w-4 h-4" />}
              {variant === "host" ? (
                <div className="group relative flex items-center">
                  {isEditingDescription ? (
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      onBlur={handleDescriptionSubmit}
                      onKeyDown={handleDescriptionKeyDown}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                  ) : (
                    <>
                      <span>{description}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditingDescription(true);
                        }}
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Pencil className="w-3.5 h-3.5 text-gray-500 hover:text-gray-700" />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <span>{(eventOffer.details as any).description}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 