import React, { useState } from 'react';
import styled from 'styled-components';
import { PhoneLoginForm } from './PhoneLoginForm';
import { EmailLoginForm } from './EmailLoginForm';

const Container = styled.div`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 300px;
`;

const LoginButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.2s ease;
  width: 100%;
  background: ${props => props.$variant === 'secondary' ? '#666' : '#0095f6'};
  
  &:hover {
    opacity: 0.9;
  }

  &[data-platform="Facebook"] {
    background: #1877f2;
  }

  &[data-platform="LinkedIn"] {
    background: #0077b5;
  }

  &[data-platform="Google"] {
    background: #4285f4;
  }

  &[data-platform="Apple"] {
    background: #000;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin: 8px 0;
  gap: 12px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #eee;
  }
`;

const DividerText = styled.span`
  font-size: 12px;
  color: #666;
`;

export type SocialPlatform = 'Facebook' | 'LinkedIn' | 'Google' | 'Apple' | 'Instagram' | 'Twitter';
type LoginMethod = SocialPlatform | 'Email' | 'Phone';

export interface SocialLoginBodyProps {
  platform?: SocialPlatform;
  onLogin: (method: string, redirectCode?: string) => void;
  redirectCode?: string;
  prefillEmail?: string;
}

export const SocialLoginBody: React.FC<SocialLoginBodyProps> = ({
  platform,
  onLogin,
  redirectCode,
  prefillEmail
}) => {
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleLogin = (method: LoginMethod) => {
    if (method === 'Phone') {
      setShowPhoneForm(true);
    } else if (method === 'Email') {
      setShowEmailForm(true);
    } else {
      onLogin(method, redirectCode);
    }
  };

  const handlePhoneSubmit = (phoneNumber: string) => {
    console.log('Phone number submitted:', phoneNumber);
    onLogin('Phone', redirectCode);
  };

  const handleEmailSubmit = (email: string) => {
    console.log('Email submitted:', email);
    onLogin('Email', redirectCode);
  };

  if (showPhoneForm) {
    return (
      <Container>
        <PhoneLoginForm
          onBack={() => setShowPhoneForm(false)}
          onSubmit={handlePhoneSubmit}
        />
      </Container>
    );
  }

  if (showEmailForm) {
    return (
      <Container>
        <EmailLoginForm
          onBack={() => setShowEmailForm(false)}
          onSubmit={handleEmailSubmit}
          prefillEmail={prefillEmail}
        />
      </Container>
    );
  }

  const getPrimaryLoginMethod = (): SocialPlatform | null => {
    if (platform) {
      return platform;
    }
    return null;
  };

  const primaryMethod = getPrimaryLoginMethod();

  return (
    <Container>
      <ButtonsContainer>
        {primaryMethod && (
          <LoginButton 
            data-platform={primaryMethod}
            onClick={() => handleLogin(primaryMethod)}
          >
            Continue with {primaryMethod}
          </LoginButton>
        )}
        
        {!primaryMethod && (
          <>
            <LoginButton 
              data-platform="Google"
              onClick={() => handleLogin('Google')}
            >
              Continue with Google
            </LoginButton>
            <LoginButton 
              data-platform="Facebook"
              onClick={() => handleLogin('Facebook')}
            >
              Continue with Facebook
            </LoginButton>
            <LoginButton 
              data-platform="LinkedIn"
              onClick={() => handleLogin('LinkedIn')}
            >
              Continue with LinkedIn
            </LoginButton>
            <LoginButton 
              data-platform="Apple"
              onClick={() => handleLogin('Apple')}
            >
              Continue with Apple
            </LoginButton>
          </>
        )}

        {primaryMethod && (
          <>
            <Divider>
              <DividerText>or</DividerText>
            </Divider>
            <LoginButton 
              $variant="secondary"
              onClick={() => handleLogin('Email')}
            >
              Continue with {prefillEmail || 'Email'}
            </LoginButton>
            <LoginButton 
              $variant="secondary"
              onClick={() => handleLogin('Phone')}
            >
              Continue with Phone
            </LoginButton>
          </>
        )}
      </ButtonsContainer>
    </Container>
  );
}; 