import React from 'react';
import { format, addMinutes, subMinutes, parse, set } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface PlannerDateTimeProps {
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
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 10)),
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
    const timeStr = `${format(startDate, 'h:mm a')}-${format(endDate, 'h:mm a')}`;
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
    return format(date, 'yyyy-MM-dd');
  };

  // Format time for input value
  const formatTimeForInput = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'HH:mm');
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
      setError('End time (including teardown) cannot be more than ten years in the future');
      return false;
    }
    setError('');
    return true;
  };

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    if (!dateStr) {
      setStartDate(null);
      setEndDate(null);
      onChange?.({ 
        startDate: null, 
        endDate: null,
        setupMinutes,
        teardownMinutes
      });
      return;
    }

    const newDate = parse(dateStr, 'yyyy-MM-dd', new Date());
    const newStartDate = startDate ? 
      set(newDate, { 
        hours: startDate.getHours(), 
        minutes: startDate.getMinutes() 
      }) : 
      set(newDate, { hours: 9, minutes: 0 });
    
    const newEndDate = endDate ? 
      set(newDate, { 
        hours: endDate.getHours(), 
        minutes: endDate.getMinutes() 
      }) : 
      set(newDate, { hours: 17, minutes: 0 });

    if (validateDates(newStartDate, newEndDate)) {
      setStartDate(newStartDate);
      setEndDate(newEndDate);
      onChange?.({ 
        startDate: newStartDate, 
        endDate: newEndDate,
        setupMinutes,
        teardownMinutes,
        setupStartDate: newStartDate && setupMinutes && setupMinutes > 0 ? subMinutes(newStartDate, setupMinutes) : undefined,
        teardownEndDate: newEndDate && teardownMinutes && teardownMinutes > 0 ? addMinutes(newEndDate, teardownMinutes) : undefined
      });
    }
  };

  // Handle start time change
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startDate) return;
    
    const timeStr = e.target.value;
    if (!timeStr) return;

    const [hours, minutes] = timeStr.split(':').map(Number);
    const newStartDate = set(startDate, { hours, minutes });
    
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

  // Handle end time change
  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!endDate) return;
    
    const timeStr = e.target.value;
    if (!timeStr) return;

    const [hours, minutes] = timeStr.split(':').map(Number);
    const newEndDate = set(endDate, { hours, minutes });
    
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
        onClick={(e) => {
          e.stopPropagation();
          handleExpandedChange(!isExpanded);
        }}
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
            {/* Event Date */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                value={formatDateForInput(startDate)}
                onChange={handleDateChange}
                min={formatDateForInput(minDate)}
                max={formatDateForInput(maxDate)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Event Times */}
            <div className="grid grid-cols-2 gap-4">
              {/* Start Time */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  value={formatTimeForInput(startDate)}
                  onChange={handleStartTimeChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* End Time */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  value={formatTimeForInput(endDate)}
                  onChange={handleEndTimeChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
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
                    Setup starts: {format(setupStartDate, 'h:mm a')}
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
                    Teardown ends: {format(teardownEndDate, 'h:mm a')}
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
              {((setupMinutes || 0)> 0 || (teardownMinutes || 0) > 0) && (
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