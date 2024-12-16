import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/toggle-group";
import { ReservedBifrostReasonForTravelOptionValues } from "@kismet_ai/foundation";
import React from "react";

interface MultiStageReasonForTravelQuestionReasonForTravelCategorySelectorProps {
  value: ReservedBifrostReasonForTravelOptionValues | undefined;
  setValue: ({
    updatedValue,
  }: {
    updatedValue: ReservedBifrostReasonForTravelOptionValues | undefined;
  }) => void;
}

export function MultiStageReasonForTravelQuestionReasonForTravelCategorySelector({
  value,
  setValue,
}: MultiStageReasonForTravelQuestionReasonForTravelCategorySelectorProps) {
  const labels: Record<ReservedBifrostReasonForTravelOptionValues, string> = {
    [ReservedBifrostReasonForTravelOptionValues.BUSINESS]: "Business",
    [ReservedBifrostReasonForTravelOptionValues.SOCIAL]: "Social",
    [ReservedBifrostReasonForTravelOptionValues.OTHER]: "Other",
    [ReservedBifrostReasonForTravelOptionValues.EXTENDED_STAY]: "",
  };

  return (
    <div>
      <ToggleGroup
        type="single"
        variant="outline"
        value={value || ""}
        onValueChange={(
          updatedValue: ReservedBifrostReasonForTravelOptionValues
        ) => setValue({ updatedValue })}
        className="flex w-full py-2"
      >
        {Object.values(ReservedBifrostReasonForTravelOptionValues)
          .filter(
            (option) =>
              option !==
              ReservedBifrostReasonForTravelOptionValues.EXTENDED_STAY
          )
          .map((option: ReservedBifrostReasonForTravelOptionValues) => {
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
          })}
      </ToggleGroup>
    </div>
  );
}
