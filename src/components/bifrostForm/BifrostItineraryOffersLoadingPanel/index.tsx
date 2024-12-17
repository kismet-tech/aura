import { KismetSectionHeader } from "@/components/atoms";
import { RotatingKismetLogo } from "@/components/atoms/icons/RotatingKismetLogo";
import React from "react";

export interface BifrostItineraryOffersLoadingPanelProps {}

export function BifrostItineraryOffersLoadingPanel({}: BifrostItineraryOffersLoadingPanelProps) {
  return (
    <div className="flex items-center space-x-2 border border-black">
      <div className="pl-3">
        <RotatingKismetLogo className="max-h-20" />
      </div>
      <KismetSectionHeader>
        Kismet is checking on instant book offers
      </KismetSectionHeader>
    </div>
  );
}
