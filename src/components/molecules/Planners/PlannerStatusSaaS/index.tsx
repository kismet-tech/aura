import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { HotelEventOfferStatus } from "@kismet_ai/foundation";

export interface PlannerStatusProps {
  initialStatus?: HotelEventOfferStatus;
  onChange?: (status: HotelEventOfferStatus) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const STATUS_COLORS: Record<HotelEventOfferStatus, { bg: string; text: string }> = {
  PROSPECT: { bg: 'bg-blue-100', text: 'text-blue-700' },
  TENTATIVE: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  DEFINITIVE: { bg: 'bg-green-100', text: 'text-green-700' },
  CLOSED: { bg: 'bg-gray-100', text: 'text-gray-700' },
  LOST: { bg: 'bg-red-100', text: 'text-red-700' },
  WAITLISTED: { bg: 'bg-purple-100', text: 'text-purple-700' }
};

export const PlannerStatus: React.FC<PlannerStatusProps> = ({
  initialStatus = HotelEventOfferStatus.PROSPECT,
  onChange,
  open: controlledOpen,
  onOpenChange
}) => {
  const [isExpanded, setIsExpanded] = React.useState(controlledOpen ?? true);
  const [status, setStatus] = React.useState<HotelEventOfferStatus>(initialStatus);

  React.useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsExpanded(controlledOpen);
    }
  }, [controlledOpen]);

  const handleExpandedChange = (newExpanded: boolean) => {
    setIsExpanded(newExpanded);
    onOpenChange?.(newExpanded);
  };

  const handleStatusChange = (newStatus: HotelEventOfferStatus) => {
    setStatus(newStatus);
    onChange?.(newStatus);
  };

  // Format summary text
  const summaryText = React.useMemo(() => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  }, [status]);

  // Get action text based on state
  const actionText = React.useMemo(() => {
    if (isExpanded) return 'close';
    return 'edit';
  }, [isExpanded]);

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
          <h3 className="text-lg font-medium text-gray-900">Status:</h3>
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
            <Badge 
              variant="outline" 
              className={`${STATUS_COLORS[status].bg} ${STATUS_COLORS[status].text} border-0`}
            >
              {summaryText}
            </Badge>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(STATUS_COLORS).map((statusKey) => (
            <Badge
              key={statusKey}
              variant="outline"
              className={`
                ${STATUS_COLORS[statusKey as HotelEventOfferStatus].bg} 
                ${STATUS_COLORS[statusKey as HotelEventOfferStatus].text} 
                border-0 cursor-pointer
                ${status === statusKey ? 'ring-2 ring-offset-2' : ''}
              `}
              onClick={() => handleStatusChange(statusKey as HotelEventOfferStatus)}
            >
              {statusKey.charAt(0).toUpperCase() + statusKey.slice(1).toLowerCase()}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}; 