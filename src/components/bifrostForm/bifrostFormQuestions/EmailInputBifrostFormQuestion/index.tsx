import React, { ChangeEventHandler, useEffect, useState } from "react";
import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import { Input } from "@/components/shadcn/input";
import { RenderableEmailInputBifrostFormQuestion } from "@/models/BifrostFormQuestions/BifrostFormQuestion";
import { ValidationError } from "@/components/atoms/forms/ValidationError";

export interface EmailInputBifrostFormQuestionProps {
  renderableEmailInputBifrostFormQuestion: RenderableEmailInputBifrostFormQuestion;
  value: string;
  setValue: ({ updatedValue }: { updatedValue: string }) => void;
  setIsResponseValid: ({
    isResponseValid,
  }: {
    isResponseValid: boolean;
  }) => void;
}

export function EmailInputBifrostFormQuestion({
  renderableEmailInputBifrostFormQuestion,
  value,
  setValue,
  setIsResponseValid,
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

    // Cleanup function to set `isValid` to true on unmount
    return () => {
      setIsResponseValid({ isResponseValid: true });
    };
  }, [setIsResponseValid]);

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
      <Input
        value={value}
        id={inputId}
        placeholder={""}
        type="email"
        autoComplete={renderableEmailInputBifrostFormQuestion.autocomplete}
        onChange={handleOnChange}
        className="bg-white"
      />
      <FormLabel htmlFor={inputId}>
        {renderableEmailInputBifrostFormQuestion.label}
      </FormLabel>
      {!isLocallyValid && (
        <ValidationError>Please enter a valid email address</ValidationError>
      )}
    </FormField>
  );
}