import React from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type VisibilityType = 'PUBLIC' | 'INVITE_ONLY';
export type PaymentSplitType = 'SINGLE_PAYER' | 'SPLIT_PAYER';

interface PlannerHostProps {
  initialVisibility?: VisibilityType;
  initialPaymentSplitType?: PaymentSplitType;
  onChange?: (values: {
    visibility: VisibilityType;
    paymentSplitType: PaymentSplitType;
  }) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const PlannerHost: React.FC<PlannerHostProps> = ({
  initialVisibility = 'PUBLIC',
  initialPaymentSplitType = 'SINGLE_PAYER',
  onChange,
  open: controlledOpen,
  onOpenChange
}) => {
  const [isExpanded, setIsExpanded] = React.useState(controlledOpen ?? true);
  const [visibility, setVisibility] = React.useState<VisibilityType>(initialVisibility);
  const [paymentSplitType, setPaymentSplitType] = React.useState<PaymentSplitType>(initialPaymentSplitType);

  React.useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsExpanded(controlledOpen);
    }
  }, [controlledOpen]);

  const handleExpandedChange = (newExpanded: boolean) => {
    setIsExpanded(newExpanded);
    onOpenChange?.(newExpanded);
  };

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVisibility = e.target.value as VisibilityType;
    setVisibility(newVisibility);
    notifyChange({ visibility: newVisibility });
  };

  const handlePaymentSplitTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as PaymentSplitType;
    setPaymentSplitType(newType);
    notifyChange({ paymentSplitType: newType });
  };

  const notifyChange = (partialValues: Partial<Parameters<NonNullable<typeof onChange>>[0]>) => {
    onChange?.({
      visibility,
      paymentSplitType,
      ...partialValues
    });
  };

  // Format summary text
  const summaryText = React.useMemo(() => {
    const parts = [
      visibility === 'INVITE_ONLY' ? 'Invite Only' : 'Public',
      paymentSplitType === 'SPLIT_PAYER' ? 'Split Payment' : 'Single Payer'
    ];
    return parts.join(' • ');
  }, [visibility, paymentSplitType]);

  return (
    <div className="space-y-4">
      <div 
        className="flex flex-col cursor-pointer"
        onClick={() => handleExpandedChange(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Host Controls:</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{isExpanded ? 'close' : 'edit'}</span>
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
        <div className="space-y-8">
          {/* Visibility Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Visibility
              </label>
              <select
                value={visibility}
                onChange={handleVisibilityChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="PUBLIC">Public</option>
                <option value="INVITE_ONLY">Invite Only</option>
              </select>
            </div>
          </div>

          {/* Payment Split Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Payment Split Type
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-500 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">When enabled, guests can be charged individually for their portion of the event (e.g., for retreats or group activities)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <select
                value={paymentSplitType}
                onChange={handlePaymentSplitTypeChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="SINGLE_PAYER">Single Payer</option>
                <option value="SPLIT_PAYER">Split Payment</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 