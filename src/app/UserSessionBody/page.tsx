import React, { useState } from 'react';
import { ContactAvatar } from '@/components/atoms/ContactAvatar';
import { ContactName } from '@/components/atoms/ContactName';
import { ContactHoverCard } from '@/components/molecules/ContactHoverCard';
import { FaChevronDown, FaChevronUp, FaPlus, FaSearch } from 'react-icons/fa';

interface GroupReservation {
  title: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  dateRange?: {
    start: string;
    end: string;
  };
  leadScore: number;
  isQualified: boolean;
  intentScore: number;
  assignedSalesAgent: {
    name: string;
    id: string;
  };
  publicNotes: string;
  privateNotes: string;
}

interface UserSessionBodyProps {
  reservation: GroupReservation;
  // If contact is provided, they are already the host for this user session
  contact?: {
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    dataSources?: Array<{ type: 'LinkedIn' | 'WhatsApp'; url: string; }>;
    phone?: string;
    email?: string;
    address?: string;
    company?: string;
    role?: string;
    lastContact?: string;
    preferredContactMethod?: string;
    timezone?: string;
    notes?: string;
    bio?: string;
  };
  onContactUpdate?: (updatedContact: NonNullable<UserSessionBodyProps['contact']>) => void;
  onHostSelect?: (contactId: string) => void;
  onCreateHost?: (nameOrEmail: string) => void;
  existingContacts?: Array<{
    id: string;
    name: string;
    email?: string;
    phone?: string;
  }>;
}

interface CollapsibleNotesProps {
  title: string;
  content: string;
}

const CollapsibleNotes: React.FC<CollapsibleNotesProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between font-medium text-gray-700 mb-2"
      >
        <h4>{title}</h4>
        {isOpen ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="bg-gray-50 p-3 rounded">{content}</p>
      </div>
    </div>
  );
};

const UserSessionBody: React.FC<UserSessionBodyProps> = ({
  reservation,
  contact,
  onContactUpdate,
  onHostSelect,
  onCreateHost,
  existingContacts = [],
}) => {
  const [showHostSearch, setShowHostSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [editingField, setEditingField] = useState<'email' | 'phone' | 'name' | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editLastName, setEditLastName] = useState("");

  const handleEdit = (field: 'email' | 'phone' | 'name') => {
    setEditingField(field);
    if (field === 'name') {
      setEditValue(contact?.firstName || '');
      setEditLastName(contact?.lastName || '');
    } else {
      setEditValue(contact?.[field] || '');
    }
  };

  const handleSave = () => {
    if (contact && editingField) {
      if (editingField === 'name') {
        onContactUpdate?.({
          ...contact,
          firstName: editValue,
          lastName: editLastName,
        });
      } else {
        onContactUpdate?.({
          ...contact,
          [editingField]: editValue,
        });
      }
      setEditingField(null);
      setEditValue("");
      setEditLastName("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditingField(null);
      setEditValue("");
      setEditLastName("");
    }
  };

  const handleSelect = (value: string) => {
    if (value === 'create') {
      onCreateHost?.(searchValue);
    } else {
      onHostSelect?.(value);
    }
    setShowHostSearch(false);
    setSearchValue("");
  };

  const filteredContacts = existingContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    (contact.email && contact.email.toLowerCase().includes(searchValue.toLowerCase()))
  );

  return (
    <div className="p-4">
      <div className="grid lg:grid-cols-[1fr,400px] gap-4">
        {/* Group Reservation Section */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Group Reservation</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">{reservation.title}</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-gray-600 w-32">Status:</span>
                  <span className={`capitalize px-2 py-1 rounded text-sm ${
                    reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reservation.status}
                  </span>
                </div>
                {reservation.dateRange && (
                  <div className="flex items-center">
                    <span className="text-gray-600 w-32">Date Range:</span>
                    <span>{new Date(reservation.dateRange.start).toLocaleDateString()} - {new Date(reservation.dateRange.end).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <span className="text-gray-600 w-32">Lead Score:</span>
                  <span>{reservation.leadScore}/100</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-32">Qualified:</span>
                  <span className={reservation.isQualified ? 'text-green-600' : 'text-red-600'}>
                    {reservation.isQualified ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-32">Intent Score:</span>
                  <span>{reservation.intentScore}/100</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-32">Sales Agent:</span>
                  <span>{reservation.assignedSalesAgent.name}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <CollapsibleNotes
                title="Public Notes"
                content={reservation.publicNotes}
              />
              <CollapsibleNotes
                title="Private Notes"
                content={reservation.privateNotes}
              />
            </div>
          </div>
        </section>

        {/* Right Side Sections */}
        <div className="space-y-4">
          {/* Contact Section */}
          <section className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Contact</h2>
              <div className="relative">
                <button
                  onClick={() => setShowHostSearch(!showHostSearch)}
                  className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
                >
                  {contact ? 'Change Host' : 'Add Host'}
                </button>
                {showHostSearch && (
                  <div className="absolute right-0 top-full mt-1 w-[300px] bg-white rounded-lg shadow-lg border p-2 z-50">
                    <div className="relative mb-2">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full pl-9 pr-3 py-2 text-sm border rounded"
                      />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {filteredContacts.length === 0 && searchValue && (
                        <button
                          onClick={() => handleSelect('create')}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm"
                        >
                          <FaPlus className="text-gray-500" />
                          Create new contact with "{searchValue}"
                        </button>
                      )}
                      {filteredContacts.map((contact) => (
                        <button
                          key={contact.id}
                          onClick={() => handleSelect(contact.id)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                        >
                          <div className="font-medium">{contact.name}</div>
                          {contact.email && (
                            <div className="text-sm text-gray-500">{contact.email}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {contact ? (
              <div className="space-y-4">
                <ContactHoverCard
                  firstName={contact.firstName}
                  lastName={contact.lastName}
                  imageUrl={contact.imageUrl}
                  dataSources={contact.dataSources}
                  contactInfo={{
                    phone: contact.phone,
                    email: contact.email,
                    address: contact.address,
                  }}
                  onContactInfoEdit={(updatedInfo) => {
                    onContactUpdate?.({
                      ...contact,
                      ...updatedInfo,
                    });
                  }}
                  bio={contact.bio}
                  onBioEdit={(updatedBio) => {
                    onContactUpdate?.({
                      ...contact,
                      bio: updatedBio,
                    });
                  }}
                />
                <div className="text-sm space-y-1">
                  {(!contact.firstName && !contact.lastName) ? (
                    editingField === 'name' ? (
                      <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="First name"
                            className="px-2 py-1 border rounded text-sm w-24"
                            autoFocus
                          />
                          <input
                            type="text"
                            value={editLastName}
                            onChange={(e) => setEditLastName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Last name"
                            className="px-2 py-1 border rounded text-sm w-24"
                          />
                        </div>
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          save
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleEdit('name')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        add name
                      </button>
                    )
                  ) : null}
                  {!contact.email && (
                    editingField === 'email' ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="email"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Enter email"
                          className="px-2 py-1 border rounded text-sm"
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
                      <button 
                        onClick={() => handleEdit('email')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        add email
                      </button>
                    )
                  )}
                  {!contact.phone && (
                    editingField === 'phone' ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="tel"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Enter phone"
                          className="px-2 py-1 border rounded text-sm"
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
                      <button 
                        onClick={() => handleEdit('phone')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        add phone
                      </button>
                    )
                  )}
                  {(contact.email || contact.phone) && (
                    <div className="text-gray-600">
                      {contact.email && <div>{contact.email}</div>}
                      {contact.phone && <div>{contact.phone}</div>}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">No host assigned</p>
            )}
          </section>

          {/* Guest List Section */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Guest List</h2>
            <p className="text-gray-600 italic">Coming Soon</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserSessionBody; 