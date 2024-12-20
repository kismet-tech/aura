import React from "react";
import { PendingItineraryPlannerHeader } from "./components/PendingItineraryPlannerHeader";
import { RenderablePendingItinerary } from "./models/RenderablePendingItinerary";
import { ItineraryOfferPresentationBody } from "@/components/workspace/ItineraryOffers/ItineraryOfferPresentation/ItineraryOfferPresentationBody";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
import { NavigationButton } from "@/components/atoms/NavigationButton";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";

export interface PendingItineraryPlannerProps {
  renderablePendingItinerary: RenderablePendingItinerary;
  itineraryOfferId: string;
  renderableItineraryOffers: RenderableItineraryOffer[];
  onClickHotelRoom: ({
    hotelRoomOfferId,
  }: {
    hotelRoomOfferId: string;
  }) => void;
}

export function PendingItineraryPlanner({
  renderablePendingItinerary,
  itineraryOfferId,
  renderableItineraryOffers,
  onClickHotelRoom,
}: PendingItineraryPlannerProps) {
  return (
    <div>
      <PendingItineraryPlannerHeader
        renderablePendingItinerary={renderablePendingItinerary}
      />

      <div>
        <ItineraryOfferPresentationBody
          itineraryOfferId={itineraryOfferId}
          renderableItineraryOffers={renderableItineraryOffers}
          onClickHotelRoom={onClickHotelRoom}
        />
        <div className="flex mt-4">
          <Tabs>
            <TabsList className="flex space-x-2 rounded-xl border border-black p-1">
              <TabsTrigger
                value="Itinerary"
                className="px-4 rounded-xl text-sm font-medium transition-colors data-[state=active]:bg-black data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-black"
              >
                Itinerary
              </TabsTrigger>
              <TabsTrigger
                value="Customize"
                className="px-4 rounded-xl text-sm font-medium transition-colors data-[state=active]:bg-black data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-black"
              >
                Customize
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <NavigationButton
            onClickMoveForward={() => {}}
            isEnabled={true}
            moveForwardChildren={
              <>
                Place hold
                <ArrowRight className="ml-2" />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
