import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { cn } from "@/lib/utils";

export interface Option {
  id: string;
  name: string;
}

export interface MultiSelectProps {
  options: Option[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  label?: string;
  placeholder?: string;
  groupLabel?: string;
  itemType?: string; // e.g., "Venue", "Room", "Option"
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedIds,
  onToggle,
  label,
  placeholder,
  groupLabel,
  itemType = "Item" // Default to "Item" if not specified
}) => {
  // Derive labels from itemType if not explicitly provided
  const finalLabel = label || `Select ${itemType}s`;
  const finalPlaceholder = placeholder || `Select ${itemType.toLowerCase()}s...`;
  const finalGroupLabel = groupLabel || `Available ${itemType}s`;
  const selectedLabel = `Selected ${itemType}s:`;

  const getSelectedText = () => {
    const count = selectedIds.length;
    if (count === 0) return finalPlaceholder;
    const type = itemType.toLowerCase();
    return `${count} ${type}${count === 1 ? '' : 's'} selected`;
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{finalLabel}</label>
      <Select
        value={selectedIds[selectedIds.length - 1]}
        onValueChange={onToggle}
      >
        <SelectTrigger className="w-full">
          <SelectValue>
            {getSelectedText()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{finalGroupLabel}</SelectLabel>
            {options.map((option) => (
              <SelectItem
                key={option.id}
                value={option.id}
                className={cn(
                  "flex items-center gap-2 cursor-pointer hover:bg-gray-50",
                  selectedIds.includes(option.id) && "bg-gray-100"
                )}
                onSelect={(e) => {
                  e.preventDefault();
                  onToggle(option.id);
                }}
              >
                <span>{option.name}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {selectedIds.length > 0 && (
        <div className="mt-4">
          <label className="text-sm font-medium">{selectedLabel}</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {selectedIds.map(id => {
              const option = options.find(o => o.id === id);
              return (
                <span 
                  key={id}
                  className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-sm"
                  role="button"
                  onClick={() => onToggle(id)}
                >
                  {option?.name}
                  <button 
                    className="hover:bg-gray-200 rounded-sm p-0.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggle(id);
                    }}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}; 