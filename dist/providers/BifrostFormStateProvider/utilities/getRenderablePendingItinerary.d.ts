import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";
interface GetRenderablePendingItineraryProps {
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}
export declare const getRenderablePendingItinerary: ({ bifrostFormQuestionsWithResponses, }: GetRenderablePendingItineraryProps) => RenderablePendingItinerary;
export {};
