import { FormField } from "@/components/atoms/forms/FormField";
import { KismetSectionHeader } from "@/components/atoms/KismetSectionHeader";
import { KismetTextArea } from "@/components/atoms/KismetTextArea";
import React, { useEffect, useState } from "react";

interface MultiStageSmartDateSelectorQuestionDescriptionOfPotentialCalendarDatesInputProps {
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

export function MultiStageSmartDateSelectorQuestionDescriptionOfPotentialCalendarDatesInput({
  value,
  setValue,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
}: MultiStageSmartDateSelectorQuestionDescriptionOfPotentialCalendarDatesInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: value !== "",
    });

    setHasQuestionBeenRespondedTo({
      hasQuestionBeenRespondedTo: !!value && !isFocused,
    });

    // Cleanup function to set `isValid` to true on unmount
    return () => {
      setIsResponseValid({ isResponseValid: true });
      setHasQuestionBeenRespondedTo({ hasQuestionBeenRespondedTo: true });
    };
  }, [value, isFocused, setIsResponseValid, setHasQuestionBeenRespondedTo]);

  const handleSetValue = ({ updatedValue }: { updatedValue: string }) => {
    setValue({ updatedValue });

    setIsResponseValid({ isResponseValid: updatedValue !== "" });
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <FormField>
      <KismetSectionHeader>Details</KismetSectionHeader>

      <KismetTextArea
        value={value}
        setValue={({ updatedValue }) => {
          handleSetValue({ updatedValue });
        }}
        placeholder=""
        onFocus={handleFocus}
        onLoseFocus={handleBlur}
      />
    </FormField>
  );
}
