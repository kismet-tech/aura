import React, { useEffect, useState } from "react";
import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import { Input } from "@/components/shadcn/input";
import { RenderablePhoneInputBifrostFormQuestion } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestion";
import { ValidationError } from "@/components/atoms/forms/ValidationError";

export interface PhoneInputBifrostFormQuestionProps {
  renderablePhoneInputBifrostFormQuestion: RenderablePhoneInputBifrostFormQuestion;
  value: string;
  setValue: ({ updatedValue }: { updatedValue: string }) => void;
  setIsResponseValid: ({
    isResponseValid,
  }: {
    isResponseValid: boolean;
  }) => void;
}

export function PhoneInputBifrostFormQuestion({
  renderablePhoneInputBifrostFormQuestion,
  value,
  setValue,
  setIsResponseValid,
}: PhoneInputBifrostFormQuestionProps) {
  const inputId: string = `PhoneInputBifrostFormQuestion_${renderablePhoneInputBifrostFormQuestion.bifrostFormQuestionId}`;

  const [localValue, setLocalValue] = useState<string>("");

  const [isLocallyValid, setIsLocallyValid] = useState<boolean>(true);

  const filterPhoneNumber = ({
    phoneNumber,
  }: {
    phoneNumber: string;
  }): string => {
    let digitsOnly = phoneNumber.replace(/\D/g, "");
    // Remove leading '1' if present
    if (digitsOnly.startsWith("1")) {
      digitsOnly = digitsOnly.substring(1);
    }
    return digitsOnly;
  };

  const isPhoneNumberValid = ({
    phoneNumber,
  }: {
    phoneNumber: string;
  }): boolean => {
    const phoneNumberDigits = filterPhoneNumber({ phoneNumber });
    return phoneNumberDigits.length === 10;
  };

  useEffect(() => {
    if (value) {
      setLocalValue(value);
    } else {
      setLocalValue("");
    }
  }, [value]);

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: renderablePhoneInputBifrostFormQuestion.required
        ? isPhoneNumberValid({ phoneNumber: value })
        : value.length === 0 || isPhoneNumberValid({ phoneNumber: value }),
    });

    // Cleanup function to set `isValid` to true on unmount
    return () => {
      setIsResponseValid({ isResponseValid: true });
    };
  }, [setIsResponseValid]);

  const handlePhoneValueChange = ({
    updatedValue,
  }: {
    updatedValue: string;
  }) => {
    const digitsOnly = filterPhoneNumber({ phoneNumber: updatedValue });

    // Format the digits into (###)-###-####
    let formattedNumber = digitsOnly;
    if (digitsOnly.length > 0) {
      formattedNumber = digitsOnly.replace(
        /(\d{0,3})(\d{0,3})(\d{0,4})/,
        (
          _match: string,
          p1: string | undefined,
          p2: string | undefined,
          p3: string | undefined
        ) => {
          let result = "";
          if (p1) result += `(${p1}`;
          if (p1 && p1.length === 3) result += `)`;
          if (p2) result += `-${p2}`;
          if (p3) result += `-${p3}`;
          return result;
        }
      );
    }

    setIsLocallyValid(isPhoneNumberValid({ phoneNumber: updatedValue }));
    setIsResponseValid({
      isResponseValid: isPhoneNumberValid({ phoneNumber: updatedValue }),
    });

    setLocalValue(formattedNumber);
    setValue({ updatedValue: digitsOnly });
  };

  return (
    <FormField>
      <Input
        value={localValue}
        id={inputId}
        placeholder={""}
        autoComplete={renderablePhoneInputBifrostFormQuestion.autocomplete}
        onChange={(e) => {
          handlePhoneValueChange({ updatedValue: e.target.value });
        }}
        className="bg-white"
      />
      <FormLabel htmlFor={inputId}>
        {renderablePhoneInputBifrostFormQuestion.label}
      </FormLabel>
      {!isLocallyValid && localValue.length > 0 && (
        <ValidationError>Please enter a valid phone number</ValidationError>
      )}
    </FormField>
  );
}
