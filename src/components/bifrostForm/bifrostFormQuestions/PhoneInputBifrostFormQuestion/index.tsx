import React, { useEffect, useState } from "react";
import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import { RenderablePhoneInputBifrostFormQuestion } from "@kismet_ai/foundation";
import { ValidationError } from "@/components/atoms/forms/ValidationError";
import { KismetInput } from "@/components/atoms/KismetInput";

export interface PhoneInputBifrostFormQuestionProps {
  renderablePhoneInputBifrostFormQuestion: RenderablePhoneInputBifrostFormQuestion;
  value: string;
  setValue: ({ updatedValue }: { updatedValue: string }) => void;
  setIsResponseValid: ({
    isResponseValid,
  }: {
    isResponseValid: boolean;
  }) => void;
  setHasQuestionBeenRespondedTo: ({
    hasQuestionBeenRespondedTo,
  }: {
    hasQuestionBeenRespondedTo: boolean;
  }) => void;
}

const filterPhoneNumberToDigits = ({
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

const formatPhoneNumber = ({
  phoneNumber,
}: {
  phoneNumber: string;
}): string => {
  const digitsOnly = filterPhoneNumberToDigits({ phoneNumber });

  // If no digits, return empty string
  if (!digitsOnly) return "";

  // If the user has typed 3 or fewer digits, just return them
  if (digitsOnly.length <= 3) {
    return digitsOnly;
  }

  // Otherwise, format the string using parentheses and dashes
  return digitsOnly.replace(
    /(\d{0,3})(\d{0,3})(\d{0,4})/,
    (_match, p1, p2, p3) => {
      let result = "";
      if (p1) result += `(${p1}`;
      if (p1 && p1.length === 3) result += `)`;
      if (p2) result += `-${p2}`;
      if (p3) result += `-${p3}`;
      return result;
    }
  );
};

export function PhoneInputBifrostFormQuestion({
  renderablePhoneInputBifrostFormQuestion,
  value,
  setValue,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
}: PhoneInputBifrostFormQuestionProps) {
  console.log(`value: ${value}`);

  const inputId: string = `PhoneInputBifrostFormQuestion_${renderablePhoneInputBifrostFormQuestion.bifrostFormQuestionId}`;

  const [localValue, setLocalValue] = useState<string>("");

  const [isLocallyValid, setIsLocallyValid] = useState<boolean>(true);

  const isPhoneNumberValid = ({
    phoneNumber,
  }: {
    phoneNumber: string;
  }): boolean => {
    const phoneNumberDigits = filterPhoneNumberToDigits({ phoneNumber });
    return phoneNumberDigits.length === 10;
  };

  useEffect(() => {
    if (value) {
      const formattedValue = formatPhoneNumber({ phoneNumber: value });
      setLocalValue(formattedValue);
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

    setHasQuestionBeenRespondedTo({
      hasQuestionBeenRespondedTo: isPhoneNumberValid({ phoneNumber: value }),
    });

    // Cleanup function to set `isValid` to true on unmount
    return () => {
      setIsResponseValid({ isResponseValid: true });
    };
  }, [value, setIsResponseValid, setHasQuestionBeenRespondedTo]);

  const handlePhoneValueChange = ({
    updatedValue,
  }: {
    updatedValue: string;
  }) => {
    const digitsOnly = filterPhoneNumberToDigits({ phoneNumber: updatedValue });
    const formattedNumber = formatPhoneNumber({ phoneNumber: digitsOnly });

    // Format the digits into (###)-###-####

    setIsLocallyValid(isPhoneNumberValid({ phoneNumber: updatedValue }));
    setIsResponseValid({
      isResponseValid: isPhoneNumberValid({ phoneNumber: updatedValue }),
    });

    setLocalValue(formattedNumber);
    setValue({ updatedValue: digitsOnly });
  };

  return (
    <FormField>
      <KismetInput
        value={localValue}
        id={inputId}
        placeholder={""}
        autoComplete={renderablePhoneInputBifrostFormQuestion.autocomplete}
        onChange={(e) => {
          handlePhoneValueChange({ updatedValue: e.target.value });
        }}
      />
      <div className="gap-8">
        <FormLabel htmlFor={inputId}>
          {renderablePhoneInputBifrostFormQuestion.label}
        </FormLabel>
      </div>

      {!isLocallyValid && localValue.length > 0 && (
        <ValidationError>Please enter a valid phone number</ValidationError>
      )}
    </FormField>
  );
}
