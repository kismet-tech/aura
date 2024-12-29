import React from 'react';

interface ExtraLineItemProps {
  name: string;
  description?: string;
  priceInCents: number;
  onDelete: () => void;
}

export function ExtraLineItem({ name, description, priceInCents, onDelete }: ExtraLineItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        {description && <span className="text-sm text-gray-600">{description}</span>}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">${Math.max(0, priceInCents / 100).toFixed(2)}</span>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
} 