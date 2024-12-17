import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/toggle-group";
import {
  HotelBifrostFormMetadata,
  ReservedBifrostReasonForTravelOptionValues,
} from "@kismet_ai/foundation";
import React from "react";

interface MultiStageReasonForTravelQuestionReasonForTravelCategorySelectorProps {
  bifrostFormMetadata: HotelBifrostFormMetadata;
  value: ReservedBifrostReasonForTravelOptionValues | undefined;
  setValue: ({
    updatedValue,
  }: {
    updatedValue: ReservedBifrostReasonForTravelOptionValues | undefined;
  }) => void;
}

export function MultiStageReasonForTravelQuestionReasonForTravelCategorySelector({
  bifrostFormMetadata,
  value,
  setValue,
}: MultiStageReasonForTravelQuestionReasonForTravelCategorySelectorProps) {
  const labels: Record<ReservedBifrostReasonForTravelOptionValues, string> = {
    [ReservedBifrostReasonForTravelOptionValues.BUSINESS]: "Business",
    [ReservedBifrostReasonForTravelOptionValues.SOCIAL]: "Social",
    [ReservedBifrostReasonForTravelOptionValues.OTHER]: "Other",
    [ReservedBifrostReasonForTravelOptionValues.EXTENDED_STAY]: "Extended Stay",
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
          .filter((option) => {
            if (
              option ===
              ReservedBifrostReasonForTravelOptionValues.EXTENDED_STAY
            ) {
              return bifrostFormMetadata.includeExtendedStay;
            }

            return true;
          })
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
