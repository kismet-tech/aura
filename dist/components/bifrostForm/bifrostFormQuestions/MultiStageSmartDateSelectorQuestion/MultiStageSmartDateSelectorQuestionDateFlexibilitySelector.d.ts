import { ReservedBifrostDateFlexibilityOptionValues } from "@kismet_ai/foundation";
import React from "react";
interface MultiStageSmartDateSelectorQuestionDateFlexibilitySelectorProps {
    value: ReservedBifrostDateFlexibilityOptionValues | undefined;
    setValue: ({ updatedValue, }: {
        updatedValue: ReservedBifrostDateFlexibilityOptionValues | undefined;
    }) => void;
}
export declare function MultiStageSmartDateSelectorQuestionDateFlexibilitySelector({ value, setValue, }: MultiStageSmartDateSelectorQuestionDateFlexibilitySelectorProps): React.JSX.Element;
export {};
