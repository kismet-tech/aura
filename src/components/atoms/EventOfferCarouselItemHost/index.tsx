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
            <div className={styles.detailRow}>
              <CalendarDaysIcon
                className={styles.detailIcon}
                strokeWidth={1.5}
              />
              <span className={styles.detailText}></span>
            </div>

            <div
              className={`${styles.collapsibleDetails} ${
                isExpanded ? styles.expanded : ""
              }`}
            >
              <div className={styles.detailRow}>
                <HomeIcon className={styles.detailIcon} strokeWidth={1.5} />
                <span className={styles.detailText}></span>
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
                    ? eventOffer.eventOfferPriceInCents
                    : ""}
                </span>
              </div>

              {(eventOffer.details as any).description && (
                <div className={styles.detailRow}>
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
