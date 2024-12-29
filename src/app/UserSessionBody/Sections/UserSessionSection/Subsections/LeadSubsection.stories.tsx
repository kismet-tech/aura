import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LeadSubsection, QualificationStatus } from './LeadSubsection';

const meta: Meta<typeof LeadSubsection> = {
  title: 'Sections/UserSessionSection/LeadSubsection',
  component: LeadSubsection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '900px', padding: '20px', backgroundColor: 'white' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LeadSubsection>;

// Wrapper component to handle state
const LeadSubsectionWrapper = (props: React.ComponentProps<typeof LeadSubsection>) => {
  const [reservation, setReservation] = useState(props.reservation);

  return (
    <LeadSubsection
      {...props}
      reservation={reservation}
      onReservationUpdate={(updatedReservation) => {
        console.log('Reservation updated:', updatedReservation);
        setReservation(updatedReservation);
      }}
      onSalesAgentSelect={(agentId) => {
        console.log('Sales agent selected:', agentId);
        const selectedAgent = props.teamMembers.find(member => member.id === agentId);
        if (selectedAgent) {
          setReservation({
            ...reservation,
            assignedSalesAgent: selectedAgent
          });
        }
      }}
    />
  );
};

const mockCurrentUser = {
  id: 'user1',
  name: 'John Smith',
  email: 'john@example.com',
  avatarUrl: 'https://avatars.githubusercontent.com/u/1234567'
};

const mockTeamMembers = [
  {
    id: 'user2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/2345678'
  },
  {
    id: 'user3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/3456789'
  }
];

// Example of a new lead in PENDING status
export const NewLead: Story = {
  render: (args) => <LeadSubsectionWrapper {...args} />,
  args: {
    reservation: {
      isTransient: false,
      status: 'SELECTING',
      qualificationStatus: QualificationStatus.PENDING,
      dateRange: {
        start: '2024-06-15',
        end: '2024-06-18',
        type: 'fixed',
      },
      assignedSalesAgent: mockCurrentUser,
      leadScore: 3,
      intentScore: 45,
      intentMetrics: {
        websiteVisits: 2,
        mostRecentVisit: new Date().toISOString(),
        lastEmailOpen: undefined,
        numberOfContacts: 1,
        researchedHotel: false,
      },
      publicNotes: [
        {
          content: 'Initial inquiry received. Gathering requirements.',
          userId: 'user1',
          dateCreated: new Date().toISOString()
        }
      ],
      privateNotes: []
    },
    currentUser: mockCurrentUser,
    teamMembers: mockTeamMembers
  }
};

// Example of a qualified lead with high intent
export const QualifiedLead: Story = {
  render: (args) => <LeadSubsectionWrapper {...args} />,
  args: {
    reservation: {
      isTransient: false,
      isLinkedTripleseat: true,
      tripleseatUrl: 'https://tripleseat.com/event/123',
      status: 'SELECTING',
      qualificationStatus: QualificationStatus.QUALIFIED,
      dateRange: {
        start: '2024-06-15',
        end: '2024-06-18',
        type: 'fixed',
      },
      assignedSalesAgent: {
        id: 'user2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatarUrl: 'https://avatars.githubusercontent.com/u/2345678'
      },
      leadScore: 5,
      intentScore: 85,
      intentMetrics: {
        websiteVisits: 15,
        mostRecentVisit: new Date().toISOString(),
        lastEmailOpen: new Date().toISOString(),
        numberOfContacts: 8,
        researchedHotel: true,
      },
      publicNotes: [
        {
          content: 'Initial inquiry for summer wedding. Looking for venue for 150 guests.',
          userId: 'user2',
          dateCreated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          content: 'Follow-up call scheduled for next week to discuss venue options.',
          userId: 'user2',
          dateCreated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      privateNotes: [
        {
          content: 'Budget range discussed: $50k-75k. Preferred outdoor ceremony.',
          userId: 'user2',
          dateCreated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          content: "Bride's mother is primary decision maker. Very detail oriented.",
          userId: 'user1',
          dateCreated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    },
    currentUser: mockCurrentUser,
    teamMembers: mockTeamMembers
  }
};

// Example of a not qualified lead
export const NotQualifiedLead: Story = {
  render: (args) => <LeadSubsectionWrapper {...args} />,
  args: {
    reservation: {
      isTransient: false,
      status: 'SELECTING',
      qualificationStatus: QualificationStatus.NOT_QUALIFIED,
      dateRange: {
        start: '2024-07-01',
        end: '2024-07-03',
        type: 'fixed'
      },
      assignedSalesAgent: mockCurrentUser,
      leadScore: 1,
      intentScore: 15,
      intentMetrics: {
        websiteVisits: 1,
        mostRecentVisit: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        numberOfContacts: 1,
        researchedHotel: false,
      },
      publicNotes: [
        {
          content: 'Budget expectations not aligned with our offerings.',
          userId: 'user1',
          dateCreated: new Date().toISOString()
        }
      ],
      privateNotes: [
        {
          content: 'Looking for budget options under $10k. Not a fit for our venue.',
          userId: 'user1',
          dateCreated: new Date().toISOString()
        }
      ]
    },
    currentUser: mockCurrentUser,
    teamMembers: mockTeamMembers
  }
}; 