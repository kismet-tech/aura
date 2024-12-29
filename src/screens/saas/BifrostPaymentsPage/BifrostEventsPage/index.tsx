import React from "react";
import { RenderableItineraryEventOffer } from "@kismet_ai/foundation";
import { EventOfferListItem } from "@/components/atoms/EventOfferListItem";

interface BifrostEventsPageProps {
  events: RenderableItineraryEventOffer[];
  variant: "host" | "saas";
  onClickEventOffer: ({ eventOfferId }: { eventOfferId: string }) => void;
  onDescriptionEdit?: (description: string) => void;
  onBack: () => void;
}

export function BifrostEventsPage({
  events,
  variant,
  onClickEventOffer,
  onDescriptionEdit,
  onBack,
}: BifrostEventsPageProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Events</h1>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900"
        >
          Back to Overview
        </button>
      </div>
      
      <div className="space-y-4">
        {events.map((event) => (
          <EventOfferListItem
            key={event.eventOfferId}
            eventOffer={event}
            variant={variant}
            onClick={onClickEventOffer}
            onDescriptionEdit={variant === "host" ? onDescriptionEdit : undefined}
          />
        ))}
      </div>
    </div>
  );
} 