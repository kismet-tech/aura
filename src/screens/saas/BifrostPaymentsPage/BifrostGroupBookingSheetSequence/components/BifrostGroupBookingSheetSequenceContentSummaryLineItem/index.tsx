import React from "react";
import { Info } from "lucide-react";

interface BifrostGroupBookingSheetSequenceContentSummaryLineItemProps {
  roomCount: number;
  title: string;
  dates: string;
  nights: number;
  price: {
    amount: number;
    label: string;
  };
  keyTerms?: string[];
  termTitle?: string;
  termInfoTip?: string;
  imageUrl?: string;
}

export function BifrostGroupBookingSheetSequenceContentSummaryLineItem({
  roomCount,
  title,
  dates,
  nights,
  price,
  keyTerms = [],
  termTitle = "Room Block Terms",
  termInfoTip = "A room block is a reservation of multiple rooms for a specific event or group. These terms outline the specific conditions and requirements for this group booking.",
  imageUrl = "https://placehold.co/48x48"
}: BifrostGroupBookingSheetSequenceContentSummaryLineItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={`${title} room thumbnail`}
            className="w-12 h-12 rounded object-cover" 
            loading="lazy"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col">
            <div className="flex items-start justify-between">
              <span className="font-medium text-sm">{title}</span>
              <span className="text-sm text-gray-600">Qty: {roomCount}</span>
            </div>
            <div className="text-sm text-gray-600">{dates} | {nights} {nights === 1 ? 'Night' : 'Nights'}</div>
            <div className="text-sm">Final Price: ${price.amount.toLocaleString()} {price.label}</div>
          </div>
        </div>
      </div>
      
      {keyTerms.length > 0 && (
        <div role="complementary" aria-label={termTitle}>
          <div className="flex items-center gap-1 text-sm font-medium mb-1">
            {termTitle}
            <div className="group relative cursor-help">
              <Info className="h-4 w-4 text-gray-500" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-2 text-xs bg-gray-900 text-white rounded shadow-lg">
                {termInfoTip}
              </div>
            </div>
          </div>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            {keyTerms.map((term, index) => (
              <li key={`term-${index}`}>{term}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 