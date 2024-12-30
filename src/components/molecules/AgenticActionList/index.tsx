import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export type AgenticActionStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

interface AgenticActionListProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

interface AgenticAction {
  title: string;
  description: string[];
  status: AgenticActionStatus;
}

const getStatusColor = (status: AgenticActionStatus): { bg: string; text: string } => {
  switch (status) {
    case 'pending':
      return { bg: 'bg-gray-100', text: 'text-gray-600' };
    case 'in_progress':
      return { bg: 'bg-blue-100', text: 'text-blue-600' };
    case 'completed':
      return { bg: 'bg-green-100', text: 'text-green-600' };
    case 'cancelled':
      return { bg: 'bg-red-100', text: 'text-red-600' };
  }
};

const getStatusDisplay = (status: AgenticActionStatus): string => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'in_progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
  }
};

const AGENTIC_ACTIONS: AgenticAction[] = [
  {
    title: 'Qualify Lead',
    description: [
      'Review submitted information for completeness',
      'Contact for missing room count details',
      'Verify event dates and flexibility'
    ],
    status: 'pending'
  },
  {
    title: 'Share Collateral',
    description: [
      'Prepare Wedding Weekend package information',
      'Include venue photos and floor plans',
      'Provide relevant PDFs and pricing guides'
    ],
    status: 'pending'
  },
  {
    title: 'Follow Up',
    description: [
      'Send proposal via email',
      'Confirm receipt of all materials',
      'Schedule follow-up call to discuss details'
    ],
    status: 'pending'
  },
  {
    title: 'Contract',
    description: [
      'Generate initial contract draft',
      'Update terms based on contact feedback',
      'Finalize and send for signature'
    ],
    status: 'pending'
  },
  {
    title: 'Request BEO Review',
    description: [
      'Contact @Chef Don for menu review',
      'Confirm dietary requirements',
      'Update BEO with final selections'
    ],
    status: 'pending'
  },
  {
    title: 'Confirm Pricing',
    description: [
      'Contact @RevenueMgt for pricing review',
      'Obtain sign-off on final rates',
      'Update contract with approved pricing'
    ],
    status: 'pending'
  }
] as const;

export const AgenticActionList: React.FC<AgenticActionListProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [actions, setActions] = React.useState<AgenticAction[]>(AGENTIC_ACTIONS);

  const handleCancel = (index: number) => {
    setActions(actions.map((action, i) => 
      i === index ? { ...action, status: 'cancelled' as AgenticActionStatus } : action
    ));
  };

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

          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <div className="space-y-4">
              {actions.map((action, index) => (
                <div key={action.title} className="relative group flex items-start gap-4 p-4 bg-white rounded-lg border hover:border-gray-300 transition-colors">
                  <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{action.title}</h3>
                        <ul className="mt-1 space-y-0.5">
                          {action.description.map((item, i) => (
                            <li key={i} className="text-xs text-gray-600 flex items-start">
                              <span className="mr-2 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm px-2 py-0.5 rounded-full ${getStatusColor(action.status).bg} ${getStatusColor(action.status).text}`}>
                          {getStatusDisplay(action.status)}
                        </span>
                        {action.status !== 'cancelled' && (
                          <button
                            onClick={() => handleCancel(index)}
                            className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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