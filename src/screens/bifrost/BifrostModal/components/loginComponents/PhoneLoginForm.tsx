import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 300px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 8px;

  &:hover {
    color: #333;
  }
`;

const OTPContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
`;

const OTPInput = styled(Input)`
  width: 40px;
  text-align: center;
  padding: 8px;
  font-size: 16px;
`;

interface PhoneLoginFormProps {
  onBack: () => void;
  onSubmit: (phoneNumber: string) => void;
}

export const PhoneLoginForm: React.FC<PhoneLoginFormProps> = ({
  onBack,
  onSubmit
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
    // Here you would typically trigger the OTP send
    onSubmit(phoneNumber);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <Container>
      <BackButton onClick={onBack}>← Back</BackButton>
      
      {step === 'phone' ? (
        <form onSubmit={handlePhoneSubmit}>
          <FormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit" className="w-full mt-4">
            Send Code
          </Button>
        </form>
      ) : (
        <div>
          <FormGroup>
            <Label>Enter verification code</Label>
            <OTPContainer>
              {otp.map((digit, index) => (
                <OTPInput
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  autoFocus={index === 0}
                />
              ))}
            </OTPContainer>
          </FormGroup>
          <Button 
            className="w-full mt-4"
            onClick={() => {
              // Here you would verify the OTP
              console.log('Verifying OTP:', otp.join(''));
            }}
          >
            Verify
          </Button>
        </div>
      )}
    </Container>
  );
}; 