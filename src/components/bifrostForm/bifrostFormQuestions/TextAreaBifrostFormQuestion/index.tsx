import React, { useEffect, useState } from "react";
import { FormField } from "@/components/atoms/forms/FormField";
import { RenderableTextAreaBifrostFormQuestion } from "@kismet_ai/foundation";
import { KismetSectionHeader } from "@/components/atoms";
import { KismetTextArea } from "@/components/atoms/KismetTextArea";

export interface TextAreaBifrostFormQuestionProps {
  renderableTextAreaBifrostFormQuestion: RenderableTextAreaBifrostFormQuestion;
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

export function TextAreaBifrostFormQuestion({
  renderableTextAreaBifrostFormQuestion,
  value,
  setValue,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
}: TextAreaBifrostFormQuestionProps) {
  const inputId: string = `TextAreaBifrostFormQuestion_${renderableTextAreaBifrostFormQuestion.bifrostFormQuestionId}`;

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: renderableTextAreaBifrostFormQuestion.required
        ? value !== ""
        : true,
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

    if (renderableTextAreaBifrostFormQuestion.required) {
      setIsResponseValid({ isResponseValid: updatedValue !== "" });
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <FormField>
      <KismetSectionHeader>
        {renderableTextAreaBifrostFormQuestion.label}
      </KismetSectionHeader>

      <KismetTextArea
        value={value}
        setValue={({ updatedValue }) => {
          handleSetValue({ updatedValue });
        }}
        placeholder=""
        inputId={inputId}
        onFocus={handleFocus}
        onLoseFocus={handleBlur}
      />
    </FormField>
  );
}
