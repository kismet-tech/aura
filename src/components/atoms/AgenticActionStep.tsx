import React from 'react';

interface AgenticActionStepProps {
  number: number;
  title: string;
  description: string;
}

export const AgenticActionStep: React.FC<AgenticActionStepProps> = ({
  number,
  title,
  description,
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
        {number}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}; 