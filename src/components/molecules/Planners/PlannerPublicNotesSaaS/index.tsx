import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PlannerPublicNotesProps {
  initialNotes?: string;
  onChange?: (notes: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const PlannerPublicNotes: React.FC<PlannerPublicNotesProps> = ({
  initialNotes = '',
  onChange,
  open: controlledOpen,
  onOpenChange
}) => {
  const [isExpanded, setIsExpanded] = React.useState(controlledOpen ?? true);
  const [notes, setNotes] = React.useState(initialNotes);

  React.useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsExpanded(controlledOpen);
    }
  }, [controlledOpen]);

  const handleExpandedChange = (newExpanded: boolean) => {
    setIsExpanded(newExpanded);
    onOpenChange?.(newExpanded);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    onChange?.(newNotes);
  };

  // Format summary text
  const summaryText = React.useMemo(() => {
    if (!notes) return 'No public notes';
    return notes.length > 50 ? `${notes.slice(0, 50)}...` : notes;
  }, [notes]);

  return (
    <div className="space-y-4">
      <div 
        className="flex flex-col cursor-pointer"
        onClick={() => handleExpandedChange(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Public Notes:</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{isExpanded ? 'close' : 'edit'}</span>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
        {!isExpanded && notes && (
          <div className="mt-2">
            <span className="text-sm text-gray-600">{summaryText}</span>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <textarea
            value={notes}
            onChange={handleNotesChange}
            placeholder="Notes visible to guests"
            className="w-full h-32 px-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}
    </div>
  );
}; 