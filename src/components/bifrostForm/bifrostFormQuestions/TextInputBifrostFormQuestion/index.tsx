import React, { useEffect } from "react";
import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import { RenderableTextInputBifrostFormQuestion } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestion";
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
}

export function TextInputBifrostFormQuestion({
  renderableTextInputBifrostFormQuestion,
  value,
  setValue,
  setIsResponseValid,
}: TextInputBifrostFormQuestionProps) {
  const inputId = `TextInputBifrostFormQuestion_${renderableTextInputBifrostFormQuestion.bifrostFormQuestionId}`;

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: renderableTextInputBifrostFormQuestion.required
        ? value !== ""
        : true,
    });

    // Cleanup function to set `isValid` to true on unmount
    return () => {
      setIsResponseValid({ isResponseValid: true });
    };
  }, [setIsResponseValid]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ updatedValue: event.target.value });

    if (renderableTextInputBifrostFormQuestion.required) {
      setIsResponseValid({ isResponseValid: event.target.value !== "" });
    }
  };

  return (
    <FormField>
      <FormLabel htmlFor={inputId}>
        {renderableTextInputBifrostFormQuestion.label}
      </FormLabel>

      <KismetInput
        onChange={handleOnChange}
        type={"text"}
        id={inputId}
        placeholder={""}
        autoComplete={renderableTextInputBifrostFormQuestion.autocomplete}
        value={value}
      />
    </FormField>
  );
}
