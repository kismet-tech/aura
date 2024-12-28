import React, { useState } from 'react';
import { RenderableItineraryHotelRoomOffer } from '@kismet_ai/foundation';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export interface BifrostSelectRoomAttendeeProps {
  rooms: RenderableItineraryHotelRoomOffer[];
  onSelectRoom: (room: RenderableItineraryHotelRoomOffer) => void;
}

interface CollapsibleNotesProps {
  title: string;
  content: string;
}

const CollapsibleNotes: React.FC<CollapsibleNotesProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 flex justify-between items-center bg-gray-50 rounded-lg hover:bg-gray-100"
      >
        <h4 className="font-medium text-gray-700">{title}</h4>
        {isOpen ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="p-3 text-gray-600">{content}</p>
      </div>
    </div>
  );
};

export const BifrostSelectRoomAttendee: React.FC<BifrostSelectRoomAttendeeProps> = ({
  rooms,
  onSelectRoom,
}) => {
  return (
    <div className="space-y-4">
      {rooms.map((room) => (
        <div key={room.hotelRoomOfferId} className="space-y-4">
          <button
            onClick={() => onSelectRoom(room)}
            className="w-full p-4 border rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{room.hotelRoomName}</h3>
                <p className="text-sm text-gray-600">{room.hotelRoomDescription}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">${(room.offerPriceInCents / 100).toFixed(2)}</p>
                <p className="text-sm text-gray-600">per night</p>
              </div>
            </div>
          </button>

          {/* Collapsible Notes */}
          <div className="space-y-2">
            <CollapsibleNotes
              title="Room Details"
              content={room.verboseHotelRoomDescription}
            />
          </div>
        </div>
      ))}
    </div>
  );
}; 