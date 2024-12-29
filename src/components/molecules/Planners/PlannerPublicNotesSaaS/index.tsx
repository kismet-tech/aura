import React from 'react';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shadcn/avatar";
import { Button } from "@/components/shadcn/button";

const flashKeyframes = `
  @keyframes flash {
    0%, 100% { background-color: transparent; }
    50% { background-color: rgba(239, 68, 68, 0.1); }
  }
`;

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface PlannerPublicNotesProps {
  initialNotes?: string;
  currentUser?: User;
  onChange?: (notes: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const PlannerPublicNotes: React.FC<PlannerPublicNotesProps> = ({
  initialNotes = '',
  currentUser,
  onChange,
  open: controlledOpen,
  onOpenChange
}) => {
  const [isExpanded, setIsExpanded] = React.useState(controlledOpen ?? true);
  const [notes, setNotes] = React.useState(initialNotes);
  const [hasNewNote, setHasNewNote] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [draftNote, setDraftNote] = React.useState('');

  // Calculate note count
  const noteCount = React.useMemo(() => {
    return notes.split('\n').filter(note => note.trim()).length;
  }, [notes]);

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
    if (!notes) return 'No public notes';
    return notes.length > 50 ? `${notes.slice(0, 50)}...` : notes;
  }, [notes]);

  const handleSubmitNote = () => {
    if (!draftNote.trim()) return;
    
    const newNotes = notes ? `${notes}\n${draftNote}` : draftNote;
    setNotes(newNotes);
    setDraftNote('');
    setHasNewNote(true);
    setTimeout(() => setHasNewNote(false), 2000);
    
    onChange?.(newNotes);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitNote();
    }
  };

  return (
    <div className={`space-y-4 ${hasNewNote ? 'animate-flash' : ''}`}>
      <style>{flashKeyframes}</style>
      <div 
        className="flex flex-col cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleExpandedChange(!isExpanded);
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium text-gray-900">Public Notes</h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {noteCount}
            </span>
          </div>
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
          <div className="mt-2 flex items-start gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={currentUser?.avatarUrl} alt={currentUser?.name} />
              <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">{summaryText}</span>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {notes && (
            <div className="space-y-2 p-3 bg-gray-50 rounded-md">
              {notes.split('\n').map((note, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={currentUser?.avatarUrl} alt={currentUser?.name} />
                    <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">{note}</span>
                </div>
              ))}
            </div>
          )}
          <div className="relative">
            <div className="flex items-start gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={currentUser?.avatarUrl} alt={currentUser?.name} />
                <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={draftNote}
                    onChange={(e) => setDraftNote(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a public note..."
                    className="w-full h-20 px-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Button 
                    onClick={handleSubmitNote}
                    disabled={!draftNote.trim()}
                    className="absolute right-2 bottom-2 h-[25px] w-[25px] p-0 rounded-full"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 