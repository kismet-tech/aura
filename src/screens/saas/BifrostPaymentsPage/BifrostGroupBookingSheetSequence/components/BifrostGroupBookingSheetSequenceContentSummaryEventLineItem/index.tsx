import React from "react";

interface BifrostGroupBookingSheetSequenceContentSummaryEventLineItemProps {
  status?: 'pending';
  title: string;
  date: string;
  time: string;
  capacity?: {
    count: number;
    label: string;
  };
  price: {
    amount: number;
    label: string;
  };
  keyTerms?: string[];
  image?: string;
}

export function BifrostGroupBookingSheetSequenceContentSummaryEventLineItem({
  status,
  title,
  date,
  time,
  capacity,
  price,
  keyTerms,
  image
}: BifrostGroupBookingSheetSequenceContentSummaryEventLineItemProps) {
  return (
    <div className="pl-4 border-l border-gray-200">
      <div className="space-y-2 py-2">
        <div className="flex gap-4">
          {image && (
            <img src={image} alt="" className="h-20 w-20 object-cover rounded" />
          )}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              {status && (
                <span className="px-2 py-0.5 bg-gray-100 rounded text-sm">
                  {status}
                </span>
              )}
              <h4 className="font-medium">{title}</h4>
            </div>
            <div className="text-sm text-gray-600">
              {date}, {time}
            </div>
            {capacity && (
              <div className="text-sm text-purple-700">
                {capacity.count} {capacity.label}
              </div>
            )}
            <div className="text-sm">
              <div>Final Price: ${price.amount.toLocaleString()} {price.label}</div>
            </div>
          </div>
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