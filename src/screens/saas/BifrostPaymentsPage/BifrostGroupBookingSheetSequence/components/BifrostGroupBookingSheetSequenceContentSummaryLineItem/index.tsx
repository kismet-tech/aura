import React from "react";
import { Info } from "lucide-react";

interface BifrostGroupBookingSheetSequenceContentSummaryLineItemProps {
  roomCount?: number;
  title: string;
  nights: number;
  dates: string;
  price?: {
    amount: number;
    label: string;
  };
  keyTerms?: string[];
}

export function BifrostGroupBookingSheetSequenceContentSummaryLineItem({
  roomCount,
  title,
  nights,
  dates,
  price,
  keyTerms
}: BifrostGroupBookingSheetSequenceContentSummaryLineItemProps) {
  return (
    <div className="pl-4 border-l border-gray-200">
      <div className="space-y-2 py-2">
        <div className="flex items-start justify-between">
          <div className="flex gap-2">
            {roomCount && (
              <div className="flex items-center justify-center h-6 w-6 bg-gray-100 rounded text-xs font-medium">
                {roomCount}
              </div>
            )}
            <div>
              <div className="font-medium">{title}</div>
              <div className="text-sm text-gray-600">
                {dates} | {nights} Nights
              </div>
            </div>
          </div>
          {price && (
            <div className="text-sm">
              <div>Final Price: ${price.amount.toFixed(2)}</div>
              <div className="text-gray-600">{price.label}</div>
            </div>
          )}
        </div>
        
        {keyTerms && keyTerms.length > 0 && (
          <div className="text-sm">
            <div className="font-medium mb-1">Key Terms:</div>
            <ul className="list-disc pl-4 text-gray-600 space-y-1">
              {keyTerms.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 