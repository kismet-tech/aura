import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import { KismetInput } from "@/components/atoms/KismetInput";
import React, { useEffect, useState } from "react";

interface MultiStageReasonForTravelQuestionBudgetInputProps {
  value: number | undefined;
  setValue: ({ updatedValue }: { updatedValue: number | undefined }) => void;
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

export function MultiStageReasonForTravelQuestionBudgetInput({
  value,
  setValue,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
}: MultiStageReasonForTravelQuestionBudgetInputProps) {
  const inputId = `TextInputBifrostFormMultiStageReasonForTravelQuestionBudgetInput`;
  const [localValue, setLocalValue] = useState(
    value ? String(value / 100) : ""
  );

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: !!(value && value > 0),
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
    let rawValue = event.target.value;
    console.log("rawValue start", rawValue);
    if (rawValue.length > 1) {
      rawValue = rawValue.replace(/^0+/, "");
    }

    console.log("rawValue end", rawValue);

    const updatedValue = parseInt(rawValue) * 100 || 0;

    console.log("updatedValue", updatedValue);
    setValue({ updatedValue });
    setLocalValue((updatedValue / 100).toString());

    setIsResponseValid({ isResponseValid: updatedValue > 0 });
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    // Remove leading zeros here (or format your number in some custom way).
    let cleaned = localValue.replace(/^0+/, "");
    if (cleaned === "") {
      cleaned = "0";
    }

    const updatedValue = parseInt(cleaned, 10) * 100 || 0;

    setValue({ updatedValue });
    setIsResponseValid({ isResponseValid: updatedValue > 0 });
    setIsFocused(false);
  };

  console.log(`value out here: ${value}`);

  return (
    <FormField>
      <KismetInput
        onChange={handleOnChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={"number"}
        id={inputId}
        placeholder={""}
        value={localValue}
        step={1}
      />

      <div className="gap-8">
        <FormLabel htmlFor={inputId}>Budget</FormLabel>
      </div>
    </FormField>
  );
}
