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
    section,
  }: {
    eventOfferId: string;
    section?: "date" | "venue" | "guests" | "price" | "details";
  }) => void;
}

export function EventOfferCarouselItemSaaS({
  eventOffer,
  onClick,
}: EventOfferCarouselItemSaaSProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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

    // Remove .00 if present
    return formatted.replace(".00", "");
  };

  const getVenueNames = (eventOffer: RenderableItineraryEventOffer) => {
    return eventOffer.venueOffers.map((offer) => offer.venueName).join(", ");
  };

  const formatVenuePrices = (eventOffer: RenderableItineraryEventOffer) => {
    return eventOffer.venueOffers
      .map((offer) => {
        const price = offer.pricingInfo
          ? `${formatPrice(offer.pricingInfo.offerPriceInCents)}${
              offer.pricingInfo.pricingType === "ALT_FOOD_BEV_MIN"
                ? " F&B Minimum"
                : ""
            } @ `
          : "";
        return `${price}${offer.venueName}`;
      })
      .join(", ");
  };

  const handleClick = (
    e: React.MouseEvent,
    section?: "date" | "venue" | "guests" | "price" | "details"
  ) => {
    e.stopPropagation();
    onClick({ eventOfferId: eventOffer.eventOfferId, section });
  };

  return (
    <>
      <style>{`
.detailRow {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.detailIcon {
  width: 1.25rem;
  height: 1.25rem;
  color: black;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.titleRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  line-clamp: 2;
  flex: 1;
}

.status {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.2rem 0.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.chevron {
  width: 1.25rem;
  height: 1.25rem;
  color: black;
  flex-shrink: 0;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.chevronExpanded {
  transform: rotate(180deg);
}

.collapsibleDetails {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.collapsibleDetails.expanded {
  max-height: 500px; /* Adjust based on your content */
}

.detailsContainer {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.container {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
}

.container:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: translateY(-1px);
}

.imageContainer {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  padding: 1rem;
}
    
    `}</style>
      <div className={styles.container} onClick={(e) => handleClick(e)}>
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
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            />
          </div>

          <div className={styles.detailsContainer}>
            <div
              className={styles.detailRow}
              onClick={(e) => handleClick(e, "date")}
            >
              <CalendarDaysIcon
                className={styles.detailIcon}
                strokeWidth={1.5}
              />
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
                onClick={(e) => handleClick(e, "venue")}
              >
                <HomeIcon className={styles.detailIcon} strokeWidth={1.5} />
                <span className={styles.detailText}>
                  {getVenueNames(eventOffer)}
                </span>
              </div>

              <div
                className={styles.detailRow}
                onClick={(e) => handleClick(e, "guests")}
              >
                <Users2Icon className={styles.detailIcon} strokeWidth={1.5} />
                <span className={styles.detailText}>
                  {eventOffer.numberOfGuests} guests
                </span>
              </div>

              <div
                className={styles.detailRow}
                onClick={(e) => handleClick(e, "price")}
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
                  onClick={(e) => handleClick(e, "details")}
                >
                  <FileTextIcon
                    className={styles.detailIcon}
                    strokeWidth={1.5}
                  />
                  <span className={styles.detailText}>Details</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
