import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PlannerGuestsProps {
  initialGuestCount?: number;
  minGuests?: number;
  maxGuests?: number;
  onChange?: (guestCount: number) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const PlannerGuests: React.FC<PlannerGuestsProps> = ({
  initialGuestCount = 0,
  minGuests = 1,
  maxGuests = 1000,
  onChange,
  open: controlledOpen,
  onOpenChange
}) => {
  const [isExpanded, setIsExpanded] = React.useState(controlledOpen ?? true);
  const [guestCount, setGuestCount] = React.useState<number>(initialGuestCount);
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsExpanded(controlledOpen);
    }
  }, [controlledOpen]);

  const handleExpandedChange = (newExpanded: boolean) => {
    setIsExpanded(newExpanded);
    onOpenChange?.(newExpanded);
  };

  // Format summary text
  const summaryText = React.useMemo(() => {
    if (guestCount === 0) return 'No guests specified';
    return `${guestCount} guests`;
  }, [guestCount]);

  // Validate guest count
  const validateGuestCount = (count: number) => {
    if (count < minGuests) {
      setError(`Guest count must be at least ${minGuests}`);
      return false;
    }
    if (count > maxGuests) {
      setError(`Guest count cannot exceed ${maxGuests}`);
      return false;
    }
    setError('');
    return true;
  };

  // Handle guest count change
  const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(e.target.value) || 0;
    if (validateGuestCount(newCount)) {
      setGuestCount(newCount);
      onChange?.(newCount);
    }
  };

  // Get action text based on state
  const actionText = React.useMemo(() => {
    if (isExpanded) return 'close';
    return guestCount === 0 ? 'add' : 'edit';
  }, [isExpanded, guestCount]);

  return (
    <div className="space-y-4">
      <div 
        className="flex flex-col cursor-pointer"
        onClick={() => handleExpandedChange(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Guest Count:</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{actionText}</span>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
        {!isExpanded && (
          <div className="mt-2">
            <span className="text-sm text-gray-600">{summaryText}</span>
          </div>
        )}
      </div>

      {isExpanded && (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Expected Guest Count
            </label>
            <input
              type="number"
              min={minGuests}
              max={maxGuests}
              value={guestCount}
              onChange={handleGuestCountChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}; 