import React from "react";

interface BifrostGroupBookingSheetSequenceCartContentScrollProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function BifrostGroupBookingSheetSequenceCartContentScroll({
  children,
  title,
  description
}: BifrostGroupBookingSheetSequenceCartContentScrollProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex overflow-x-auto pb-4 gap-4 -mx-6 px-6">
        {children}
      </div>
    </div>
  );
} 