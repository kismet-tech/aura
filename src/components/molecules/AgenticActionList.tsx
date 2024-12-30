import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { AgenticActionStep } from '@/components/atoms/AgenticActionStep';

interface AgenticActionListProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AGENTIC_ACTIONS = [
  {
    title: 'Process Lead Information',
    description: 'Analyze and categorize incoming lead details for efficient processing'
  },
  {
    title: 'Schedule Follow-ups',
    description: 'Automatically schedule and manage follow-up communications'
  },
  {
    title: 'Generate Proposals',
    description: 'Create and send customized booking proposals based on lead requirements'
  },
  {
    title: 'Handle Instant Booking',
    description: 'Process and confirm bookings instantly when requirements are met'
  }
] as const;

export const AgenticActionList: React.FC<AgenticActionListProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Enable Agentic Actions</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <p className="text-gray-600">
            By enabling agentic actions, you are allowing Kismet to automatically:
          </p>

          <div className="space-y-4">
            {AGENTIC_ACTIONS.map((action, index) => (
              <AgenticActionStep
                key={action.title}
                number={index + 1}
                title={action.title}
                description={action.description}
              />
            ))}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            Note: You can disable these automated actions at any time by toggling the agent off.
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              className="bg-white"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={onConfirm}
            >
              Enable Agent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 