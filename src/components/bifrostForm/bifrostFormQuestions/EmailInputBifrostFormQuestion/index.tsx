import React, { ChangeEventHandler, useEffect, useState } from "react";
import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import { RenderableEmailInputBifrostFormQuestion } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestion";
import { ValidationError } from "@/components/atoms/forms/ValidationError";
import { KismetInput } from "@/components/atoms/KismetInput";

export interface EmailInputBifrostFormQuestionProps {
  renderableEmailInputBifrostFormQuestion: RenderableEmailInputBifrostFormQuestion;
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

export function EmailInputBifrostFormQuestion({
  renderableEmailInputBifrostFormQuestion,
  value,
  setValue,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
}: EmailInputBifrostFormQuestionProps) {
  const inputId: string = `EmailInputBifrostFormQuestion_${renderableEmailInputBifrostFormQuestion.bifrostFormQuestionId}`;

  const isEmailValid = ({ email }: { email: string }): boolean => {
    // Simple email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: renderableEmailInputBifrostFormQuestion.required
        ? isEmailValid({ email: value })
        : value.length === 0 || isEmailValid({ email: value }),
    });

    setHasQuestionBeenRespondedTo({
      hasQuestionBeenRespondedTo: isEmailValid({ email: value }),
    });

    // Cleanup function to set `isValid` to true on unmount
    return () => {
      setIsResponseValid({ isResponseValid: true });
    };
  }, [value, setIsResponseValid, setHasQuestionBeenRespondedTo]);

  const [isLocallyValid, setIsLocallyValid] = useState<boolean>(true);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedValue: string = event.target.value;

    const isValidEmail: boolean = isEmailValid({ email: updatedValue });

    setIsLocallyValid(isValidEmail);
    setIsResponseValid({ isResponseValid: isValidEmail });

    setValue({ updatedValue });
  };

  return (
    <FormField>
      <FormLabel htmlFor={inputId}>
        {renderableEmailInputBifrostFormQuestion.label}
      </FormLabel>

      <KismetInput
        value={value}
        id={inputId}
        placeholder={""}
        type="email"
        autoComplete={renderableEmailInputBifrostFormQuestion.autocomplete}
        onChange={handleOnChange}
      />
      {!isLocallyValid && (
        <ValidationError>Please enter a valid email address</ValidationError>
      )}
    </FormField>
  );
}
