import React from 'react';
import { ChevronDown, ChevronUp, Info, Calendar } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar as CalendarComponent } from "@/components/shadcn/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover";
import { Button } from "@/components/shadcn/button";
import { cn } from "@/lib/utils";

export type PaymentSplitType = 'SINGLE_PAYER' | 'SPLIT_PAYER';

// Add new interface for deposit
export interface Deposit {
  amountInCents: number;
  dueDate: Date | null;
}

interface PlannerFinancialsProps {
  initialPriceInCents?: number;
  initialUndiscountedPriceInCents?: number;
  initialPricePerHourInCents?: number;
  initialAltFoodBevPriceInCents?: number;
  initialDeposits?: Deposit[];
  paymentSplitType: PaymentSplitType;
  hasSelectedVenue?: boolean;
  hasVenueDefaults?: boolean;
  startDateTime?: string;
  onChange?: (values: {
    priceInCents: number;
    undiscountedPriceInCents: number;
    pricePerHourInCents: number;
    altFoodBevPriceInCents: number;
    deposits: Deposit[];
  }) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const PlannerFinancials: React.FC<PlannerFinancialsProps> = ({
  initialPriceInCents = 0,
  initialUndiscountedPriceInCents = 0,
  initialPricePerHourInCents = 0,
  initialAltFoodBevPriceInCents = 0,
  initialDeposits = [{ amountInCents: 0, dueDate: null }],
  paymentSplitType,
  hasSelectedVenue = false,
  hasVenueDefaults = false,
  startDateTime,
  onChange,
  open: controlledOpen,
  onOpenChange
}) => {
  const [isExpanded, setIsExpanded] = React.useState(controlledOpen ?? true);
  const [priceInCents, setPriceInCents] = React.useState<number>(initialPriceInCents);
  const [undiscountedPriceInCents, setUndiscountedPriceInCents] = React.useState<number>(initialUndiscountedPriceInCents);
  const [pricePerHourInCents, setPricePerHourInCents] = React.useState<number>(initialPricePerHourInCents);
  const [altFoodBevPriceInCents, setAltFoodBevPriceInCents] = React.useState<number>(initialAltFoodBevPriceInCents);
  const [deposits, setDeposits] = React.useState<Deposit[]>(initialDeposits);
  const [activeDepositIndex, setActiveDepositIndex] = React.useState<number>(0);
  const [showDepositCalculator, setShowDepositCalculator] = React.useState(false);
  const [depositPercentage, setDepositPercentage] = React.useState(0);
  const [showDepositDueDate, setShowDepositDueDate] = React.useState(false);

  React.useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsExpanded(controlledOpen);
    }
  }, [controlledOpen]);

  const handleExpandedChange = (newExpanded: boolean) => {
    setIsExpanded(newExpanded);
    onOpenChange?.(newExpanded);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseInt(e.target.value) || 0;
    setPriceInCents(newPrice);
    notifyChange({ priceInCents: newPrice });
  };

  const handleUndiscountedPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseInt(e.target.value) || 0;
    setUndiscountedPriceInCents(newPrice);
    notifyChange({ undiscountedPriceInCents: newPrice });
  };

  const handlePricePerHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseInt(e.target.value) || 0;
    setPricePerHourInCents(newPrice);
    notifyChange({ pricePerHourInCents: newPrice });
  };

  const handleAltFoodBevPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseInt(e.target.value) || 0;
    setAltFoodBevPriceInCents(newPrice);
    notifyChange({ altFoodBevPriceInCents: newPrice });
  };

  // Function to add a new deposit
  const addDeposit = () => {
    setDeposits([...deposits, { amountInCents: 0, dueDate: null }]);
    setActiveDepositIndex(deposits.length);
  };

  // Function to update a deposit
  const updateDeposit = (index: number, updates: Partial<Deposit>) => {
    const newDeposits = deposits.map((deposit, i) => 
      i === index ? { ...deposit, ...updates } : deposit
    );
    setDeposits(newDeposits);
    notifyChange({ deposits: newDeposits });
  };

  // Function to remove a deposit
  const removeDeposit = (index: number) => {
    const newDeposits = deposits.filter((_, i) => i !== index);
    setDeposits(newDeposits);
    setActiveDepositIndex(Math.max(0, index - 1));
    notifyChange({ deposits: newDeposits });
  };

  const notifyChange = (partialValues: Partial<Parameters<NonNullable<typeof onChange>>[0]>) => {
    onChange?.({
      priceInCents,
      undiscountedPriceInCents,
      pricePerHourInCents,
      altFoodBevPriceInCents,
      deposits,
      ...partialValues
    });
  };

  // Format number with commas
  const formatNumberWithCommas = (value: number) => {
    return value.toLocaleString('en-US');
  };

  // Format price for display
  const formatPrice = (cents: number) => {
    const dollars = cents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(dollars);
  };

  // Format input value for display
  const formatInputValue = (cents: number) => {
    return formatNumberWithCommas(cents / 100);
  };

  // Parse input value to cents
  const parseInputValue = (value: string) => {
    const cleanValue = value.replace(/,/g, '');
    const dollars = parseFloat(cleanValue) || 0;
    return Math.round(dollars * 100);
  };

  // Format summary text
  const summaryText = React.useMemo(() => {
    const parts = [
      formatPrice(priceInCents),
      undiscountedPriceInCents > priceInCents ? `(${formatPrice(undiscountedPriceInCents)} before discount)` : null,
      pricePerHourInCents ? `${formatPrice(pricePerHourInCents)}/hr` : null,
      altFoodBevPriceInCents ? `+${formatPrice(altFoodBevPriceInCents)} F&B` : null,
      paymentSplitType === 'SPLIT_PAYER' ? '(Split Payment)' : null
    ].filter(Boolean);

    return parts.join(' ');
  }, [priceInCents, undiscountedPriceInCents, pricePerHourInCents, altFoodBevPriceInCents, paymentSplitType]);

  // Get action text based on state
  const actionText = React.useMemo(() => {
    if (isExpanded) return 'close';
    return priceInCents === 0 ? 'add' : 'edit';
  }, [isExpanded, priceInCents]);

  // Calculate preset dates
  const getPresetDates = () => {
    const today = new Date();
    const eventDate = startDateTime ? new Date(startDateTime) : new Date();
    
    return {
      fourteenDays: new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000)),
      thirtyDays: new Date(eventDate.getTime() - (30 * 24 * 60 * 60 * 1000)),
      sixtyDays: new Date(eventDate.getTime() - (60 * 24 * 60 * 60 * 1000)),
      ninetyDays: new Date(eventDate.getTime() - (90 * 24 * 60 * 60 * 1000))
    };
  };

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

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
          <h3 className="text-lg font-medium text-gray-900">Financials:</h3>
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
        <div className="space-y-4">
          <div className="space-y-8">
            {/* Rental Fee Section */}
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Rental Fee
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 text-base">$</span>
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9,]*"
                      value={formatInputValue(priceInCents)}
                      onChange={(e) => {
                        const cents = parseInputValue(e.target.value);
                        setPriceInCents(cents);
                        notifyChange({ priceInCents: cents });
                      }}
                      className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 text-base bg-white shadow-sm"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* F&B Section */}
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    F&B Minimum
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 text-base">$</span>
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9,]*"
                      value={formatInputValue(altFoodBevPriceInCents)}
                      onChange={(e) => {
                        const cents = parseInputValue(e.target.value);
                        setAltFoodBevPriceInCents(cents);
                        notifyChange({ altFoodBevPriceInCents: cents });
                      }}
                      className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 text-base bg-white shadow-sm"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Deposit Section */}
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Deposit Amount
                  </label>
                  {deposits.length > 1 && (
                    <>
                      <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                        <div className="text-sm text-gray-600 space-y-1">
                          {deposits.map((deposit, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span>Deposit {index + 1}:</span>
                              <div className="flex items-center gap-4">
                                <span>{formatPrice(deposit.amountInCents)}</span>
                                <span className="text-gray-400">
                                  {deposit.dueDate ? `Due ${formatDate(deposit.dueDate)}` : 'No due date'}
                                </span>
                              </div>
                            </div>
                          ))}
                          <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between items-center font-medium">
                            <span>Total Deposits:</span>
                            <span>{formatPrice(deposits.reduce((sum, d) => sum + d.amountInCents, 0))}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-4">
                        {deposits.map((_, index) => (
                          <div key={index} className="relative group">
                            <button
                              type="button"
                              onClick={() => setActiveDepositIndex(index)}
                              className={`px-2 py-1 text-xs rounded-full ${
                                index === activeDepositIndex
                                  ? "bg-gray-900 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              Deposit {index + 1}
                            </button>
                            {deposits.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeDeposit(index)}
                                className="absolute -top-1 -right-1 hidden group-hover:flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addDeposit}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
                        >
                          + Add Deposit
                        </button>
                      </div>
                    </>
                  )}
                  {deposits.length === 1 && (
                    <button
                      type="button"
                      onClick={addDeposit}
                      className="mb-4 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                      + Add Another Deposit
                    </button>
                  )}
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 text-base">$</span>
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9,]*"
                      value={formatInputValue(deposits[activeDepositIndex].amountInCents)}
                      onChange={(e) => {
                        const cents = parseInputValue(e.target.value);
                        updateDeposit(activeDepositIndex, { amountInCents: cents });
                      }}
                      onFocus={() => setShowDepositCalculator(true)}
                      className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 text-base bg-white shadow-sm"
                      placeholder="0"
                    />
                  </div>
                  {showDepositCalculator && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={depositPercentage}
                            onFocus={(e) => e.target.value = ''}
                            onBlur={(e) => {
                              if (e.target.value === '') {
                                setDepositPercentage(0);
                              }
                              setTimeout(() => {
                                setShowDepositCalculator(false);
                              }, 200);
                            }}
                            onChange={(e) => {
                              const percent = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                              setDepositPercentage(percent);
                              const totalInCents = priceInCents + altFoodBevPriceInCents;
                              const newDepositAmount = Math.round(totalInCents * (percent / 100));
                              updateDeposit(activeDepositIndex, { amountInCents: newDepositAmount });
                              notifyChange({ deposits: deposits });
                            }}
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md"
                          />
                          <span className="text-sm text-gray-600">% of total amount</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatPrice(priceInCents + altFoodBevPriceInCents)} total × {depositPercentage}% = {formatPrice(deposits[activeDepositIndex].amountInCents)}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Deposit Due Date */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-700">
                        Due Date
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowDepositDueDate(!showDepositDueDate)}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        {deposits[activeDepositIndex].dueDate ? formatDate(deposits[activeDepositIndex].dueDate) : 'Select date'}
                      </button>
                    </div>
                    
                    {showDepositDueDate && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                updateDeposit(activeDepositIndex, { dueDate: getPresetDates().fourteenDays });
                                setShowDepositDueDate(false);
                              }}
                              className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                              14 days from today
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                updateDeposit(activeDepositIndex, { dueDate: getPresetDates().thirtyDays });
                                setShowDepositDueDate(false);
                              }}
                              disabled={!startDateTime}
                              className={`px-3 py-2 text-sm border border-gray-300 rounded-md ${
                                startDateTime 
                                  ? "text-gray-700 bg-white hover:bg-gray-50"
                                  : "text-gray-400 bg-gray-50 cursor-not-allowed"
                              }`}
                            >
                              30 days before event
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                updateDeposit(activeDepositIndex, { dueDate: getPresetDates().sixtyDays });
                                setShowDepositDueDate(false);
                              }}
                              disabled={!startDateTime}
                              className={`px-3 py-2 text-sm border border-gray-300 rounded-md ${
                                startDateTime 
                                  ? "text-gray-700 bg-white hover:bg-gray-50"
                                  : "text-gray-400 bg-gray-50 cursor-not-allowed"
                              }`}
                            >
                              60 days before event
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                updateDeposit(activeDepositIndex, { dueDate: getPresetDates().ninetyDays });
                                setShowDepositDueDate(false);
                              }}
                              disabled={!startDateTime}
                              className={`px-3 py-2 text-sm border border-gray-300 rounded-md ${
                                startDateTime 
                                  ? "text-gray-700 bg-white hover:bg-gray-50"
                                  : "text-gray-400 bg-gray-50 cursor-not-allowed"
                              }`}
                            >
                              90 days before event
                            </button>
                          </div>
                          
                          <div className="pt-4 border-t border-gray-200">
                            <div className="flex flex-col space-y-2">
                              <label className="text-sm font-medium text-gray-700">
                                Or select a specific date:
                              </label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "justify-start text-left font-normal",
                                      !deposits[activeDepositIndex].dueDate && "text-muted-foreground"
                                    )}
                                  >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {deposits[activeDepositIndex].dueDate ? formatDate(deposits[activeDepositIndex].dueDate) : "Pick a date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent
                                    mode="single"
                                    selected={deposits[activeDepositIndex].dueDate ?? undefined}
                                    onSelect={(date) => {
                                      if (date instanceof Date) {
                                        updateDeposit(activeDepositIndex, { dueDate: date });
                                        setShowDepositDueDate(false);
                                      }
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payer Section */}
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Select Payer
                    </label>
                    <span className="text-xs text-gray-500">(Coming Soon)</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-500 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Account or Guest responsible for payment</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <select
                    disabled
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                  >
                    <option>Select a payer...</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 