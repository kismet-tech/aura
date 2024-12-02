import React, { useEffect } from "react";
import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import {
  RenderableToggleButtonGroupBifrostFormQuestion,
  RenderableToggleButtonGroupBifrostFormQuestionOption,
} from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestion";
import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/toggle-group";

export interface ToggleButtonGroupBifrostFormQuestionProps {
  renderableToggleButtonGroupBifrostFormQuestion: RenderableToggleButtonGroupBifrostFormQuestion;
  value: string | undefined;
  setValue: ({ updatedValue }: { updatedValue: string }) => void;
  setIsResponseValid: ({
    isResponseValid,
  }: {
    isResponseValid: boolean;
  }) => void;
}

export function ToggleButtonGroupBifrostFormQuestion({
  renderableToggleButtonGroupBifrostFormQuestion,
  value,
  setValue,
  setIsResponseValid,
}: ToggleButtonGroupBifrostFormQuestionProps) {
  const inputId = `ToggleButtonGroupBifrostFormQuestion_${renderableToggleButtonGroupBifrostFormQuestion.bifrostFormQuestionId}`;

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: renderableToggleButtonGroupBifrostFormQuestion.required
        ? !!value && value !== ""
        : true,
    });

    // Cleanup function to set `isValid` to true on unmount
    return () => {
      setIsResponseValid({ isResponseValid: true });
    };
  }, [setIsResponseValid]);

  const handleOnChange = ({ updatedValue }: { updatedValue: string }) => {
    if (updatedValue === "") {
      setValue({ updatedValue: "" });
    } else {
      setValue({ updatedValue });
    }

    if (renderableToggleButtonGroupBifrostFormQuestion.required) {
      setIsResponseValid({
        isResponseValid: !!updatedValue && updatedValue !== "",
      });
    }
  };

  return (
    <FormField>
      <FormLabel htmlFor={inputId}>
        {renderableToggleButtonGroupBifrostFormQuestion.label}
      </FormLabel>
      <ToggleGroup
        type="single"
        variant="outline"
        value={value}
        onValueChange={(updatedValue: string) =>
          handleOnChange({ updatedValue })
        }
        className="flex w-full space-x-4 py-2"
      >
        {renderableToggleButtonGroupBifrostFormQuestion.options.map(
          (option: RenderableToggleButtonGroupBifrostFormQuestionOption) => {
            return (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                className={
                  value === option.value
                    ? "!bg-black !text-white"
                    : "!bg-white !text-black"
                }
              >
                {option.label}
              </ToggleGroupItem>
            );
          }
        )}
      </ToggleGroup>
    </FormField>
  );
}
