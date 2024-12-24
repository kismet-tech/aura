import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px 24px;
  text-align: center;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
  max-width: 380px;
  margin: 0 auto;
`;

interface GreetingSectionProps {
  hotelName: string;
  customMessage?: string;
  guestFirstName?: string;
}

export const GreetingSection: React.FC<GreetingSectionProps> = ({
  hotelName,
  customMessage,
  guestFirstName
}) => {
  const getTitle = () => {
    if (guestFirstName) {
      return `Hi ${guestFirstName}, here's your offer!`;
    }
    return `Welcome to ${hotelName}`;
  };

  const getSubtitle = () => {
    if (customMessage) return customMessage;
    
    if (guestFirstName) {
      return `As discussed in our chat, I've prepared a special offer just for you.`;
    }
    
    return `We're excited to connect with you and share our exclusive offers and updates.`;
  };

  return (
    <Container>
      <Title>{getTitle()}</Title>
      <Subtitle>{getSubtitle()}</Subtitle>
    </Container>
  );
}; 