import React, { useState, useRef } from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { DateRangePicker } from '@/components/atoms/DateRangePicker';
import { PlannerPublicNotes } from '@/components/molecules/Planners/PlannerPublicNotesSaaS';
import { PlannerPrivateNotes } from '@/components/molecules/Planners/PlannerPrivateNotesSaaS';
import type { DateRange as DayPickerDateRange } from 'react-day-picker';

interface IntentMetrics {
  websiteVisits?: number;
  mostRecentVisit?: string;
  lastEmailOpen?: string;
  numberOfContacts?: number;
  researchedHotel?: boolean;
}

interface ReservationDateRange {
  start: string;
  end: string;
  type: 'fixed' | 'flexible' | 'deciding';
  decidingReason?: string;
  alternativeDates?: Array<{ start: string; end: string }>;
}

interface SalesAgent {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

type DateRange = DayPickerDateRange;

interface DateRangePickerProps {
  dateRange?: DateRange;
  setDateRange: (range: DateRange | undefined) => void;
}

interface PlannerPublicNotesProps {
  initialNotes: string;
  currentUser: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onChange: (notes: string) => void;
  open?: boolean;
}

interface PlannerPrivateNotesProps {
  initialNotes: string;
  users: Array<{
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  }>;
  onChange: (notes: string, mentionedUsers?: Array<{ id: string; name: string }>) => void;
  open?: boolean;
}

interface Note {
  content: string;
  userId: string;
  dateCreated: string;
}

export enum QualificationStatus {
  PENDING = 'pending',
  QUALIFIED = 'qualified',
  NOT_QUALIFIED = 'not_qualified'
}

export interface LeadSubsectionProps {
  reservation: {
    isTransient: boolean;
    isLinkedTripleseat?: boolean;
    tripleseatUrl?: string;
    status: string;
    qualificationStatus: QualificationStatus;
    dateRange?: ReservationDateRange;
    assignedSalesAgent: SalesAgent;
    leadScore: number;
    intentScore: number;
    intentMetrics?: IntentMetrics;
    publicNotes: Note[];
    privateNotes: Note[];
  };
  currentUser: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
  teamMembers: Array<{
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  }>;
  onReservationUpdate: (updatedReservation: any) => void;
  onSalesAgentSelect?: (agentId: string) => void;
}

/**
 * @TODO (Julian): Backend Integration
 * Need to map the backend status terms to these frontend display terms:
 * - Backend 'SELECTING' -> Frontend 'tentative'
 * - Backend 'PENDING' -> Frontend 'pending'
 * - Backend 'ACCEPTED' -> Frontend 'confirmed'
 * - Backend 'REJECTED' -> Frontend 'cancelled'
 * - Backend 'RATIFIED' -> Frontend 'confirmed'
 * - Backend 'COMPLETED' -> Frontend 'confirmed'
 * 
 * @TODO (Julian): Intent Score Integration
 * Need to add the following fields to the UserSession model in the schema:
 * - intentScore: Int (0-100)
 * - intentMetrics: Json (or create a new model) containing:
 *   - websiteVisits: Int
 *   - mostRecentVisit: DateTime
 *   - lastEmailOpen: DateTime
 *   - numberOfContacts: Int
 *   - researchedHotel: Boolean
 * 
 * @TODO (Jason): Please confirm if these mappings make sense:
 * - Should 'RATIFIED' and 'COMPLETED' both map to 'confirmed'?
 * - Should we add 'waitlisted' as a possible status?
 * - Should we add 'lost' as a possible status?
 */
const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  confirmed: { bg: 'bg-green-100', text: 'text-green-700' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700' },
  tentative: { bg: 'bg-blue-100', text: 'text-blue-700' },
  lost: { bg: 'bg-gray-100', text: 'text-gray-700' },
  waitlisted: { bg: 'bg-purple-100', text: 'text-purple-700' }
};

const QUALIFICATION_COLORS: Record<QualificationStatus, { bg: string; text: string }> = {
  [QualificationStatus.PENDING]: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  [QualificationStatus.QUALIFIED]: { bg: 'bg-green-100', text: 'text-green-800' },
  [QualificationStatus.NOT_QUALIFIED]: { bg: 'bg-red-100', text: 'text-red-800' }
};

const DATE_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  fixed: { bg: 'bg-blue-100', text: 'text-blue-800' },
  flexible: { bg: 'bg-green-100', text: 'text-green-800' },
  deciding: { bg: 'bg-yellow-100', text: 'text-yellow-800' }
};

const renderStars = (score: number, onChange: (rating: number) => void) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(rating)}
          className="focus:outline-none"
        >
          <svg
            className={`h-5 w-5 ${
              rating <= score ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

export const LeadSubsection: React.FC<LeadSubsectionProps> = ({
  reservation,
  currentUser,
  teamMembers,
  onReservationUpdate,
  onSalesAgentSelect,
}) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [showSalesAgentDropdown, setShowSalesAgentDropdown] = useState(false);
  const [salesAgentSearchValue, setSalesAgentSearchValue] = useState("");
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [hasNewNote, setHasNewNote] = useState(false);
  const [isGroupReservationExpanded, setIsGroupReservationExpanded] = useState(false);
  const groupReservationContentRef = useRef<HTMLDivElement>(null);

  const handleDateRangeUpdate = (dateRange: DateRange | undefined) => {
    if (!dateRange?.from || !dateRange?.to) return;

    onReservationUpdate({
      ...reservation,
      dateRange: {
        ...reservation.dateRange,
        start: dateRange.from.toISOString().split('T')[0],
        end: dateRange.to.toISOString().split('T')[0],
      },
    });
  };

  const handleDateTypeChange = () => {
    const currentType = reservation.dateRange?.type || 'fixed';
    const types = ['fixed', 'flexible', 'deciding'];
    const nextType = types[(types.indexOf(currentType) + 1) % types.length];

    onReservationUpdate({
      ...reservation,
      dateRange: {
        ...reservation.dateRange,
        type: nextType,
      },
    });
  };

  const handleAddAlternativeDates = () => {
    if (!reservation.dateRange) return;

    const newAlternativeDates = [
      ...(reservation.dateRange.alternativeDates || []),
      {
        start: reservation.dateRange.start,
        end: reservation.dateRange.end,
      },
    ];

    onReservationUpdate({
      ...reservation,
      dateRange: {
        ...reservation.dateRange,
        alternativeDates: newAlternativeDates,
      },
    });
  };

  const handleNotesChange = (notes: string, type: 'public' | 'private') => {
    const newNote: Note = {
      content: notes,
      userId: currentUser.id,
      dateCreated: new Date().toISOString()
    };

    onReservationUpdate({
      ...reservation,
      [type === 'public' ? 'publicNotes' : 'privateNotes']: [
        ...reservation[type === 'public' ? 'publicNotes' : 'privateNotes'],
        newNote
      ],
    });
    setHasNewNote(true);
    setTimeout(() => setHasNewNote(false), 1000);
  };

  const filteredSalesAgents = teamMembers.filter((agent) =>
    agent.name.toLowerCase().includes(salesAgentSearchValue.toLowerCase()) ||
    agent.email.toLowerCase().includes(salesAgentSearchValue.toLowerCase())
  );

  const notesCount = reservation.publicNotes.length + reservation.privateNotes.length;

  const pickerDateRange = reservation.dateRange ? {
    from: new Date(reservation.dateRange.start),
    to: new Date(reservation.dateRange.end)
  } : undefined;

  const handleLeadScoreChange = (rating: number) => {
    onReservationUpdate({
      ...reservation,
      leadScore: rating
    });
  };

  // Map backend status to frontend display status
  const getDisplayStatus = (backendStatus: string): string => {
    const statusMap: Record<string, string> = {
      'SELECTING': 'tentative',
      'PENDING': 'pending',
      'ACCEPTED': 'confirmed',
      'REJECTED': 'cancelled',
      'RATIFIED': 'confirmed',
      'COMPLETED': 'confirmed'
    };
    return statusMap[backendStatus] || backendStatus.toLowerCase();
  };

  // Map frontend display status back to backend status
  const getBackendStatus = (displayStatus: string): string => {
    // For now, we'll map 'confirmed' to 'ACCEPTED' but this might need adjustment
    const reverseStatusMap: Record<string, string> = {
      'tentative': 'SELECTING',
      'pending': 'PENDING',
      'confirmed': 'ACCEPTED',
      'cancelled': 'REJECTED',
      'lost': 'REJECTED',
      'waitlisted': 'PENDING'
    };
    return reverseStatusMap[displayStatus] || displayStatus.toUpperCase();
  };

  const getIntentLabel = (score: number): string => {
    if (score >= 80) return 'Very High';
    if (score >= 60) return 'High';
    if (score >= 40) return 'Medium';
    if (score >= 20) return 'Low';
    return 'Very Low';
  };

  return (
    <section className="bg-white rounded-lg shadow p-6 relative">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {reservation.isTransient ? 'Transient Booking Details' : 'Group Booking Details'}
        </h2>
        {reservation.isLinkedTripleseat && reservation.tripleseatUrl && (
          <a
            href={reservation.tripleseatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            View on Tripleseat
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>

      <div 
        ref={groupReservationContentRef}
        className={`space-y-6`}
      >
        <div className="space-y-4">
          {/* Row 1: Status and Qualified */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center">
              <span className="text-gray-600 w-32">Status:</span>
              <button
                onClick={() => setIsStatusModalOpen(true)}
                className="focus:outline-none"
              >
                <Badge 
                  variant="outline" 
                  className={`${STATUS_COLORS[getDisplayStatus(reservation.status)].bg} ${STATUS_COLORS[getDisplayStatus(reservation.status)].text} border-0 capitalize`}
                >
                  {getDisplayStatus(reservation.status)}
                </Badge>
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-32">Qualified:</span>
              <button
                onClick={() => {
                  const nextStatus = {
                    [QualificationStatus.PENDING]: QualificationStatus.QUALIFIED,
                    [QualificationStatus.QUALIFIED]: QualificationStatus.NOT_QUALIFIED,
                    [QualificationStatus.NOT_QUALIFIED]: QualificationStatus.PENDING,
                  }[reservation.qualificationStatus];
                  
                  onReservationUpdate({
                    ...reservation,
                    qualificationStatus: nextStatus,
                  });
                }}
                className="focus:outline-none"
              >
                <Badge 
                  variant="outline" 
                  className={`${QUALIFICATION_COLORS[reservation.qualificationStatus].bg} ${QUALIFICATION_COLORS[reservation.qualificationStatus].text} border-0 capitalize`}
                >
                  {reservation.qualificationStatus.replace('_', ' ')}
                </Badge>
              </button>
            </div>
          </div>

          {/* Status Modal */}
          {isStatusModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Change Status</h3>
                  <button 
                    onClick={() => setIsStatusModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(STATUS_COLORS).map((statusKey) => (
                    <Badge
                      key={statusKey}
                      variant="outline"
                      className={`
                        ${STATUS_COLORS[statusKey].bg} 
                        ${STATUS_COLORS[statusKey].text} 
                        border-0 cursor-pointer capitalize
                        ${getDisplayStatus(reservation.status) === statusKey ? 'ring-2 ring-offset-2' : ''}
                      `}
                      onClick={() => {
                        onReservationUpdate({
                          ...reservation,
                          status: getBackendStatus(statusKey)
                        });
                        setIsStatusModalOpen(false);
                      }}
                    >
                      {statusKey}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Row 2: Date Range */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <span className="text-gray-600 w-32">Date Range:</span>
                <DateRangePicker
                  dateRange={pickerDateRange}
                  setDateRange={handleDateRangeUpdate}
                />
              </div>
              <button
                onClick={() => handleDateTypeChange()}
                className="focus:outline-none"
              >
                <Badge 
                  variant="outline" 
                  className={`${DATE_TYPE_COLORS[reservation.dateRange?.type || 'flexible'].bg} ${DATE_TYPE_COLORS[reservation.dateRange?.type || 'flexible'].text} border-0 capitalize`}
                >
                  {reservation.dateRange?.type || 'flexible'}
                </Badge>
              </button>
            </div>
            {reservation.dateRange?.type === 'deciding' && (
              <div className="ml-32">
                <input
                  type="text"
                  value={reservation.dateRange.decidingReason || ''}
                  onChange={(e) => {
                    if (!reservation.dateRange) return;
                    
                    onReservationUpdate({
                      ...reservation,
                      dateRange: {
                        ...reservation.dateRange,
                        type: 'deciding',
                        decidingReason: e.target.value
                      }
                    });
                  }}
                  placeholder="Describe the factors under consideration..."
                  className="w-full px-3 py-2 border rounded text-sm"
                />
              </div>
            )}
            {reservation.dateRange?.type === 'flexible' && reservation.dateRange.start && reservation.dateRange.end && (
              <div className="ml-32 space-y-2">
                {reservation.dateRange.alternativeDates?.map((dates, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <DateRangePicker
                      dateRange={{
                        from: new Date(dates.start),
                        to: new Date(dates.end)
                      }}
                      setDateRange={(dateRange: DateRange | undefined) => {
                        if (!dateRange?.from || !dateRange?.to) {
                          onReservationUpdate({
                            ...reservation,
                            dateRange: {
                              ...reservation.dateRange!,
                              alternativeDates: reservation.dateRange?.alternativeDates?.filter((_, i) => i !== index)
                            }
                          });
                          return;
                        }
                        
                        const newAlternativeDates = [...(reservation.dateRange?.alternativeDates || [])];
                        newAlternativeDates[index] = {
                          start: dateRange.from.toISOString().split('T')[0],
                          end: dateRange.to.toISOString().split('T')[0],
                        };
                        
                        onReservationUpdate({
                          ...reservation,
                          dateRange: {
                            ...reservation.dateRange!,
                            alternativeDates: newAlternativeDates
                          }
                        });
                      }}
                    />
                    <button
                      onClick={() => {
                        onReservationUpdate({
                          ...reservation,
                          dateRange: {
                            ...reservation.dateRange!,
                            alternativeDates: reservation.dateRange?.alternativeDates?.filter((_, i) => i !== index)
                          }
                        });
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddAlternativeDates()}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  <FaPlus className="h-3 w-3" />
                  Add alternative dates
                </button>
              </div>
            )}
          </div>

          {/* Row 3: Sales Agent */}
          <div className="flex items-center">
            <span className="text-gray-600 w-32">Sales Agent:</span>
            <div className="relative">
              <button
                onClick={() => setShowSalesAgentDropdown(!showSalesAgentDropdown)}
                className="text-sm hover:text-blue-600 focus:outline-none flex items-center gap-2"
              >
                <span>{reservation.assignedSalesAgent.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {showSalesAgentDropdown && (
                <div className="absolute left-0 top-full mt-1 w-[300px] bg-white rounded-lg shadow-lg border p-2 z-50">
                  <div className="relative mb-2">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={salesAgentSearchValue}
                      onChange={(e) => setSalesAgentSearchValue(e.target.value)}
                      placeholder="Search by name or email..."
                      className="w-full pl-9 pr-3 py-2 text-sm border rounded"
                    />
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {filteredSalesAgents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => {
                          onSalesAgentSelect?.(agent.id);
                          onReservationUpdate({
                            ...reservation,
                            assignedSalesAgent: agent
                          });
                          setShowSalesAgentDropdown(false);
                          setSalesAgentSearchValue("");
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
                      >
                        {agent.avatarUrl && (
                          <img 
                            src={agent.avatarUrl} 
                            alt={agent.name} 
                            className="w-6 h-6 rounded-full"
                          />
                        )}
                        <div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-sm text-gray-500">{agent.email}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Row 4: Lead Score and Intent Score */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lead Score</label>
              {renderStars(reservation.leadScore, handleLeadScoreChange)}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Intent Score</label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">{getIntentLabel(reservation.intentScore)}</span>
                      <span className="text-sm text-gray-500">({reservation.intentScore}/100)</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="p-2">
                      <p className="text-sm mb-1">Based on:</p>
                      <ul className="text-xs space-y-1">
                        {reservation.intentMetrics?.websiteVisits && (
                          <li>• {reservation.intentMetrics.websiteVisits} website visits</li>
                        )}
                        {reservation.intentMetrics?.numberOfContacts && (
                          <li>• {reservation.intentMetrics.numberOfContacts} contacts made</li>
                        )}
                        {reservation.intentMetrics?.researchedHotel && (
                          <li>• Researched hotel details</li>
                        )}
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className={`space-y-4 ${hasNewNote ? 'animate-flash' : ''}`}>
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsNotesExpanded(!isNotesExpanded)}
          >
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-gray-900">Notes</h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {notesCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{isNotesExpanded ? 'close' : 'open'}</span>
              {isNotesExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>

          {isNotesExpanded && (
            <div className="space-y-4">
              <PlannerPublicNotes
                initialNotes={reservation.publicNotes.map(note => note.content).join('\n')}
                currentUser={currentUser}
                onChange={(notes) => handleNotesChange(notes, 'public')}
                open={false}
              />
              <PlannerPrivateNotes
                initialNotes={reservation.privateNotes.map(note => note.content).join('\n')}
                users={[currentUser, ...teamMembers]
                  .filter((user): user is NonNullable<typeof user> => user !== undefined)}
                onChange={(notes) => handleNotesChange(notes, 'private')}
                open={false}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}; 