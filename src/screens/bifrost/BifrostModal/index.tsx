import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GreetingSection } from "./components/sections/GreetingSection";
import { PromoSection } from "./components/sections/PromoSection";
import {
  SocialLoginBody,
  SocialPlatform,
} from "./components/loginComponents/SocialLoginBody";
import { BookingDrawer } from "../BifrostDrawer/bifrostDrawer";

/**
 * Bifrost Redirect Code Structure
 * ------------------------------
 * The redirect code is an encrypted string that contains attribution and user context
 * information from AI interactions. The backend should handle encryption/decryption of this data.
 *
 * Backend Implementation Notes:
 * ---------------------------
 * 1. When generating a redirect link:
 *    - Create a record in 'redirect_codes' table with:
 *      * Encrypted code (contains source, campaign, target info)
 *      * User context from AI chat (if exists)
 *      * Creation timestamp
 *
 * 2. When code is detected:
 *    - Decrypt code server-side
 *    - Look up associated AI interaction context
 *    - Return user data (first name) from chat context
 *    - Track attribution data
 *
 * 3. AI Chat Integration:
 *    - Store user context from AI conversations
 *    - Use first name and conversation context for personalization
 *    - Track conversation topics for offer relevance
 *    - Link chat history to user profile upon login
 *
 * Security Notes:
 * --------------
 * - Encrypt all codes to prevent data exposure
 * - Validate codes server-side
 * - Implement rate limiting
 * - Sanitize all stored data
 * - Implement code expiration
 */

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
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
  z-index: 1000;

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

export interface BifrostModalProps {
  isOpen: boolean;
  onClose?: () => void;
  platform?: SocialPlatform;
  redirectCode?: string;
  firstName?: string;
  onLogin?: (method: string, redirectCode?: string) => void;
  isLoggedIn?: boolean;
  prefillEmail?: string;
}

export const BifrostModal: React.FC<BifrostModalProps> = ({
  isOpen,
  onClose,
  platform,
  redirectCode,
  firstName,
  onLogin,
  isLoggedIn = false,
  prefillEmail,
}) => {
  const [localRedirectCode, setLocalRedirectCode] = useState<
    string | undefined
  >(redirectCode);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (code) {
        setLocalRedirectCode(code);
        localStorage.setItem("bifrostRedirectCode", code);
      }
    }
  }, [isOpen]);

  const handleClose = (showDrawerAfterClose: boolean = false) => {
    if (showLoginModal) {
      setShowLoginModal(false);
      setShowDrawer(true);
    } else {
      if (showDrawerAfterClose) {
        setShowDrawer(true);
      }
      onClose?.();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose(true);
    }
  };

  const handleXClick = () => {
    handleClose(true);
  };

  const handleDrawerButtonClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      setShowDrawer(false);
    }
  };

  const handleLoginSuccess = (method: string, code?: string) => {
    setShowLoginModal(false);
    setShowDrawer(true);
    onLogin?.(method, code);
  };

  const renderModalContent = () => (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <CloseButton onClick={handleXClick} aria-label="Close modal" />
        <GreetingSection
          hotelName="Your Hotel"
          customMessage="I'm sending you a personal offer"
          guestFirstName={firstName}
        />
        <PromoSection
          title="Exclusive Hotel Offer"
          description="Book now and receive special member rates"
        />
        <SocialLoginBody
          platform={platform}
          onLogin={handleLoginSuccess}
          redirectCode={localRedirectCode}
          prefillEmail={prefillEmail}
        />
      </ModalContainer>
    </ModalOverlay>
  );

  return <>{(isOpen || showLoginModal) && renderModalContent()}</>;
};
