/**
 * WIP: Drawer component is under development and not ready for use
 * This file contains the BookingDrawer component which will handle:
 * - Completed itineraries
 * - In-progress bookings
 * - Special offers
 */

"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { BifrostDrawerButton } from "./bifrostDrawerButton";
import { PendingItineraryPlannerHeader } from "@/components/bifrostForm/PendingItineraryPlanner/components/PendingItineraryPlannerHeader";
import { ItineraryOfferPresentationSummary } from "@/components/workspace/ItineraryOffers/ListOfItineraryOffersPresentation/ItineraryOfferPresentationSummary";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
import { SpecialOffer } from "@/components/molecules/SpecialOffer";

const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

const DrawerContent = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  background: white;
  padding: 24px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  z-index: 51;
  overflow-y: auto;
  transform: translateX(${(props) => (props.$isOpen ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #f8f9fa;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: #e2e8f0;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 2px;
    background: #666;
    transform-origin: center;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const DrawerHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const HeaderLogo = styled.div`
  margin: 0 auto 16px;
  width: 40px;
  height: 40px;
  position: relative;
`;

const LogoLine = styled.div`
  position: absolute;
  width: 3px;
  height: 12px;
  background: #0095f6;
  border-radius: 0;
  transform-origin: center;
  left: 50%;
  top: 50%;
  margin-left: -1.5px;
  margin-top: -6px;

  &:nth-child(1) {
    transform: rotate(0deg) translateY(-12px);
    width: 3px;
  }
  &:nth-child(2) {
    transform: rotate(30deg) translateY(-12px);
    width: 2.7px;
  }
  &:nth-child(3) {
    transform: rotate(60deg) translateY(-12px);
    width: 2.4px;
  }
  &:nth-child(4) {
    transform: rotate(90deg) translateY(-12px);
    width: 2.1px;
  }
  &:nth-child(5) {
    transform: rotate(120deg) translateY(-12px);
    width: 1.8px;
  }
  &:nth-child(6) {
    transform: rotate(150deg) translateY(-12px);
    width: 1.5px;
  }
  &:nth-child(7) {
    transform: rotate(180deg) translateY(-12px);
    width: 1.2px;
  }
  &:nth-child(8) {
    transform: rotate(210deg) translateY(-12px);
    width: 0.9px;
  }
  &:nth-child(9) {
    transform: rotate(240deg) translateY(-12px);
    width: 0.6px;
  }
  &:nth-child(10) {
    transform: rotate(270deg) translateY(-12px);
    width: 0.3px;
  }
  &:nth-child(11) {
    transform: rotate(300deg) translateY(-12px);
    width: 0.3px;
  }
  &:nth-child(12) {
    transform: rotate(330deg) translateY(-12px);
    width: 0.3px;
  }
`;

const DrawerTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const DrawerDescription = styled.p`
  color: #666;
  font-size: 14px;
`;

const BookingDetails = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  color: #666;
`;

const DetailValue = styled.span`
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  ${(props) =>
    props.$variant === "secondary"
      ? `
    background: #f8f9fa;
    color: #333;
    border: 1px solid #ddd;

    &:hover {
      background: #eee;
    }
  `
      : `
    background: #0095f6;
    color: white;
    border: none;

    &:hover {
      opacity: 0.9;
    }
  `}
`;

const ProgressIndicator = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 16px 0;
`;

const ProgressDot = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => (props.$active ? "#0095f6" : "#e2e8f0")};
`;

const StatusBox = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

const InstantBookPlaceholder = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  border: 1px dashed #ccc;
  text-align: center;
`;

export type DrawerType =
  | "completed-itinerary"
  | "in-progress"
  | "special-offer";

interface CompletedItinerary {
  destination: string;
  dates: string;
  guests: number;
  price: string;
  roomType: string;
  status: "confirmed";
  confirmationNumber: string;
  imageUrl?: string;
  firstName?: string;
  hasInstantBookOptions?: boolean;
  instantBookOffer?: {
    renderableItineraryOffer: RenderableItineraryOffer;
    itineraryOfferIndex: number;
  };
  bifrostItinerarySummary?: {
    title: string;
    description: string;
    highlights: string[];
  };
}

interface InProgressItinerary {
  destination: string;
  dates: string;
  guests: number;
  currentStep: number;
  totalSteps: number;
  lastUpdated: string;
}

interface SpecialOffer {
  hotelName: string;
  offerName: string;
  validUntil: string;
  discount: string;
  originalPrice: string;
  discountedPrice: string;
}

export interface BookingDrawerProps {
  type: DrawerType;
  data: CompletedItinerary | InProgressItinerary | SpecialOffer;
  onClose?: () => void;
  isLoggedIn?: boolean;
  onButtonClick?: () => void;
  isFromModal?: boolean;
  firstName?: string;
}

export const BookingDrawer: React.FC<BookingDrawerProps> = ({
  type,
  data,
  onClose,
  isLoggedIn = false,
  onButtonClick,
  isFromModal = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    if (isFromModal) {
      if (!isLoggedIn) {
        onButtonClick?.();
        return;
      }
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const renderContent = () => {
    switch (type) {
      case "completed-itinerary":
        const completedData = data as CompletedItinerary;
        const [startMonth, startDay, startYear] = completedData.dates
          .split(" - ")[0]
          .split("/");
        const [endMonth, endDay, endYear] = completedData.dates
          .split(" - ")[1]
          .split("/");

        return (
          <>
            <PendingItineraryPlannerHeader
              renderablePendingItinerary={{
                itineraryName:
                  completedData.bifrostItinerarySummary?.title ||
                  "Your Confirmed Itinerary",
                countOfHotelRoomsInItinerary: 1,
                calendarDateRangeInItinerary: {
                  startCalendarDate: {
                    year: parseInt(startYear),
                    month: parseInt(startMonth),
                    day: parseInt(startDay),
                  },
                  endCalendarDate: {
                    year: parseInt(endYear),
                    month: parseInt(endMonth),
                    day: parseInt(endDay),
                  },
                },
                itineraryImageUrl:
                  completedData.imageUrl ||
                  "https://www.bestambiance.com/wp-content/uploads/2022/09/cwo4c5et7jyz-aspect-ratio-800-800.jpg",
                guestFirstName: completedData.firstName || "Guest",
              }}
            />

            {completedData.hasInstantBookOptions ? (
              <InstantBookPlaceholder>
                Instant Book Offers Go Here
              </InstantBookPlaceholder>
            ) : (
              <StatusBox>
                Thank you for submitting your inquiry. Jason from Knollcroft
                will be in touch soon.
              </StatusBox>
            )}

            <ButtonContainer>
              <Button onClick={() => setIsOpen(false)} $variant="secondary">
                Close
              </Button>
              <Button onClick={() => console.log("View itinerary")}>
                View Itinerary
              </Button>
            </ButtonContainer>
          </>
        );

      case "in-progress":
        const inProgressData = data as InProgressItinerary;
        return (
          <>
            <DrawerTitle>Continue Planning Your Trip</DrawerTitle>
            <DrawerDescription>
              You're on step {inProgressData.currentStep} of{" "}
              {inProgressData.totalSteps}
            </DrawerDescription>
            <ProgressIndicator>
              {Array.from({ length: inProgressData.totalSteps }).map((_, i) => (
                <ProgressDot key={i} $active={i < inProgressData.currentStep} />
              ))}
            </ProgressIndicator>
            <BookingDetails>
              <DetailRow>
                <DetailLabel>Destination:</DetailLabel>
                <DetailValue>{inProgressData.destination}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Dates:</DetailLabel>
                <DetailValue>{inProgressData.dates}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Guests:</DetailLabel>
                <DetailValue>{inProgressData.guests} persons</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Last Updated:</DetailLabel>
                <DetailValue>{inProgressData.lastUpdated}</DetailValue>
              </DetailRow>
            </BookingDetails>
            <ButtonContainer>
              <Button onClick={() => setIsOpen(false)} $variant="secondary">
                Save for Later
              </Button>
              <Button onClick={() => console.log("Continue planning")}>
                Continue Planning
              </Button>
            </ButtonContainer>
          </>
        );

      case "special-offer":
        const offerData = data as SpecialOffer;
        return (
          <>
            <SpecialOffer
              title={offerData.offerName}
              description="Experience luxury at its finest with our exclusive package. Limited time offer available now."
              imageUrl="https://www.bestambiance.com/wp-content/uploads/2022/09/cwo4c5et7jyz-aspect-ratio-800-800.jpg"
              originalPrice={offerData.originalPrice}
              discountedPrice={offerData.discountedPrice}
              discount={offerData.discount}
              validUntil={offerData.validUntil}
            />
            <ButtonContainer>
              <Button onClick={() => setIsOpen(false)} $variant="secondary">
                Maybe Later
              </Button>
              <Button onClick={() => console.log("View offer")}>
                View Offer
              </Button>
            </ButtonContainer>
          </>
        );
    }
  };

  return (
    <>
      <BifrostDrawerButton
        onClick={handleButtonClick}
        type={type}
        data={data}
        isPersistent={true}
        shouldOpenModal={isFromModal && !isLoggedIn}
      />

      {isOpen && (
        <>
          <DrawerOverlay onClick={handleClose} />
          <DrawerContent $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleClose} aria-label="Close drawer" />
            <DrawerHeader>
              <HeaderLogo>
                {Array.from({ length: 12 }).map((_, i) => (
                  <LogoLine key={i} />
                ))}
              </HeaderLogo>
              {renderContent()}
            </DrawerHeader>
          </DrawerContent>
        </>
      )}
    </>
  );
};
