import React from "react";
import { Info } from "lucide-react";

interface BifrostGroupBookingSheetSequenceContentSummaryEventLineItemProps {
  status: 'pending' | 'confirmed';
  title: string;
  date: string;
  time: string;
  capacity: {
    count: number;
    label: string;
  };
  price: {
    amount: number;
    label: string;
  };
  deposits?: Array<{
    id: string;
    name?: string;
    amountInCents: number;
    dueDateISO: string;
    status: 'pending' | 'paid' | 'overdue';
    note?: string;
  }>;
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
  deposits = [],
  keyTerms = [],
  image = "https://placehold.co/48x48"
}: BifrostGroupBookingSheetSequenceContentSummaryEventLineItemProps) {
  const totalDepositAmount = deposits.reduce((sum, deposit) => sum + deposit.amountInCents, 0);
  const nextDueDeposit = deposits
    .filter(d => d.status === 'pending')
    .sort((a, b) => new Date(a.dueDateISO).getTime() - new Date(b.dueDateISO).getTime())[0];

  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        <div className="relative">
          <img 
            src={image} 
            alt={`${title} event thumbnail`}
            className="w-12 h-12 rounded object-cover" 
            loading="lazy"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col">
            <div className="flex items-start justify-between">
              <span className="font-medium text-sm">{title}</span>
              <span className="text-sm text-gray-600">{status === 'confirmed' ? 'Confirmed' : 'Pending'}</span>
            </div>
            <div className="text-sm text-gray-600">{date} | {time}</div>
            <div className="text-sm">
              ${price.amount.toLocaleString()} {price.label}
            </div>
            {nextDueDeposit && (
              <div className="text-xs text-gray-500">
                Next deposit: ${(nextDueDeposit.amountInCents / 100).toLocaleString()} due {new Date(nextDueDeposit.dueDateISO).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {(keyTerms.length > 0 || deposits.length > 0) && (
        <div role="complementary" aria-label="Event Terms">
          <div className="flex items-center gap-1 text-sm font-medium mb-1">
            Event Terms
            <div className="group relative cursor-help">
              <Info className="h-4 w-4 text-gray-500" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-2 text-xs bg-gray-900 text-white rounded shadow-lg">
                Terms and conditions for this event.
              </div>
            </div>
          </div>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            {deposits.map((deposit, index) => (
              <li key={`deposit-${deposit.id}`}>
                {deposit.name || `Deposit ${index + 1}`}: ${(deposit.amountInCents / 100).toLocaleString()} 
                ({deposit.status}) due {new Date(deposit.dueDateISO).toLocaleDateString()}
                {deposit.note && <span className="text-xs ml-1">({deposit.note})</span>}
              </li>
            ))}
            {keyTerms.map((term, index) => (
              <li key={`term-${index}`}>{term}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 