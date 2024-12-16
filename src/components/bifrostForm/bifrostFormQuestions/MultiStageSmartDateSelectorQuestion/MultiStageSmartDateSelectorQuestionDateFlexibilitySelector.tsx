import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/toggle-group";
import { ReservedBifrostDateFlexibilityOptionValues } from "@kismet_ai/foundation";
import React from "react";

interface MultiStageSmartDateSelectorQuestionDateFlexibilitySelectorProps {
  value: ReservedBifrostDateFlexibilityOptionValues | undefined;
  setValue: ({
    updatedValue,
  }: {
    updatedValue: ReservedBifrostDateFlexibilityOptionValues | undefined;
  }) => void;
}

export function MultiStageSmartDateSelectorQuestionDateFlexibilitySelector({
  value,
  setValue,
}: MultiStageSmartDateSelectorQuestionDateFlexibilitySelectorProps) {
  const labels = {
    [ReservedBifrostDateFlexibilityOptionValues.FIRM_DATES]:
      "my dates are firm",
    [ReservedBifrostDateFlexibilityOptionValues.FLEXIBLE_DATES]: "flexible",
    [ReservedBifrostDateFlexibilityOptionValues.STILL_DECIDING]:
      "still deciding",
  };

  return (
    <div>
      <ToggleGroup
        type="single"
        variant="outline"
        value={value || ""}
        onValueChange={(
          updatedValue: ReservedBifrostDateFlexibilityOptionValues
        ) => setValue({ updatedValue })}
        className="flex w-full space-x-4 py-2"
      >
        {Object.values(ReservedBifrostDateFlexibilityOptionValues).map(
          (option: ReservedBifrostDateFlexibilityOptionValues) => {
            return (
              <ToggleGroupItem
                key={option}
                value={option}
                className={
                  value === option
                    ? "!bg-black !text-white"
                    : "!bg-white !text-black"
                }
              >
                {labels[option]}
              </ToggleGroupItem>
            );
          }
        )}
      </ToggleGroup>
    </div>
  );
}
