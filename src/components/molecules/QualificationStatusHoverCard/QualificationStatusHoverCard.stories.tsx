import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QualificationStatusHoverCard, type QualificationDetails } from './index';
import { Badge } from '@/components/ui/badge';
import * as HoverCard from '@radix-ui/react-hover-card';

type ComponentType = typeof QualificationStatusHoverCard;

const meta: Meta<ComponentType> = {
  title: 'Molecules/QualificationStatusHoverCard',
  component: QualificationStatusHoverCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8fafc' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="p-32 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg shadow-inner">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<ComponentType>;

const defaultDetails: QualificationDetails = {
  status: 'PENDING',
  title: 'New Event Request',
  requestedDates: [new Date('2024-06-15'), new Date('2024-06-17')],
  guestCount: undefined,
  roomCount: undefined,
  eventSpace: true,
  eventCapacity: undefined,
  availableRooms: undefined,
  availableSpace: undefined,
  missingInfo: [
    'Guest count not provided',
    'Room block requirements not specified',
    'Event capacity needs confirmation'
  ],
  actions: [
    {
      text: 'Requested more information',
      emailLink: '/inbox/request-info'
    }
  ]
};

const HoverableCard = ({ details, children }: { details: QualificationDetails, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HoverCard.Root open={isOpen} onOpenChange={setIsOpen}>
      <HoverCard.Trigger asChild>
        <div 
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="inline-block transition-transform hover:scale-105"
        >
          {children}
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content 
          className="w-80 rounded-xl bg-white p-5 shadow-[0_20px_70px_-10px_rgba(0,0,0,0.15)] border border-slate-100 z-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          sideOffset={8}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <QualificationStatusHoverCard details={details} />
          <HoverCard.Arrow className="fill-white [&>path]:stroke-slate-100" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export const Pending: Story = {
  render: () => (
    <HoverableCard details={{
      status: 'PENDING',
      title: 'Corporate Retreat',
      requestedDates: [new Date('2024-06-15'), new Date('2024-06-17')],
      guestCount: undefined,
      roomCount: undefined,
      eventSpace: true,
      eventCapacity: undefined,
      missingInfo: [
        'Guest count not provided',
        'Room block requirements not specified',
        'Event capacity needs confirmation'
      ],
      actions: [
        {
          text: 'Requested more information',
          emailLink: '/inbox/request-info'
        }
      ]
    }}>
      <Badge 
        variant="outline" 
        className="cursor-pointer transition-colors hover:bg-yellow-50 hover:border-yellow-200 px-4 py-1.5 text-sm font-medium"
      >
        PENDING
      </Badge>
    </HoverableCard>
  )
};

export const InitiallyQualified: Story = {
  render: () => (
    <HoverableCard details={{
      status: 'QUALIFIED',
      title: 'Intimate Wedding',
      requestedDates: [new Date('2024-07-20'), new Date('2024-07-22')],
      guestCount: 80,
      roomCount: 35,
      eventSpace: true,
      eventCapacity: 100,
      availableRooms: 45,
      availableSpace: 120,
      actions: [
        {
          text: 'Sent initial proposal',
          emailLink: '/inbox/proposal'
        }
      ],
      events: [
        { name: 'Welcome Drinks', capacity: 80 },
        { name: 'Wedding Ceremony & Reception', capacity: 100 }
      ]
    }}>
      <Badge 
        variant="outline" 
        className="bg-green-50 text-green-700 border-green-200 cursor-pointer transition-colors hover:bg-green-100 hover:border-green-300 px-4 py-1.5 text-sm font-medium"
      >
        QUALIFIED
      </Badge>
    </HoverableCard>
  )
};

// Wedding Weekend Lead Progression
export const WeddingWeekendIncomplete: Story = {
  render: () => (
    <HoverableCard details={{
      status: 'PENDING',
      title: 'Johnson Wedding Weekend',
      requestedDates: [new Date('2024-09-20'), new Date('2024-09-22')],
      guestCount: 200,
      roomCount: undefined,
      eventSpace: true,
      eventCapacity: undefined,
      missingInfo: [
        'Room block size not specified',
        'Ceremony capacity requirements not provided',
        'Reception dinner guest count needed'
      ],
      actions: [
        {
          text: 'Requested event capacity details',
          emailLink: '/inbox/capacity-request'
        }
      ],
      events: [
        { name: 'Welcome Reception', capacity: 200 }
      ]
    }}>
      <Badge 
        variant="outline" 
        className="cursor-pointer transition-colors hover:bg-yellow-50 hover:border-yellow-200 px-4 py-1.5 text-sm font-medium"
      >
        PENDING
      </Badge>
    </HoverableCard>
  )
};

export const WeddingWeekendConstraints: Story = {
  render: () => (
    <HoverableCard details={{
      status: 'NOT_QUALIFIED',
      title: 'Johnson Wedding Weekend',
      requestedDates: [new Date('2024-09-20'), new Date('2024-09-22')],
      guestCount: 200,
      roomCount: 120,
      eventSpace: true,
      eventCapacity: 200,
      availableRooms: 80,
      availableSpace: 150,
      actions: [
        {
          text: 'Suggested alternative dates with full availability',
          emailLink: '/inbox/alt-dates'
        },
        {
          text: 'Connected with Hilton about split room block',
          emailLink: '/inbox/hilton-partnership'
        },
        {
          text: 'Shared Four Seasons ballroom for reception',
          emailLink: '/inbox/four-seasons'
        }
      ],
      events: [
        { name: 'Welcome Reception', capacity: 200 },
        { name: 'Wedding Ceremony', capacity: 200 },
        { name: 'Reception Dinner & Dancing', capacity: 200 }
      ]
    }}>
      <Badge 
        variant="destructive" 
        className="cursor-pointer transition-colors hover:bg-red-500 px-4 py-1.5 text-sm font-medium"
      >
        NOT QUALIFIED
      </Badge>
    </HoverableCard>
  )
};

export const WeddingWeekendQualified: Story = {
  render: () => (
    <HoverableCard details={{
      status: 'QUALIFIED',
      title: 'Johnson Wedding Weekend',
      requestedDates: [new Date('2024-10-11'), new Date('2024-10-13')],
      guestCount: 200,
      roomCount: 120,
      eventSpace: true,
      eventCapacity: 150,
      availableRooms: 140,
      availableSpace: 150,
      actions: [
        {
          text: 'Confirmed Four Seasons for reception dinner',
          emailLink: '/inbox/fs-confirmed'
        },
        {
          text: 'Sent proposal for remaining events',
          emailLink: '/inbox/proposal'
        }
      ],
      events: [
        { name: 'Welcome Reception', capacity: 150 },
        { name: 'Wedding Ceremony', capacity: 150 }
      ]
    }}>
      <Badge 
        variant="outline" 
        className="bg-green-50 text-green-700 border-green-200 cursor-pointer transition-colors hover:bg-green-100 hover:border-green-300 px-4 py-1.5 text-sm font-medium"
      >
        QUALIFIED
      </Badge>
    </HoverableCard>
  )
}; 