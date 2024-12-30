import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UserSessionSection, BookingType, UserSessionStatus, UserSessionPaymentSplitType } from './index';

const meta: Meta<typeof UserSessionSection> = {
  title: 'Sections/UserSessionSection',
  component: UserSessionSection,
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
type Story = StoryObj<typeof UserSessionSection>;

const mockExistingAccounts = [
  { id: 'acc1', name: 'Acme Corp' },
  { id: 'acc2', name: 'Globex Corporation' },
  { id: 'acc3', name: 'Stark Industries' },
  { id: 'acc4', name: 'Wayne Enterprises' }
];

// Base reservation object to extend from
const baseReservation = {
  userSessionId: 'us1',
  paymentSplitType: UserSessionPaymentSplitType.SINGLE_PAYER,
  userSessionStatus: UserSessionStatus.SELECTING,
  isArchived: false,
  hasBeenApprovedByPricingManager: false,
  userSessionInitiationTimestamp: new Date(),
  userId: 'user1',
  hotelId: 'hotel1',
  userSessionTags: [],
  guestUsers: [],
  title: '',
  isAgentEnabled: false // Default to false for most stories
};

// Wrapper component to handle state
const UserSessionSectionWrapper = (props: React.ComponentProps<typeof UserSessionSection>) => {
  const [reservation, setReservation] = useState(props.reservation);

  const handleReservationUpdate = (updatedReservation: any) => {
    console.log('Reservation updated:', updatedReservation);
    setReservation(updatedReservation);
  };

  const handleAccountSelect = (accountId: string) => {
    console.log('Account selected:', accountId);
    const selectedAccount = props.existingAccounts?.find(acc => acc.id === accountId);
    if (selectedAccount) {
      setReservation({
        ...reservation,
        account: {
          id: selectedAccount.id,
          name: selectedAccount.name
        }
      });
    }
  };

  const handleCreateAccount = (accountName: string) => {
    console.log('Create account:', accountName);
    setReservation({
      ...reservation,
      account: {
        id: Date.now().toString(), // Temporary ID
        name: accountName
      }
    });
  };

  return (
    <UserSessionSection
      {...props}
      reservation={reservation}
      onReservationUpdate={handleReservationUpdate}
      onAccountSelect={handleAccountSelect}
      onCreateAccount={handleCreateAccount}
    />
  );
};

export const GroupBooking: Story = {
  render: (args) => <UserSessionSectionWrapper {...args} />,
  args: {
    reservation: {
      ...baseReservation,
      humanReadableName: 'Tech Conference 2024',
      bookingType: BookingType.GROUP_BOOKING,
      account: {
        id: 'acc1',
        name: 'Acme Corp'
      }
    },
    existingAccounts: mockExistingAccounts
  }
};

export const TransientBooking: Story = {
  render: (args) => <UserSessionSectionWrapper {...args} />,
  args: {
    reservation: {
      ...baseReservation,
      humanReadableName: 'Business Trip Stay',
      bookingType: BookingType.TRANSIENT_BOOKING
    },
    existingAccounts: mockExistingAccounts
  }
};

export const LNRBooking: Story = {
  render: (args) => <UserSessionSectionWrapper {...args} />,
  args: {
    reservation: {
      ...baseReservation,
      humanReadableName: 'Local Negotiated Rate',
      bookingType: BookingType.LNR_BOOKING,
      account: {
        id: 'acc2',
        name: 'Globex Corporation'
      }
    },
    existingAccounts: mockExistingAccounts
  }
};

export const ExtendedStay: Story = {
  render: (args) => <UserSessionSectionWrapper {...args} />,
  args: {
    reservation: {
      ...baseReservation,
      humanReadableName: 'Long Term Project',
      bookingType: BookingType.EXTENDED_STAY,
      account: {
        id: 'acc3',
        name: 'Stark Industries'
      }
    },
    existingAccounts: mockExistingAccounts
  }
};

export const NoTitle: Story = {
  render: (args) => <UserSessionSectionWrapper {...args} />,
  args: {
    reservation: {
      ...baseReservation,
      bookingType: BookingType.GROUP_BOOKING
    },
    existingAccounts: mockExistingAccounts
  }
};

export const NoAccount: Story = {
  render: (args) => <UserSessionSectionWrapper {...args} />,
  args: {
    reservation: {
      ...baseReservation,
      humanReadableName: 'New Booking',
      bookingType: BookingType.TRANSIENT_BOOKING
    },
    existingAccounts: mockExistingAccounts
  }
}; 