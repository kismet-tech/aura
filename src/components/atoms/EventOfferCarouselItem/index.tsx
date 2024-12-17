import React from "react";
import { RenderableItineraryEventOffer } from "@kismet_ai/foundation";
import { CalendarDaysIcon, HomeIcon, Users2Icon, HandCoins, FileTextIcon } from "lucide-react";

export interface EventOfferCarouselItemProps {
  eventOffer: RenderableItineraryEventOffer;
  onClick: ({ eventOfferId }: { eventOfferId: string }) => void;
}

export function EventOfferCarouselItem({
  eventOffer,
  onClick,
}: EventOfferCarouselItemProps) {
  const startDate = new Date(eventOffer.startDateTime);
  const endDate = new Date(eventOffer.endDateTime);

  const formatDateTime = (start: Date, end: Date) => {
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric'
      });
    };

    const formatTime = (date: Date) => {
      const timeStr = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true
      }).toLowerCase();
      return timeStr.replace(' ', '');
    };

    return `${formatDate(start)}, ${formatTime(start)}-${formatTime(end)}`;
  };

  const formatPrice = (priceInCents: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(priceInCents / 100);

    // Remove .00 if present
    return formatted.replace('.00', '');
  };

  const getVenueNames = (eventOffer: RenderableItineraryEventOffer) => {
    return eventOffer.venueOffers
      .map(offer => offer.venueName)
      .join(", ");
  };

  const formatVenuePrices = (eventOffer: RenderableItineraryEventOffer) => {
    return eventOffer.venueOffers
      .map(offer => {
        const formattedPrice = formatPrice(offer.pricingInfo.priceInCents);
        const fbMinimumSuffix = offer.pricingInfo.pricingType === 'ALT_FOOD_BEV_MIN'
          ? ' F&B Minimum'
          : '';
        return `${formattedPrice}${fbMinimumSuffix} @ ${offer.venueName}`;
      })
      .join(', ');
  };

  return (
    <div
      className="w-full cursor-pointer transition-colors overflow-hidden"
      onClick={() => onClick({ eventOfferId: eventOffer.eventOfferId })}
    >
      <div className="relative w-full aspect-video sm:aspect-[2/1] lg:aspect-[3/2]">
        <img
          src={eventOffer.imageUrl}
          alt={eventOffer.eventOfferName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium rounded-full border-2 border-black">
          {eventOffer.status.charAt(0).toUpperCase() + eventOffer.status.slice(1).toLowerCase()}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base sm:text-lg font-semibold mb-4 line-clamp-2">
          {eventOffer.eventOfferName}
        </h3>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <CalendarDaysIcon className="w-5 h-5 text-black shrink-0 mt-0.5" />
            <span className="text-sm sm:text-base font-medium break-words">
              {formatDateTime(startDate, endDate)}
            </span>
          </div>

          <div className="flex items-start gap-2">
            <HomeIcon className="w-5 h-5 text-black shrink-0 mt-0.5" />
            <span className="text-sm sm:text-base font-medium break-words">
              {getVenueNames(eventOffer)}
            </span>
          </div>

          <div className="flex items-start gap-2">
            <Users2Icon className="w-5 h-5 text-black shrink-0 mt-0.5" />
            <span className="text-sm sm:text-base font-medium">
              {eventOffer.numberOfGuests} guests
            </span>
          </div>

          <div className="flex items-start gap-2">
            <HandCoins className="w-5 h-5 text-black shrink-0 mt-0.5" />
            <span className="text-sm sm:text-base font-medium break-words">
              {eventOffer.isEventOfferPriceEnabled
                ? formatPrice(eventOffer.eventOfferPriceInCents)
                : formatVenuePrices(eventOffer)
              }
            </span>
          </div>

          {(eventOffer.details as any).description && (
            <div className="flex items-start gap-2">
              <FileTextIcon className="w-5 h-5 text-black shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base font-medium">
                Details
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
