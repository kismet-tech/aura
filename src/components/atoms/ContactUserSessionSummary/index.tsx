import React, { useState } from 'react';
import Modal from 'react-modal';

// Backend Note:
// These fields should link to their respective entities in the backend:
// - title -> links to Session entity
// - date -> links to SessionDate entity
// - events -> each event links to SessionEvent entity
// Implementation of these links requires backend work to:
// 1. Provide the entity IDs
// 2. Set up API endpoints for fetching detailed information
// 3. Handle navigation/routing to the appropriate views
export interface HotelSession {
  title: string;      // Links to Session
  date: string;       // Links to SessionDate (ISO format: YYYY-MM-DD)
  roomCount: number;
  events: string[];   // Each links to SessionEvent
  revenue: string;
  isPast?: boolean;
  // Backend will need to provide these IDs:
  sessionId?: string;
  sessionDateId?: string;
  eventIds?: string[];
}

export interface ContactUserSessionSummaryProps {
  sessions?: HotelSession[];
  className?: string;
  collapsed?: boolean;
  // These would be provided by backend:
  onSessionClick?: (sessionId: string) => void;
  onDateClick?: (sessionDateId: string) => void;
  onEventClick?: (eventId: string) => void;
}

const FullTable: React.FC<{ 
  sessions: HotelSession[],
  onSessionClick?: (sessionId: string) => void,
  onDateClick?: (sessionDateId: string) => void,
  onEventClick?: (eventId: string) => void,
}> = ({ 
  sessions,
  onSessionClick,
  onDateClick,
  onEventClick,
}) => (
  <table className="w-full">
    <thead>
      <tr className="text-left text-gray-600 border-b">
        <th className="pb-2 font-medium">Stay</th>
        <th className="pb-2 font-medium">Date</th>
        <th className="pb-2 font-medium text-center">Rooms</th>
        <th className="pb-2 font-medium">Events</th>
        <th className="pb-2 font-medium text-right">Revenue</th>
      </tr>
    </thead>
    <tbody className="divide-y">
      {sessions.map((session, index) => (
        <tr 
          key={`${session.title}-${index}`}
          className={`${session.isPast ? 'text-gray-500' : 'text-gray-900'}`}
        >
          <td className="py-2">
            {session.sessionId ? (
              <button 
                onClick={() => onSessionClick?.(session.sessionId!)}
                className="hover:text-blue-500 cursor-pointer text-left"
              >
                {session.title}
              </button>
            ) : session.title}
          </td>
          <td className="py-2">
            {session.sessionDateId ? (
              <button 
                onClick={() => onDateClick?.(session.sessionDateId!)}
                className="hover:text-blue-500 cursor-pointer"
              >
                {new Date(session.date).toLocaleDateString()}
              </button>
            ) : new Date(session.date).toLocaleDateString()}
          </td>
          <td className="py-2 text-center">{session.roomCount}</td>
          <td className="py-2">
            {session.events.map((event, i) => (
              <span key={i} className="inline-block mr-2">
                {session.eventIds?.[i] ? (
                  <button 
                    onClick={() => onEventClick?.(session.eventIds![i])}
                    className="hover:text-blue-500 cursor-pointer"
                  >
                    {event}
                  </button>
                ) : event}
              </span>
            ))}
          </td>
          <td className="py-2 text-right font-medium">{session.revenue}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const ContactUserSessionSummary: React.FC<ContactUserSessionSummaryProps> = ({
  sessions = [],
  className = '',
  collapsed = false,
  onSessionClick,
  onDateClick,
  onEventClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!sessions.length) return null;

  // Sort sessions by date (newest first)
  const sortedSessions = [...sessions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  if (collapsed) {
    return (
      <>
        <div className={`text-sm relative ${className}`}>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium text-center">Rooms</th>
                <th className="pb-2 font-medium text-right pr-8">Events</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedSessions.map((session, index) => (
                <tr 
                  key={`${session.title}-${index}`}
                  className={`${session.isPast ? 'text-gray-500' : 'text-gray-900'}`}
                >
                  <td className="py-2">{new Date(session.date).toLocaleDateString()}</td>
                  <td className="py-2 text-center">{session.roomCount}</td>
                  <td className="py-2 text-right pr-8">{session.events.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute right-0 top-0 p-1 text-gray-500 hover:text-gray-700"
            title="Show full details"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="max-w-4xl mx-auto mt-20 bg-white p-6 rounded-lg shadow-xl"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Session History</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <FullTable 
            sessions={sortedSessions}
            onSessionClick={onSessionClick}
            onDateClick={onDateClick}
            onEventClick={onEventClick}
          />
        </Modal>
      </>
    );
  }

  return (
    <div className={`text-sm ${className}`}>
      <FullTable 
        sessions={sortedSessions}
        onSessionClick={onSessionClick}
        onDateClick={onDateClick}
        onEventClick={onEventClick}
      />
    </div>
  );
}; 