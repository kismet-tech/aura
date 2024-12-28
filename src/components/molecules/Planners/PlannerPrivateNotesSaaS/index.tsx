import React from 'react';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shadcn/avatar";
import { Button } from "@/components/shadcn/button";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface PlannerPrivateNotesProps {
  initialNotes?: string;
  users?: User[];
  onChange?: (notes: string, mentionedUsers?: User[]) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const PlannerPrivateNotes: React.FC<PlannerPrivateNotesProps> = ({
  initialNotes = '',
  users = [],
  onChange,
  open: controlledOpen,
  onOpenChange
}) => {
  const [isExpanded, setIsExpanded] = React.useState(controlledOpen ?? true);
  const [notes, setNotes] = React.useState(initialNotes);
  const [showMentions, setShowMentions] = React.useState(false);
  const [mentionSearch, setMentionSearch] = React.useState('');
  const [cursorPosition, setCursorPosition] = React.useState(0);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [draftNote, setDraftNote] = React.useState('');

  React.useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsExpanded(controlledOpen);
    }
  }, [controlledOpen]);

  const handleExpandedChange = (newExpanded: boolean) => {
    setIsExpanded(newExpanded);
    onOpenChange?.(newExpanded);
  };

  const handleDraftChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDraft = e.target.value;
    const position = e.target.selectionStart;
    setCursorPosition(position);

    // Check if we should show mentions
    const lastChar = newDraft[position - 1];
    const prevChar = newDraft[position - 2];
    if (lastChar === '@' && (!prevChar || prevChar === ' ' || prevChar === '\n')) {
      setShowMentions(true);
      setMentionSearch('');
    } else if (showMentions) {
      // Update mention search if we're already showing mentions
      const mentionText = getMentionText(newDraft, position);
      setMentionSearch(mentionText);
      
      // Hide mentions if we've moved away from the mention context
      if (!mentionText) {
        setShowMentions(false);
      }
    }

    setDraftNote(newDraft);
  };

  const getMentionText = (text: string, position: number): string => {
    let start = position - 1;
    // Look backwards until we find @ or a space/newline
    while (start >= 0 && text[start] !== '@' && text[start] !== ' ' && text[start] !== '\n') {
      start--;
    }
    // If we found an @, return the text between @ and cursor
    if (start >= 0 && text[start] === '@') {
      return text.slice(start + 1, position);
    }
    return '';
  };

  const handleSelectUser = (user: User) => {
    if (!textareaRef.current) return;

    const text = draftNote;
    let start = cursorPosition - 1;
    // Look backwards until we find @ or a space/newline
    while (start >= 0 && text[start] !== '@' && text[start] !== ' ' && text[start] !== '\n') {
      start--;
    }
    // If we found @, replace the mention
    if (start >= 0 && text[start] === '@') {
      const newText = text.slice(0, start) + `@${user.name} ` + text.slice(cursorPosition);
      setDraftNote(newText);
      setShowMentions(false);

      // Set cursor position after the inserted mention
      const newPosition = start + user.name.length + 2; // +2 for @ and space
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(newPosition, newPosition);
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  const extractMentionedUsers = (text: string): User[] => {
    const mentionRegex = /@([a-zA-Z\s]+)/g;
    const matches = text.match(mentionRegex) || [];
    return matches
      .map(match => {
        const name = match.slice(1).trim(); // Remove @ and trim
        return users.find(user => user.name === name);
      })
      .filter((user): user is User => user !== undefined);
  };

  // Format summary text
  const summaryText = React.useMemo(() => {
    if (!notes) return 'No private notes';
    return notes.length > 50 ? `${notes.slice(0, 50)}...` : notes;
  }, [notes]);

  // Filter users based on search
  const filteredUsers = React.useMemo(() => {
    if (!mentionSearch) return users;
    const searchLower = mentionSearch.toLowerCase().trim();
    return users.filter(user => 
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  }, [users, mentionSearch]);

  const handleSubmitNote = () => {
    if (!draftNote.trim()) return;
    
    const newNotes = notes ? `${notes}\n${draftNote}` : draftNote;
    setNotes(newNotes);
    setDraftNote('');
    
    const mentionedUsers = extractMentionedUsers(newNotes);
    onChange?.(newNotes, mentionedUsers);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitNote();
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className="flex flex-col cursor-pointer"
        onClick={() => handleExpandedChange(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Private Notes:</h3>
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
              <AvatarImage src={users[0]?.avatarUrl} alt={users[0]?.name} />
              <AvatarFallback>{users[0]?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">{summaryText}</span>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div className="relative">
            <div className="flex items-start gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={users[0]?.avatarUrl} alt={users[0]?.name} />
                <AvatarFallback>{users[0]?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={draftNote}
                    onChange={handleDraftChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Sales agent notes (use @ to mention team members)"
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
            {showMentions && (
              <div className="absolute left-8 right-12 mt-1 z-10">
                <div className="bg-white rounded-md border border-gray-200 shadow-lg">
                  <Command shouldFilter={false}>
                    <CommandInput 
                      placeholder="Search team members..." 
                      value={mentionSearch}
                      onValueChange={setMentionSearch}
                    />
                    <CommandEmpty>No team members found.</CommandEmpty>
                    <CommandGroup>
                      {filteredUsers.map((user) => (
                        <CommandItem
                          key={user.id}
                          onSelect={() => handleSelectUser(user)}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={user.avatarUrl} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium">{user.name}</span>
                              <span className="text-sm text-gray-500">{user.email}</span>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {notes && (
        <div className="space-y-2 p-3 bg-gray-50 rounded-md">
          {notes.split('\n').map((note, index) => (
            <div key={index} className="flex items-start gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={users[0]?.avatarUrl} alt={users[0]?.name} />
                <AvatarFallback>{users[0]?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">{note}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 