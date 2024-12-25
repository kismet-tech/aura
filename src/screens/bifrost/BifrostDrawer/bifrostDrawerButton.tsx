/**
 * WIP: Drawer button component is under development and not ready for use
 * This file contains the BifrostDrawerButton component which will:
 * - Handle different states (completed, in-progress, special offer)
 * - Support persistent and non-persistent modes
 * - Integrate with the modal for login flows
 */

"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DrawerType } from "./bifrostDrawer";

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 50;
`;

const StyledButton = styled.button<{ $type: DrawerType }>`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border: 2px solid
    ${(props) => {
      switch (props.$type) {
        case "completed-itinerary":
          return "#10b981";
        case "special-offer":
          return "#f59e0b";
        default:
          return "#0095f6";
      }
    }};
  color: ${(props) => {
    switch (props.$type) {
      case "completed-itinerary":
        return "#10b981";
      case "special-offer":
        return "#f59e0b";
      default:
        return "#0095f6";
    }
  }};
  padding: 12px 24px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${(props) => {
      switch (props.$type) {
        case "completed-itinerary":
          return "#f0fdf4";
        case "special-offer":
          return "#fef3c7";
        default:
          return "#f0f9ff";
      }
    }};
    border-color: ${(props) => {
      switch (props.$type) {
        case "completed-itinerary":
          return "#059669";
        case "special-offer":
          return "#d97706";
        default:
          return "#0077c7";
      }
    }};
    color: ${(props) => {
      switch (props.$type) {
        case "completed-itinerary":
          return "#059669";
        case "special-offer":
          return "#d97706";
        default:
          return "#0077c7";
      }
    }};
  }
`;

const LogoContainer = styled.div<{ $type: DrawerType }>`
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: ${(props) =>
    `brightness(0) saturate(100%) ${
      props.color
        ? `invert(1) sepia(1) saturate(1) hue-rotate(${props.color}deg)`
        : ""
    }`};
`;

export interface BifrostDrawerButtonProps {
  onClick?: () => void;
  isPersistent?: boolean;
  type: DrawerType;
  data: any;
  shouldOpenModal?: boolean;
  createdByBifrostModal?: boolean;
  firstName?: string;
}

export const BifrostDrawerButton: React.FC<BifrostDrawerButtonProps> = ({
  onClick,
  isPersistent = true,
  type,
  data,
  shouldOpenModal = false,
  createdByBifrostModal = false,
  firstName,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isPersistent) {
      const storedState = localStorage.getItem("bifrostDrawerButtonVisible");
      if (storedState) {
        setIsVisible(JSON.parse(storedState));
      }
    }
  }, [isPersistent]);

  useEffect(() => {
    if (isPersistent) {
      localStorage.setItem(
        "bifrostDrawerButtonVisible",
        JSON.stringify(isVisible)
      );
    }
  }, [isVisible, isPersistent]);

  const getButtonText = () => {
    if (shouldOpenModal) {
      return "Log in to View Offer";
    }

    if (createdByBifrostModal) {
      return firstName ? `${firstName}'s Offer` : "Show Offer";
    }

    switch (type) {
      case "completed-itinerary":
        return "View Your Itinerary";
      case "in-progress":
        return `Continue Planning (Step ${(data as any).currentStep}/${
          (data as any).totalSteps
        })`;
      case "special-offer":
        return `Special Offer: ${(data as any).discount} Off`;
      default:
        return "Resume Booking";
    }
  };

  if (!isVisible) return null;

  return (
    <ButtonContainer>
      <StyledButton onClick={onClick} $type={type}>
        <LogoContainer $type={type}>
          <Logo
            src={"https://storage.googleapis.com/kismet-assets/logoKismet.png"}
            alt="Kismet Logo"
          />
        </LogoContainer>
        {getButtonText()}
      </StyledButton>
    </ButtonContainer>
  );
};
