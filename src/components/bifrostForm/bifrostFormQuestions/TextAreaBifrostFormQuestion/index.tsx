import React, { useEffect } from "react";
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
}

export function TextAreaBifrostFormQuestion({
  renderableTextAreaBifrostFormQuestion,
  value,
  setValue,
  setIsResponseValid,
}: TextAreaBifrostFormQuestionProps) {
  const inputId: string = `TextAreaBifrostFormQuestion_${renderableTextAreaBifrostFormQuestion.bifrostFormQuestionId}`;

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: renderableTextAreaBifrostFormQuestion.required
        ? value !== ""
        : true,
    });

    // Cleanup function to set `isValid` to true on unmount
    return () => {
      setIsResponseValid({ isResponseValid: true });
    };
  }, [setIsResponseValid]);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue({ updatedValue: event.target.value });

    if (renderableTextAreaBifrostFormQuestion.required) {
      setIsResponseValid({ isResponseValid: event.target.value !== "" });
    }
  };

  return (
    <FormField>
      <KismetSectionHeader>
        {renderableTextAreaBifrostFormQuestion.label}
      </KismetSectionHeader>

      <textarea
        onChange={handleOnChange}
        id={inputId}
        placeholder={""}
        value={value}
        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </FormField>
  );
}
