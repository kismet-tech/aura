import React, { useEffect, useState } from "react";
import { FormField } from "@/components/atoms/forms/FormField";
import { RenderableTextAreaBifrostFormQuestion } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestion";
import { KismetSectionHeader } from "@/components/atoms";

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

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue({ updatedValue: event.target.value });

    if (renderableTextAreaBifrostFormQuestion.required) {
      setIsResponseValid({ isResponseValid: event.target.value !== "" });
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <FormField>
      <KismetSectionHeader>
        {renderableTextAreaBifrostFormQuestion.label}
      </KismetSectionHeader>

      <textarea
        onChange={handleOnChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        id={inputId}
        placeholder={""}
        value={value}
        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </FormField>
  );
}
