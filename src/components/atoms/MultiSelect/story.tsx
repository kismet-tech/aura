import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from ".";

const meta: Meta<typeof MultiSelect> = {
  title: "Atoms/MultiSelect",
  component: MultiSelect,
};
export default meta;

type Story = StoryObj<typeof MultiSelect>;

const DEMO_OPTIONS = [
  { id: '1', name: 'Option One' },
  { id: '2', name: 'Option Two' }, 
  { id: '3', name: 'Option Three' },
  { id: '4', name: 'Option Four' },
  { id: '5', name: 'Option Five' },
  { id: '6', name: 'Option Six' }
];

const DEMO_VENUES = [
  { id: '1', name: 'Ballroom' },
  { id: '2', name: 'Great Hall' }, 
  { id: '3', name: 'Lobby' },
  { id: '4', name: 'Lounge' },
  { id: '5', name: 'Meeting Room A' },
  { id: '6', name: 'Meeting Room B' }
];

const MultiSelectStory = ({ 
  options, 
  label, 
  placeholder, 
  groupLabel,
  initialSelectedIds = []
}: {
  options: typeof DEMO_OPTIONS,
  label?: string,
  placeholder?: string,
  groupLabel?: string,
  initialSelectedIds?: string[]
}) => {
  const [selectedIds, setSelectedIds] = React.useState<string[]>(initialSelectedIds);

  const handleToggle = (id: string) => {
    setSelectedIds(current => 
      current.includes(id)
        ? current.filter(currentId => currentId !== id)
        : [...current, id]
    );
  };

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <MultiSelect
        options={options}
        selectedIds={selectedIds}
        onToggle={handleToggle}
        label={label}
        placeholder={placeholder}
        groupLabel={groupLabel}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <MultiSelectStory options={DEMO_OPTIONS} />
};

export const WithPreselectedItems: Story = {
  render: () => (
    <MultiSelectStory 
      options={DEMO_OPTIONS}
      initialSelectedIds={['1', '3']}
    />
  )
};

export const VenueSelect: Story = {
  render: () => (
    <MultiSelectStory 
      options={DEMO_VENUES}
      label="Select Venues"
      placeholder="Select venues..."
      groupLabel="Available Venues"
    />
  )
}; 