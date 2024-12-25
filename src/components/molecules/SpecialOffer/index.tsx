/**
 * WIP: Special Offer component is under development and not ready for production use
 * This component will display special offers with:
 * - Title and description
 * - Featured image
 * - Price information with discounts
 * - Validity period
 */

import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 16px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  margin: 20px 0;
  border: 1px solid #f0f0f0;
  height: 25vh;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContentSection = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
`;

const TextContent = styled.div`
  flex: 0 0 auto;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1a1a1a;
  line-height: 1.3;
`;

const Description = styled.p`
  font-size: 14px;
  color: #4a4a4a;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  flex: 1;
  min-height: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const PriceSection = styled.div`
  flex: 0 0 auto;
  background: #f8f9fa;
  padding: 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
`;

const OriginalPrice = styled.span`
  font-size: 14px;
  color: #6b7280;
  text-decoration: line-through;
`;

const DiscountedPrice = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #0095f6;
  letter-spacing: -0.02em;
`;

const Discount = styled.span`
  font-size: 14px;
  color: #10b981;
  font-weight: 600;
  background: #ecfdf5;
  padding: 4px 12px;
  border-radius: 100px;
`;

const ValidUntil = styled.p`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
`;

export interface SpecialOfferProps {
  title: string;
  description: string;
  imageUrl: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  validUntil: string;
}

export const SpecialOffer: React.FC<SpecialOfferProps> = ({
  title,
  description,
  imageUrl,
  originalPrice,
  discountedPrice,
  discount,
  validUntil,
}) => {
  return (
    <Container>
      <ContentSection>
        <TextContent>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextContent>
        <ImageContainer>
          <Image src={imageUrl} alt={title} />
        </ImageContainer>
      </ContentSection>
      <PriceSection>
        <PriceContainer>
          <OriginalPrice>{originalPrice}</OriginalPrice>
          <DiscountedPrice>{discountedPrice}</DiscountedPrice>
          <Discount>{discount} off</Discount>
        </PriceContainer>
        <ValidUntil>Valid until {validUntil}</ValidUntil>
      </PriceSection>
    </Container>
  );
};
