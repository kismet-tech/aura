import React, { useEffect } from "react";
import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import {
  RenderableSelectorBifrostFormQuestion,
  RenderableSelectorBifrostFormQuestionOption,
} from "@kismet_ai/foundation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

export interface SelectorBifrostFormQuestionProps {
  renderableSelectorBifrostFormQuestion: RenderableSelectorBifrostFormQuestion;
  value: string | undefined;
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

export function SelectorBifrostFormQuestion({
  renderableSelectorBifrostFormQuestion,
  value,
  setValue,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
}: SelectorBifrostFormQuestionProps) {
  const inputId = `SelectorBifrostFormQuestion_${renderableSelectorBifrostFormQuestion.bifrostFormQuestionId}`;

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: renderableSelectorBifrostFormQuestion.required
        ? !!value && value !== ""
        : true,
    });

    setHasQuestionBeenRespondedTo({
      hasQuestionBeenRespondedTo: !!value,
    });

    // Cleanup function to set `isValid` to true on unmount
    return () => {
      // setIsResponseValid({ isResponseValid: true });
      // setHasQuestionBeenRespondedTo({ hasQuestionBeenRespondedTo: true });
    };
  }, [value, setIsResponseValid, setHasQuestionBeenRespondedTo]);

  const handleOnChange = ({ updatedValue }: { updatedValue: string }) => {
    if (updatedValue === "") {
      setValue({ updatedValue: "" });
    } else {
      setValue({ updatedValue });
    }

    if (renderableSelectorBifrostFormQuestion.required) {
      setIsResponseValid({
        isResponseValid: !!updatedValue && updatedValue !== "",
      });
    }
  };

  return (
    <FormField>
      <div className="gap-8">
        <FormLabel htmlFor={inputId}>
          {renderableSelectorBifrostFormQuestion.label}
        </FormLabel>
      </div>

      <Select
        value={value}
        onValueChange={(updatedValue) => {
          handleOnChange({ updatedValue });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={""} />
        </SelectTrigger>

        <SelectContent>
          {renderableSelectorBifrostFormQuestion.options.map(
            (option: RenderableSelectorBifrostFormQuestionOption) => {
              return (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              );
            }
          )}
        </SelectContent>
      </Select>
    </FormField>
  );
}
