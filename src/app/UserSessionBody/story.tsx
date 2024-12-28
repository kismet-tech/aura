import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import UserSessionBody from './page';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof UserSessionBody> = {
  title: 'Pages/UserSessionBody',
  component: UserSessionBody,
  parameters: {
    layout: 'fullscreen',
  },
  render: function Render(args) {
    const [{ contact }, updateArgs] = useArgs();

    const handleContactUpdate = (updatedContact: NonNullable<typeof contact>) => {
      updateArgs({ contact: updatedContact });
    };

    const handleHostSelect = (contactId: string) => {
      const selectedContact = defaultData.existingContacts.find(c => c.id === contactId);
      if (selectedContact) {
        // Convert the selected contact to the full contact format
        updateArgs({
          contact: {
            firstName: selectedContact.name.split(' ')[0],
            lastName: selectedContact.name.split(' ')[1] || '',
            email: selectedContact.email,
            imageUrl: `https://i.pravatar.cc/300?u=${selectedContact.email}`,
            phone: selectedContact.phone || '+1 (555) 000-0000',
          }
        });
      }
    };

    const handleCreateHost = (nameOrEmail: string) => {
      // Determine if input is email or name
      const isEmail = nameOrEmail.includes('@');
      
      if (isEmail) {
        // If email was provided, only include email
        updateArgs({
          contact: {
            email: nameOrEmail,
            // firstName/lastName will be undefined, triggering "add name" in the UI
          }
        });
      } else {
        // If name was provided, parse it into first/last name
        const parts = nameOrEmail.split(' ');
        updateArgs({
          contact: {
            firstName: parts[0],
            lastName: parts[1] || '',
            // email will be undefined, triggering "add email" in the UI
          }
        });
      }
    };

    return (
      <div className="p-4">
        <UserSessionBody 
          {...args} 
          onHostSelect={handleHostSelect}
          onCreateHost={handleCreateHost}
          onContactUpdate={handleContactUpdate}
        />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof UserSessionBody>;

const defaultData = {
  reservation: {
    title: "Summer Conference 2024",
    status: "confirmed" as const,
    dateRange: {
      start: "2024-07-15",
      end: "2024-07-20",
    },
    leadScore: 85,
    isQualified: true,
    intentScore: 90,
    assignedSalesAgent: {
      name: "Sarah Johnson",
      id: "sj123",
    },
    publicNotes: "Large tech conference with specific AV requirements. Attendees coming from multiple countries.",
    privateNotes: "VIP client - ensure premium service. Previous successful events in 2022 and 2023.",
  },
  contact: {
    firstName: "Michael",
    lastName: "Chen",
    imageUrl: "https://i.pravatar.cc/300?u=michael_chen",
    dataSources: [
      { type: "LinkedIn" as const, url: "https://linkedin.com/in/michaelchen" },
      { type: "WhatsApp" as const, url: "https://wa.me/1234567890" },
    ],
    phone: "+1 (555) 123-4567",
    email: "michael.chen@techcorp.com",
    address: "123 Innovation Drive, Silicon Valley, CA 94025",
    company: "TechCorp International",
    role: "Director of Events",
    lastContact: "2024-01-15",
    preferredContactMethod: "Email",
    timezone: "PST",
    bio: "Experienced event coordinator with over 10 years in the tech industry. Specializes in large-scale conferences and corporate events.",
    notes: "Prefers early morning meetings. Has specific requirements for AV setup.",
  },
  existingContacts: [
    {
      id: "1",
      name: "Michael Chen",
      email: "michael.chen@techcorp.com",
      phone: "+1 (555) 123-4567",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 234-5678",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.j@company.com",
      phone: "+1 (555) 345-6789",
    },
  ],
};

export const Default: Story = {
  args: defaultData,
};

export const PendingReservation: Story = {
  args: {
    ...defaultData,
    reservation: {
      ...defaultData.reservation,
      status: "pending",
      leadScore: 60,
      isQualified: false,
      intentScore: 45,
    },
  },
};

export const CancelledReservation: Story = {
  args: {
    ...defaultData,
    reservation: {
      ...defaultData.reservation,
      status: "cancelled",
      leadScore: 0,
      isQualified: false,
      intentScore: 0,
    },
  },
};

export const MinimalContact: Story = {
  args: {
    ...defaultData,
    contact: {
      firstName: "Jane",
      lastName: "Smith",
      imageUrl: "https://i.pravatar.cc/300?u=jane_smith",
      email: "jane.smith@example.com",
    },
  },
};

export const FromScratch: Story = {
  args: {
    reservation: {
      title: "",
      status: "pending",
      leadScore: 0,
      isQualified: false,
      intentScore: 0,
      assignedSalesAgent: {
        name: "Unassigned",
        id: "",
      },
      publicNotes: "",
      privateNotes: "",
    },
    existingContacts: defaultData.existingContacts,
  },
}; 