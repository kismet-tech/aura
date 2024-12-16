import { BifrostFormQuestionMultiStageReasonForTravelResponseValue, RenderableMultiStageReasonForTravelBifrostFormQuestion } from "@kismet_ai/foundation";
import React from "react";
export interface MultiStageReasonForTravelQuestionProps {
    renderableMultiStageReasonForTravelBifrostFormQuestion: RenderableMultiStageReasonForTravelBifrostFormQuestion;
    value: BifrostFormQuestionMultiStageReasonForTravelResponseValue;
    setValue: ({ updatedValue, }: {
        updatedValue: BifrostFormQuestionMultiStageReasonForTravelResponseValue;
    }) => void;
    setIsResponseValid: ({ isResponseValid, }: {
        isResponseValid: boolean;
    }) => void;
    setHasQuestionBeenRespondedTo: ({ hasQuestionBeenRespondedTo, }: {
        hasQuestionBeenRespondedTo: boolean;
    }) => void;
}
export declare function MultiStageReasonForTravelQuestion({ value, setValue, setIsResponseValid, setHasQuestionBeenRespondedTo, }: MultiStageReasonForTravelQuestionProps): React.JSX.Element;
