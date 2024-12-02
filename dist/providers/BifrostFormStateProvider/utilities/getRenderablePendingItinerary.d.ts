import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface GetRenderablePendingItineraryProps {
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}
export declare const getRenderablePendingItinerary: ({ bifrostFormQuestionsWithResponses, }: GetRenderablePendingItineraryProps) => RenderablePendingItinerary;
export {};
