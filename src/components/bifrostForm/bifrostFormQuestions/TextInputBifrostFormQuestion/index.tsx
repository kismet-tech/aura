import React, { useEffect, useState } from "react";
import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import { RenderableTextInputBifrostFormQuestion } from "@kismet_ai/foundation";
import { KismetInput } from "@/components/atoms/KismetInput";

export interface TextInputBifrostFormQuestionProps {
  renderableTextInputBifrostFormQuestion: RenderableTextInputBifrostFormQuestion;
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

export function TextInputBifrostFormQuestion({
  renderableTextInputBifrostFormQuestion,
  value,
  setValue,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
}: TextInputBifrostFormQuestionProps) {
  const inputId = `TextInputBifrostFormQuestion_${renderableTextInputBifrostFormQuestion.bifrostFormQuestionId}`;

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: renderableTextInputBifrostFormQuestion.required
        ? value !== ""
        : true,
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

    if (renderableTextInputBifrostFormQuestion.required) {
      setIsResponseValid({ isResponseValid: event.target.value !== "" });
    }
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
        autoComplete={renderableTextInputBifrostFormQuestion.autocomplete}
        value={value}
      />

      <div className="gap-8">
        <FormLabel htmlFor={inputId}>
          {renderableTextInputBifrostFormQuestion.label}
        </FormLabel>
      </div>
    </FormField>
  );
}
