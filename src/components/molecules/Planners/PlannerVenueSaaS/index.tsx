import React from 'react';
import { MultiSelect } from '@/components/atoms/MultiSelect';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface VenueOption {
  id: string;
  name: string;
  isUnavailable?: boolean;
  unavailableReason?: string;
  maxCapacity?: number;
}

/**
 * In production, these venue options would be fetched from the backend
 * based on various criteria such as:
 * - Date and time availability
 * - Guest count requirements
 * - Venue capacity
 * - Event type compatibility
 * 
 * This is just mock data for demonstration purposes.
 */
const VENUE_OPTIONS: VenueOption[] = [
  { id: '1', name: 'Ballroom', maxCapacity: 200 },
  { id: '2', name: 'Great Hall', maxCapacity: 100 },
  { id: '3', name: 'Lobby', maxCapacity: 50 },
  { id: '4', name: 'Lounge', maxCapacity: 30 },
  { id: '5', name: 'Meeting Room A', maxCapacity: 20 },
  { id: '6', name: 'Meeting Room B', maxCapacity: 20 }
];

interface PlannerVenueProps {
  initialVenues?: string[];
  guestCount?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onChange?: (venues: string[]) => void;
}

/**
 * PlannerVenue component for selecting event venues
 * Uses the MultiSelect atom component to allow users to select one or more venues
 * The available venues would typically be filtered by the backend based on:
 * - Event date/time
 * - Expected guest count
 * - Venue availability
 * 
 * Note on capacity calculation:
 * When multiple venues are selected for the same event, their capacities are summed.
 * This allows for events that span multiple venues to accommodate larger guest counts.
 * For example, selecting both the Great Hall (100) and Ballroom (200) would allow
 * for events with up to 300 guests.
 */
export const PlannerVenue: React.FC<PlannerVenueProps> = ({
  initialVenues = [],
  guestCount = 0,
  open: controlledOpen,
  onOpenChange,
  onChange
}) => {
  const [isExpanded, setIsExpanded] = React.useState(controlledOpen ?? true);
  const [selectedIds, setSelectedIds] = React.useState<string[]>(initialVenues);

  React.useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsExpanded(controlledOpen);
    }
  }, [controlledOpen]);

  const handleExpandedChange = (newExpanded: boolean) => {
    setIsExpanded(newExpanded);
    onOpenChange?.(newExpanded);
  };

  // Calculate total capacity of currently selected venues
  const totalSelectedCapacity = selectedIds.reduce((sum, id) => {
    const venue = VENUE_OPTIONS.find(v => v.id === id);
    return sum + (venue?.maxCapacity || 0);
  }, 0);

  // Format summary text
  const summaryText = React.useMemo(() => {
    if (selectedIds.length === 0) return 'No venues selected';
    if (selectedIds.length === 1) {
      const venue = VENUE_OPTIONS.find(v => v.id === selectedIds[0]);
      return venue?.name || 'Venue';
    }
    return `${selectedIds.length} venues`;
  }, [selectedIds]);

  const handleToggle = (id: string) => {
    setSelectedIds(current => {
      const newSelection = current.includes(id)
        ? current.filter(currentId => currentId !== id)
        : [...current, id];
      
      onChange?.(newSelection);
      return newSelection;
    });
  };

  // Process venues to mark them as unavailable if the combined capacity can't accommodate the guest count
  const processedOptions = VENUE_OPTIONS.map(venue => {
    // For already selected venues, we only need to check if total capacity is sufficient
    if (selectedIds.includes(venue.id)) {
      const isUnavailable = guestCount > totalSelectedCapacity;
      return {
        ...venue,
        isUnavailable,
        unavailableReason: isUnavailable 
          ? `Combined venue capacity (${totalSelectedCapacity}) insufficient for ${guestCount} guests` 
          : undefined,
        name: isUnavailable 
          ? `${venue.name} (Combined Max: ${totalSelectedCapacity} guests)`
          : venue.name,
        className: isUnavailable 
          ? "text-red-500 cursor-not-allowed opacity-50"
          : undefined
      };
    }

    // For unselected venues, check if adding this venue would provide sufficient capacity
    const potentialTotalCapacity = totalSelectedCapacity + (venue.maxCapacity || 0);
    const isUnavailable = guestCount > potentialTotalCapacity;
    
    return {
      ...venue,
      isUnavailable,
      unavailableReason: isUnavailable 
        ? `Even with this venue, total capacity (${potentialTotalCapacity}) would be insufficient` 
        : undefined,
      name: isUnavailable 
        ? `${venue.name} (Combined Max: ${potentialTotalCapacity} guests)`
        : venue.name,
      className: isUnavailable 
        ? "text-red-500 cursor-not-allowed opacity-50"
        : undefined
    };
  });

  // Get any selected venues that are now unavailable
  const unavailableSelected = processedOptions
    .filter(venue => venue.isUnavailable && selectedIds.includes(venue.id));

  // Get action text based on state
  const actionText = React.useMemo(() => {
    if (isExpanded) return 'close';
    return selectedIds.length === 0 ? 'add' : 'edit';
  }, [isExpanded, selectedIds]);

  return (
    <div className="space-y-4">
      <div 
        className="flex flex-col cursor-pointer"
        onClick={() => handleExpandedChange(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Venue Selection:</h3>
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
          <MultiSelect
            options={processedOptions}
            selectedIds={selectedIds}
            onToggle={handleToggle}
            itemType="Venue"
          />
          
          {selectedIds.length > 0 && (
            <div className="text-sm text-gray-500">
              Total Capacity: {totalSelectedCapacity} guests
            </div>
          )}
          
          {unavailableSelected.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600 font-medium">
                Warning: Selected venues cannot accommodate {guestCount} guests (Total capacity: {totalSelectedCapacity})
              </p>
              <ul className="mt-2 space-y-1">
                {unavailableSelected.map(venue => (
                  <li key={venue.id} className="text-sm text-red-500">
                    {venue.name}: {venue.unavailableReason}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};