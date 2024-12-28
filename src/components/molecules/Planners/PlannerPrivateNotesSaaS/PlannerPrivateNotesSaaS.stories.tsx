import type { Meta, StoryObj } from '@storybook/react';
import { PlannerPrivateNotes, User, PlannerPrivateNotesProps } from '.';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jason Cincotta',
    email: 'jason@kismet.com',
  },
  {
    id: '2',
    name: 'Sudhanshu Pandey',
    email: 'sudhanshu@kismet.com',
  },
  {
    id: '3',
    name: 'Julian Trajanson',
    email: 'julian@kismet.com',
  },
  {
    id: '4',
    name: 'Addison Hanrattie',
    email: 'addison@kismet.com',
  }
];

const meta = {
  title: 'Molecules/Planners/PlannerPrivateNotes',
  component: PlannerPrivateNotes,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<PlannerPrivateNotesProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    users: mockUsers,
    onChange: (notes: string, mentionedUsers?: User[]) => console.log('Notes changed:', notes, 'Mentioned users:', mentionedUsers),
  }
}; 