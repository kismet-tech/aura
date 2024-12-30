import React, { useState } from 'react';
import { FaSearch, FaPlus, FaPencilAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { AgenticActionList } from '@/components/molecules/AgenticActionList/index';

// Matching schema from prisma
export enum UserSessionStatus {
  SELECTING = 'SELECTING',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  RATIFIED = 'RATIFIED',
  COMPLETED = 'COMPLETED'
}

export enum UserSessionPaymentSplitType {
  SINGLE_PAYER = 'SINGLE_PAYER',
  SPLIT_PAYER = 'SPLIT_PAYER'
}

export interface UserSessionTag {
  userSessionTagId: string;
  tag: string;
  hexColor?: string;
}

// Main interface matching prisma schema
export interface UserSession {
  userSessionId: string;
  humanReadableName?: string;
  paymentSplitType: UserSessionPaymentSplitType;
  hotelComments?: string;
  userSessionStatus: UserSessionStatus;
  isArchived: boolean;
  hasBeenApprovedByPricingManager: boolean;
  acceptedAt?: Date;
  userSessionInitiationTimestamp: Date;
  isAgentEnabled: boolean; // Indicates that Kismet is allowed to process the lead for instant booking and is acting in an agentic role
  
  // Foreign key relationships
  userId: string;
  hotelId: string;
  primarySalesAgentUserId?: string;
  
  // Many-to-many relationships
  userSessionTags: UserSessionTag[];
  guestUsers: string[];

  // Additional fields we're using in the UI but not in schema
  // TODO: Discuss with backend about adding these
  // - Add isAgentEnabled: Boolean @default(false) to UserSession model
  // - Consider adding dedicated title field instead of using humanReadableName
  // - Add BookingType enum and field to UserSession model
  // - Consider adding account relationship to schema
  title: string; // Currently using humanReadableName, but might want dedicated title field
  bookingType: BookingType;
  account?: {
    name: string;
    id: string;
  };
}

export enum BookingType {
  GROUP_BOOKING = 'GROUP_BOOKING',
  TRANSIENT_BOOKING = 'TRANSIENT_BOOKING',
  LNR_BOOKING = 'LNR_BOOKING',
  EXTENDED_STAY = 'EXTENDED_STAY'
}

interface UserSessionSectionProps {
  reservation: UserSession;
  existingAccounts?: Array<{
    id: string;
    name: string;
  }>;
  onReservationUpdate?: (updatedReservation: UserSession) => void;
  onAccountSelect?: (accountId: string) => void;
  onCreateAccount?: (accountName: string) => void;
}

export const UserSessionSection: React.FC<UserSessionSectionProps> = ({
  reservation,
  existingAccounts = [],
  onReservationUpdate,
  onAccountSelect,
  onCreateAccount,
}) => {
  const [showAccountSearch, setShowAccountSearch] = useState(false);
  const [accountSearchValue, setAccountSearchValue] = useState("");
  const [editingField, setEditingField] = useState<'title' | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showAgentModal, setShowAgentModal] = useState(false);

  const handleEdit = (field: 'title') => {
    setEditingField(field);
    setEditValue(reservation.humanReadableName || '');
  };

  const handleSave = () => {
    if (editingField === 'title') {
      onReservationUpdate?.({ 
        ...reservation, 
        humanReadableName: editValue,
        title: editValue // TODO: Remove once backend schema is updated
      });
      setEditingField(null);
      setEditValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditingField(null);
      setEditValue("");
    }
  };

  const handleBookingTypeChange = () => {
    const types = [
      BookingType.GROUP_BOOKING,
      BookingType.TRANSIENT_BOOKING,
      BookingType.LNR_BOOKING,
      BookingType.EXTENDED_STAY
    ];
    const currentIndex = types.indexOf(reservation.bookingType);
    const nextType = types[(currentIndex + 1) % types.length];

    onReservationUpdate?.({
      ...reservation,
      bookingType: nextType
    });
  };

  const getBookingTypeDisplay = (type: BookingType): string => {
    // Special case for LNR
    if (type === BookingType.LNR_BOOKING) {
      return 'LNR Booking';
    }
    // Normal case for other booking types
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const handleAccountSelect = (value: string) => {
    if (value === 'create') {
      onCreateAccount?.(accountSearchValue);
    } else {
      onAccountSelect?.(value);
    }
    setShowAccountSearch(false);
    setAccountSearchValue("");
  };

  const filteredAccounts = existingAccounts.filter(account => 
    account.name.toLowerCase().includes(accountSearchValue.toLowerCase())
  );

  const handleAgentToggle = () => {
    if (!reservation.isAgentEnabled) {
      setShowAgentModal(true);
    } else {
      onReservationUpdate?.({
        ...reservation,
        isAgentEnabled: false
      });
    }
  };

  const handleAgentConfirm = () => {
    onReservationUpdate?.({
      ...reservation,
      isAgentEnabled: true
    });
    setShowAgentModal(false);
  };

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {editingField === 'title' ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter title"
                className="px-2 py-1 border rounded text-lg font-medium flex-grow"
                autoFocus
              />
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-800 text-sm"
              >
                save
              </button>
            </div>
          ) : (
            <h1 className="text-lg font-semibold group">
              {reservation.humanReadableName ? (
                <button 
                  onClick={() => handleEdit('title')}
                  className="flex items-center gap-2 hover:text-gray-600"
                >
                  <span>{reservation.humanReadableName}</span>
                  <FaPencilAlt className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                </button>
              ) : (
                <button 
                  onClick={() => handleEdit('title')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Add Title
                </button>
              )}
            </h1>
          )}
          <span className="text-gray-400">/</span>
          <button
            onClick={handleBookingTypeChange}
            className="text-lg font-semibold hover:text-blue-600 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
          >
            {getBookingTypeDisplay(reservation.bookingType)}
          </button>
          <span className="text-gray-400">/</span>
          {reservation.account ? (
            <button
              onClick={() => setShowAccountSearch(true)}
              className="text-lg font-semibold text-gray-600 hover:text-blue-600 transition-colors"
            >
              {reservation.account.name}
            </button>
          ) : (
            <button
              onClick={() => setShowAccountSearch(true)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              add account
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleAgentToggle}
            className={`text-sm ${
              reservation.isAgentEnabled 
                ? 'bg-transparent border border-green-600 text-green-600 hover:bg-green-50' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {reservation.isAgentEnabled ? '(Agent Enabled)' : 'Enable Agent'}
          </Button>
          <div className="relative">
            {showAccountSearch && (
              <div className="absolute right-0 top-full mt-1 w-[300px] bg-white rounded-lg shadow-lg border p-2 z-50">
                <div className="relative mb-2">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={accountSearchValue}
                    onChange={(e) => setAccountSearchValue(e.target.value)}
                    placeholder="Search by account name..."
                    className="w-full pl-9 pr-3 py-2 text-sm border rounded"
                    autoFocus
                  />
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredAccounts.length === 0 && accountSearchValue && (
                    <button
                      onClick={() => handleAccountSelect('create')}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm"
                    >
                      <FaPlus className="text-gray-500" />
                      Create new account "{accountSearchValue}"
                    </button>
                  )}
                  {filteredAccounts.map((account) => (
                    <button
                      key={account.id}
                      onClick={() => handleAccountSelect(account.id)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      <div className="font-medium">{account.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AgenticActionList
        isOpen={showAgentModal}
        onClose={() => setShowAgentModal(false)}
        onConfirm={handleAgentConfirm}
      />
    </section>
  );
};