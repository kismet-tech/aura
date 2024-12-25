import React from "react";
import { Plus } from "lucide-react";

interface BifrostGroupBookingSheetSequenceCartContentAddCardProps {
  title: string;
  onClick?: () => void;
}

export function BifrostGroupBookingSheetSequenceCartContentAddCard({
  title,
  onClick
}: BifrostGroupBookingSheetSequenceCartContentAddCardProps) {
  return (
    <div 
      className="flex-none w-[120px] h-[120px] cursor-pointer"
      onClick={onClick}
    >
      <div className="h-full flex flex-col items-center justify-center gap-2 border rounded-lg hover:bg-gray-50">
        <Plus className="h-6 w-6 text-gray-400" />
        <span className="text-sm text-gray-600">Add {title}</span>
      </div>
    </div>
  );
} 