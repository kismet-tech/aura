import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import { KismetInput } from "@/components/atoms/KismetInput";
import React, { useEffect, useState } from "react";

interface MultiStageReasonForTravelQuestionCompanyNameInputProps {
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

export function MultiStageReasonForTravelQuestionCompanyNameInput({
  value,
  setValue,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
}: MultiStageReasonForTravelQuestionCompanyNameInputProps) {
  const inputId = `TextInputBifrostFormMultiStageReasonForTravelQuestionCompanyNameInput`;

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: value !== "",
    });

    setHasQuestionBeenRespondedTo({
      hasQuestionBeenRespondedTo: !!value && !isFocused,
    });

    return () => {
      setIsResponseValid({ isResponseValid: true });
      setHasQuestionBeenRespondedTo({ hasQuestionBeenRespondedTo: true });
    };
  }, [value, isFocused, setIsResponseValid, setHasQuestionBeenRespondedTo]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ updatedValue: event.target.value });

    setIsResponseValid({ isResponseValid: event.target.value !== "" });
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <FormField>
      <KismetInput
        onChange={handleOnChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={"text"}
        id={inputId}
        placeholder={""}
        value={value}
      />

      <div className="gap-8">
        <FormLabel htmlFor={inputId}>Company</FormLabel>
      </div>
    </FormField>
  );
}
