import React from 'react';
import { format, addMinutes, subMinutes } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PlannerDateTimeProps {
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  initialSetupMinutes?: number | null;
  initialTeardownMinutes?: number | null;
  onChange?: (dates: { 
    startDate: Date | null; 
    endDate: Date | null;
    setupMinutes: number | null;
    teardownMinutes: number | null;
    setupStartDate?: Date;
    teardownEndDate?: Date;
  }) => void;
  minDate?: Date;
  maxDate?: Date;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * PlannerDateTime component for selecting event dates and times
 * Features:
 * - Start and end date/time selection
 * - Optional setup and teardown time buffers
 * - Validation to ensure end is after start
 * - Optional min/max date constraints
 * - Time slot availability checking (to be implemented)
 */
export const PlannerDateTime: React.FC<PlannerDateTimeProps> = ({
  initialStartDate = null,
  initialEndDate = null,
  initialSetupMinutes = null,
  initialTeardownMinutes = null,
  onChange,
  minDate = new Date(),
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  open: controlledOpen,
  onOpenChange
}) => {
  const [isExpanded, setIsExpanded] = React.useState(controlledOpen ?? true);
  const [startDate, setStartDate] = React.useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = React.useState<Date | null>(initialEndDate);
  const [setupMinutes, setSetupMinutes] = React.useState<number | null>(initialSetupMinutes);
  const [teardownMinutes, setTeardownMinutes] = React.useState<number | null>(initialTeardownMinutes);
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
    if (!startDate || !endDate) return 'No date/time selected';
    const dateStr = format(startDate, 'EEEE, MMMM d');
    const timeStr = `${format(startDate, 'h')}-${format(endDate, 'ha').toLowerCase()}`;
    return `${dateStr}, ${timeStr}`;
  }, [startDate, endDate]);

  // Calculate setup and teardown times
  const setupStartDate = React.useMemo(() => {
    if (!startDate || !setupMinutes || setupMinutes <= 0) return undefined;
    return subMinutes(startDate, setupMinutes);
  }, [startDate, setupMinutes]);

  const teardownEndDate = React.useMemo(() => {
    if (!endDate || !teardownMinutes || teardownMinutes <= 0) return undefined;
    return addMinutes(endDate, teardownMinutes);
  }, [endDate, teardownMinutes]);

  // Format date for input value
  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return format(date, "yyyy-MM-dd'T'HH:mm");
  };

  // Validate dates
  const validateDates = (start: Date | null, end: Date | null) => {
    if (!start || !end) return true;
    if (start >= end) {
      setError('End time must be after start time');
      return false;
    }
    
    const effectiveStartDate = setupMinutes && setupMinutes > 0 ? subMinutes(start, setupMinutes) : start;
    const effectiveEndDate = teardownMinutes && teardownMinutes > 0 ? addMinutes(end, teardownMinutes) : end;

    if (effectiveStartDate < minDate) {
      setError('Start time (including setup) cannot be in the past');
      return false;
    }
    if (maxDate && effectiveEndDate > maxDate) {
      setError('End time (including teardown) cannot be more than a year in the future');
      return false;
    }
    setError('');
    return true;
  };

  // Handle start date change
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value ? new Date(e.target.value) : null;
    if (validateDates(newStartDate, endDate)) {
      setStartDate(newStartDate);
      onChange?.({ 
        startDate: newStartDate, 
        endDate,
        setupMinutes,
        teardownMinutes,
        setupStartDate: newStartDate && setupMinutes && setupMinutes > 0 ? subMinutes(newStartDate, setupMinutes) : undefined,
        teardownEndDate: endDate && teardownMinutes && teardownMinutes > 0 ? addMinutes(endDate, teardownMinutes) : undefined
      });
    }
  };

  // Handle end date change
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value ? new Date(e.target.value) : null;
    if (validateDates(startDate, newEndDate)) {
      setEndDate(newEndDate);
      onChange?.({ 
        startDate, 
        endDate: newEndDate,
        setupMinutes,
        teardownMinutes,
        setupStartDate: startDate && setupMinutes && setupMinutes > 0 ? subMinutes(startDate, setupMinutes) : undefined,
        teardownEndDate: newEndDate && teardownMinutes && teardownMinutes > 0 ? addMinutes(newEndDate, teardownMinutes) : undefined
      });
    }
  };

  // Handle setup minutes change
  const handleSetupMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? null : parseInt(e.target.value);
    setSetupMinutes(value);
    if (validateDates(startDate, endDate)) {
      onChange?.({ 
        startDate, 
        endDate,
        setupMinutes: value,
        teardownMinutes,
        setupStartDate: startDate && value && value > 0 ? subMinutes(startDate, value) : undefined,
        teardownEndDate: endDate && teardownMinutes && teardownMinutes > 0 ? addMinutes(endDate, teardownMinutes) : undefined
      });
    }
  };

  // Handle teardown minutes change
  const handleTeardownMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? null : parseInt(e.target.value);
    setTeardownMinutes(value);
    if (validateDates(startDate, endDate)) {
      onChange?.({ 
        startDate, 
        endDate,
        setupMinutes,
        teardownMinutes: value,
        setupStartDate: startDate && setupMinutes && setupMinutes > 0 ? subMinutes(startDate, setupMinutes) : undefined,
        teardownEndDate: endDate && value && value > 0 ? addMinutes(endDate, value) : undefined
      });
    }
  };

  // Check if using default dates
  const isUsingDefaults = React.useMemo(() => {
    return !startDate && !endDate && !setupMinutes && !teardownMinutes;
  }, [startDate, endDate, setupMinutes, teardownMinutes]);

  // Get action text based on state
  const actionText = React.useMemo(() => {
    if (isExpanded) return 'close';
    return isUsingDefaults ? 'add' : 'edit';
  }, [isExpanded, isUsingDefaults]);

  return (
    <div className="space-y-4">
      <div 
        className="flex flex-col cursor-pointer"
        onClick={() => handleExpandedChange(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Date/Time:</h3>
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
          <div className="grid grid-cols-1 gap-4">
            {/* Event Start */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Event Start
              </label>
              <input
                type="datetime-local"
                value={formatDateForInput(startDate)}
                onChange={handleStartDateChange}
                min={formatDateForInput(minDate)}
                max={formatDateForInput(maxDate)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Event End */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Event End
              </label>
              <input
                type="datetime-local"
                value={formatDateForInput(endDate)}
                onChange={handleEndDateChange}
                min={formatDateForInput(startDate || minDate)}
                max={formatDateForInput(maxDate)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Setup and Teardown Times */}
            <div className="grid grid-cols-2 gap-4">
              {/* Setup Time */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Setup Time (mins)
                </label>
                <input
                  type="number"
                  min="0"
                  value={setupMinutes ?? ''}
                  onChange={handleSetupMinutesChange}
                  placeholder="Optional"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {setupStartDate && (
                  <div className="text-sm text-gray-500">
                    Setup starts: {format(setupStartDate, 'HH:mm')}
                  </div>
                )}
              </div>

              {/* Teardown Time */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Teardown Time (mins)
                </label>
                <input
                  type="number"
                  min="0"
                  value={teardownMinutes ?? ''}
                  onChange={handleTeardownMinutesChange}
                  placeholder="Optional"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {teardownEndDate && (
                  <div className="text-sm text-gray-500">
                    Teardown ends: {format(teardownEndDate, 'HH:mm')}
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {startDate && endDate && (
            <div className="text-sm text-gray-500">
              <div>Event Duration: {Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60))} minutes</div>
              {(setupMinutes > 0 || teardownMinutes > 0) && (
                <div>
                  Total Duration (including setup/teardown): {Math.round(
                    ((teardownEndDate?.getTime() || endDate.getTime()) - 
                    (setupStartDate?.getTime() || startDate.getTime())) / (1000 * 60)
                  )} minutes
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}; 