import React from 'react';
import { X } from 'lucide-react';

export type AgenticActionStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

interface AgenticActionStepProps {
  number: number;
  title: string;
  description: string[];
  status: AgenticActionStatus;
  onCancel: () => void;
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

export const AgenticActionStep: React.FC<AgenticActionStepProps> = ({
  number,
  title,
  description,
  status = 'pending',
  onCancel
}) => {
  const { bg, text } = getStatusColor(status);

  return (
    <div className="relative group flex items-start gap-4 p-4 bg-white rounded-lg border hover:border-gray-300 transition-colors">
      <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold shrink-0">
        {number}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{title}</h3>
            <ul className="mt-1 space-y-1">
              {description.map((item, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm px-2 py-0.5 rounded-full ${bg} ${text}`}>
              {getStatusDisplay(status)}
            </span>
            {status !== 'cancelled' && (
              <button
                onClick={onCancel}
                className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 