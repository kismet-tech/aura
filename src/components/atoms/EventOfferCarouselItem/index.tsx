import React, { useState } from "react";
import { RenderableItineraryEventOffer } from "@kismet_ai/foundation";
import { CalendarDaysIcon, HomeIcon, Users2Icon, HandCoins, FileTextIcon, ChevronDownCircle } from "lucide-react";
import styles from './styles.module.css';

export interface EventOfferCarouselItemProps {
  eventOffer: RenderableItineraryEventOffer;
  onClick: ({ eventOfferId }: { eventOfferId: string }) => void;
}

export function EventOfferCarouselItem({
  eventOffer,
  onClick,
}: EventOfferCarouselItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
      className={styles.container}
      onClick={() => onClick({ eventOfferId: eventOffer.eventOfferId })}
    >
      <div className={styles.imageContainer}>
        <img
          src={eventOffer.imageUrl}
          alt={eventOffer.eventOfferName}
          className={styles.image}
        />
        <div className={styles.status}>
          {eventOffer.status.charAt(0).toUpperCase() + eventOffer.status.slice(1).toLowerCase()}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>
            {eventOffer.eventOfferName}
          </h3>
          <ChevronDownCircle 
            className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}
            strokeWidth={1.5}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          />
        </div>

        <div className={styles.detailsContainer}>
          <div className={styles.detailRow}>
            <CalendarDaysIcon className={styles.detailIcon} strokeWidth={1.5} />
            <span className={styles.detailText}>
              {formatDateTime(startDate, endDate)}
            </span>
          </div>

          <div className={`${styles.collapsibleDetails} ${isExpanded ? styles.expanded : ''}`}>
            <div className={styles.detailRow}>
              <HomeIcon className={styles.detailIcon} strokeWidth={1.5} />
              <span className={styles.detailText}>
                {getVenueNames(eventOffer)}
              </span>
            </div>

            <div className={styles.detailRow}>
              <Users2Icon className={styles.detailIcon} strokeWidth={1.5} />
              <span className={styles.detailText}>
                {eventOffer.numberOfGuests} guests
              </span>
            </div>

            <div className={styles.detailRow}>
              <HandCoins className={styles.detailIcon} strokeWidth={1.5} />
              <span className={styles.detailText}>
                {eventOffer.isEventOfferPriceEnabled
                  ? formatPrice(eventOffer.eventOfferPriceInCents)
                  : formatVenuePrices(eventOffer)
                }
              </span>
            </div>

            {(eventOffer.details as any).description && (
              <div className={styles.detailRow}>
                <FileTextIcon className={styles.detailIcon} strokeWidth={1.5} />
                <span className={styles.detailText}>
                  Details
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
