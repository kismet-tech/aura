import React from "react";
import { ChevronLeft } from "lucide-react";

interface BifrostGroupBookingSheetSequenceSpecialHeaderProps {
  title: string;
  onClickBack: () => void;
}

export function BifrostGroupBookingSheetSequenceSpecialHeader({
  title,
  onClickBack,
}: BifrostGroupBookingSheetSequenceSpecialHeaderProps) {
  return (
    <div className="flex items-center border-b pb-4">
      <button onClick={onClickBack} className="mr-2">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <div className="text-xl font-semibold">{title}</div>
    </div>
  );
} 