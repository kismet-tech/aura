import { ReservedBifrostReasonForTravelOptionValues } from "@kismet_ai/foundation";
import React from "react";
interface MultiStageReasonForTravelQuestionReasonForTravelCategorySelectorProps {
    value: ReservedBifrostReasonForTravelOptionValues | undefined;
    setValue: ({ updatedValue, }: {
        updatedValue: ReservedBifrostReasonForTravelOptionValues | undefined;
    }) => void;
}
export declare function MultiStageReasonForTravelQuestionReasonForTravelCategorySelector({ value, setValue, }: MultiStageReasonForTravelQuestionReasonForTravelCategorySelectorProps): React.JSX.Element;
export {};
