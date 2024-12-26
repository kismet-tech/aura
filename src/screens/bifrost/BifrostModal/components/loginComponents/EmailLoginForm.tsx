import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 300px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #0095f6;
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
  width: 100%;
  
  ${props => props.$variant === 'secondary' ? `
    background: white;
    color: #333;
    border: 1px solid #ddd;

    &:hover {
      background: #f5f5f5;
    }
  ` : `
    background: #0095f6;
    color: white;
    border: none;

    &:hover {
      opacity: 0.9;
    }
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

interface EmailLoginFormProps {
  onBack: () => void;
  onSubmit: (email: string) => void;
  prefillEmail?: string;
}

export const EmailLoginForm: React.FC<EmailLoginFormProps> = ({
  onBack,
  onSubmit,
  prefillEmail = ''
}) => {
  const [email, setEmail] = useState(prefillEmail);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit(email.trim());
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            autoFocus={!prefillEmail}
          />
        </InputGroup>
        <ButtonGroup>
          <Button type="button" onClick={onBack} $variant="secondary">
            Back
          </Button>
          <Button type="submit">
            Continue
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}; 