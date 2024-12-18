import React from "react";
import { RenderableItineraryEventOffer } from "@kismet_ai/foundation";
import { CalendarDaysIcon, HomeIcon, Users2Icon, HandCoins } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EventOfferCarouselItemProps {
  eventOffer: RenderableItineraryEventOffer;
  onClick: ({ eventOfferId }: { eventOfferId: string }) => void;
  className?: string;
}

export function EventOfferCarouselItem({
  eventOffer,
  onClick,
  className,
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
      className={cn(
        "relative cursor-pointer overflow-hidden bg-white shadow-sm",
        "h-[400px] sm:h-[500px] md:h-[600px]",
        "min-w-[200px] w-full sm:w-[300px] md:w-[350px] lg:w-[400px]",
        "transition-all duration-300 ease-in-out",
        className
      )}
      onClick={() => onClick({ eventOfferId: eventOffer.eventOfferId })}
    >
      <div className="relative w-full h-[55.5%] overflow-hidden">
        <img
          src={eventOffer.imageUrl}
          alt={eventOffer.eventOfferName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-2 left-2 sm:top-3 md:top-4 sm:left-3 md:left-4 
                      px-2 py-0.5 sm:px-2.5 md:px-3 sm:py-0.5 md:py-1 
                      bg-white/90 backdrop-blur-sm 
                      text-[10px] leading-[14px] sm:text-xs sm:leading-4 md:text-sm md:leading-5
                      font-medium rounded-full">
          {eventOffer.status.charAt(0).toUpperCase() + eventOffer.status.slice(1).toLowerCase()}
        </div>
      </div>

      <div className="h-[44.5%] p-3 sm:p-4 md:p-6 lg:p-3 flex flex-col">
        <h3 className="text-base font-semibold mb-2 text-black">
          {eventOffer.eventOfferName}
        </h3>

        <div className="text-sm text-black/90 overflow-y-auto">
          <div className="flex items-start gap-2 md:gap-3">
            <CalendarDaysIcon className="w-4 h-4 shrink-0 text-black/80 mt-0.5" />
            <span className="text-sm leading-5 break-words">
              {formatDateTime(startDate, endDate)}
            </span>
          </div>

          <div className="flex items-start gap-2 md:gap-3">
            <HomeIcon className="w-4 h-4 shrink-0 text-black/80 mt-0.5" />
            <span className="text-sm leading-5 break-words">
              {getVenueNames(eventOffer)}
            </span>
          </div>

          <div className="flex items-start gap-2 md:gap-3">
            <Users2Icon className="w-4 h-4 shrink-0 text-black/80 mt-0.5" />
            <span className="text-sm leading-5 break-words">
              {eventOffer.numberOfGuests} guests
            </span>
          </div>

          <div className="flex items-start gap-2 md:gap-3">
            <HandCoins className="w-4 h-4 shrink-0 text-black/80 mt-0.5" />
            <span className="text-sm leading-5 break-words">
              {eventOffer.isEventOfferPriceEnabled
                ? formatPrice(eventOffer.eventOfferPriceInCents)
                : formatVenuePrices(eventOffer)
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
