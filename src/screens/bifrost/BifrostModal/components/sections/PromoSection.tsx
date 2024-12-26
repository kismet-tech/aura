import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 24px;
  background: #f8f9fa;
  border-bottom: 1px solid #e5e7eb;
`;

const Content = styled.div`
  flex: 1;
  padding: 4px 0;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.4;
  color: #4b5563;
  margin: 0;
`;

const ImageContainer = styled.div`
  width: 160px;
  height: 120px;
  overflow: hidden;
  border-radius: 8px;
  flex-shrink: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface PromoSectionProps {
  title: string;
  description: string;
}

export const PromoSection: React.FC<PromoSectionProps> = ({
  title,
  description,
}) => {
  return (
    <Container>
      <ImageContainer>
        <Image 
          src="https://placehold.co/600x400" 
          alt="Promo Image"
        />
      </ImageContainer>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </Container>
  );
}; 