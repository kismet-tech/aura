import React, { useState } from "react";
import { RenderableItineraryEventOffer } from "@kismet_ai/foundation";
import {
  CalendarDaysIcon,
  HomeIcon,
  Users2Icon,
  HandCoins,
  FileTextIcon,
  ChevronDownCircle,
} from "lucide-react";
import styles from "./styles.module.css";

export interface EventOfferCarouselItemSaaSProps {
  eventOffer: RenderableItineraryEventOffer;
  onClick: ({ 
    eventOfferId, 
    section 
  }: { 
    eventOfferId: string;
    section?: 'date' | 'venue' | 'guests' | 'price' | 'details';
  }) => void;
}

export const EventOfferCarouselItemSaaS: React.FC<EventOfferCarouselItemSaaSProps> = ({
  eventOffer,
  onClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const startDate = new Date(eventOffer.startDateTime);
  const endDate = new Date(eventOffer.endDateTime);

  // Track the current event ID to ensure we're handling the right event
  const currentEventId = React.useRef(eventOffer.eventOfferId);
  const isAnimating = React.useRef(false);
  const lastClickTime = React.useRef<number>(0);

  // Update currentEventId if eventOffer changes
  React.useEffect(() => {
    currentEventId.current = eventOffer.eventOfferId;
  }, [eventOffer.eventOfferId]);

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

    // Remove .00 if present
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

  const handleClick = (
    e: React.MouseEvent,
    section?: 'date' | 'venue' | 'guests' | 'price' | 'details'
  ) => {
    e.stopPropagation();
    
    // Prevent double clicks
    const now = Date.now();
    if (now - lastClickTime.current < 300) {
      return;
    }
    lastClickTime.current = now;

    // If we're animating, don't process the click
    if (isAnimating.current) {
      return;
    }

    // Capture the current event ID at click time
    const eventId = currentEventId.current;
    onClick({ eventOfferId: eventId, section });
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    isAnimating.current = true;
    setIsExpanded(!isExpanded);
    setTimeout(() => {
      isAnimating.current = false;
    }, 300); // Match the animation duration
  };

  return (
    <div 
      className={`${styles.container} w-[240px]`}
      onClick={(e) => handleClick(e)}
    >
      <div className={styles.imageContainer}>
        <img
          src={eventOffer.imageUrl}
          alt={eventOffer.eventOfferName}
          className={styles.image}
        />
        <div className={styles.status}>
          {eventOffer.status.charAt(0).toUpperCase() +
            eventOffer.status.slice(1).toLowerCase()}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{eventOffer.eventOfferName}</h3>
          <ChevronDownCircle
            className={`${styles.chevron} ${
              isExpanded ? styles.chevronExpanded : ""
            }`}
            strokeWidth={1.5}
            onClick={handleExpandClick}
          />
        </div>

        <div className={styles.detailsContainer}>
          <div 
            className={styles.detailRow}
            onClick={(e) => handleClick(e, 'date')}
          >
            <CalendarDaysIcon className={styles.detailIcon} strokeWidth={1.5} />
            <span className={styles.detailText}>
              {formatDateTime(startDate, endDate)}
            </span>
          </div>

          <div
            className={`${styles.collapsibleDetails} ${
              isExpanded ? styles.expanded : ""
            }`}
          >
            <div 
              className={styles.detailRow}
              onClick={(e) => handleClick(e, 'venue')}
            >
              <HomeIcon className={styles.detailIcon} strokeWidth={1.5} />
              <span className={styles.detailText}>
                {getVenueNames(eventOffer)}
              </span>
            </div>

            <div 
              className={styles.detailRow}
              onClick={(e) => handleClick(e, 'guests')}
            >
              <Users2Icon className={styles.detailIcon} strokeWidth={1.5} />
              <span className={styles.detailText}>
                {eventOffer.numberOfGuests} guests
              </span>
            </div>

            <div 
              className={styles.detailRow}
              onClick={(e) => handleClick(e, 'price')}
            >
              <HandCoins className={styles.detailIcon} strokeWidth={1.5} />
              <span className={styles.detailText}>
                {eventOffer.isEventOfferPriceEnabled
                  ? formatPrice(eventOffer.eventOfferPriceInCents)
                  : formatVenuePrices(eventOffer)}
              </span>
            </div>

            {(eventOffer.details as any).description && (
              <div 
                className={styles.detailRow}
                onClick={(e) => handleClick(e, 'details')}
              >
                <FileTextIcon className={styles.detailIcon} strokeWidth={1.5} />
                <span className={styles.detailText}>Details</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
