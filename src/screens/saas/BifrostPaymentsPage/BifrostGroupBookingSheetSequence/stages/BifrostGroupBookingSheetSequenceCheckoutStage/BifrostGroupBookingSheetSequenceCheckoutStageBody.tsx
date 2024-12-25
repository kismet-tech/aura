import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/shadcn/checkbox";

interface Term {
  id: string;
  label: string;
  description: string;
}

interface BifrostGroupBookingSheetSequenceCheckoutStageBodyProps {
  initialAcceptedState?: boolean;
}

export function BifrostGroupBookingSheetSequenceCheckoutStageBody({
  initialAcceptedState = false
}: BifrostGroupBookingSheetSequenceCheckoutStageBodyProps) {
  const [acceptedTerms, setAcceptedTerms] = useState<Record<string, boolean>>({
    eventHoldPayment: initialAcceptedState,
    roomBlockTerms: initialAcceptedState
  });

  const [allTermsAccepted, setAllTermsAccepted] = useState(initialAcceptedState);

  // Update allTermsAccepted when individual terms change
  useEffect(() => {
    const areAllTermsAccepted = Object.values(acceptedTerms).every(value => value);
    setAllTermsAccepted(areAllTermsAccepted);
  }, [acceptedTerms]);

  const terms: Term[] = [
    {
      id: "eventHoldPayment",
      label: "Pay $100.00 Refundable Hold for Rehearsal Dinner",
      description: "This hold will be refunded if the event is not approved"
    },
    {
      id: "roomBlockTerms",
      label: "Accept Room Block Terms",
      description: "I understand the room block will be released 30 days before the event"
    }
  ];

  const handleAcceptAll = (checked: boolean) => {
    setAllTermsAccepted(checked);
    const newTermsState = Object.keys(acceptedTerms).reduce((acc, termId) => ({
      ...acc,
      [termId]: checked
    }), {});
    setAcceptedTerms(newTermsState);
  };

  return (
    <div className="space-y-8">
      {/* Payment and Terms Section */}
      <div className="space-y-4">
        {/* Accept All Header */}
        <div className="flex items-center gap-2 pb-2 border-b">
          <Checkbox 
            id="acceptAll"
            checked={allTermsAccepted}
            onCheckedChange={handleAcceptAll}
          />
          <h3 className="font-medium">
            <label 
              htmlFor="acceptAll" 
              className="cursor-pointer"
            >
              Accept All
            </label>
          </h3>
        </div>
        
        <div className="space-y-3 pl-6">
          {/* Individual Terms */}
          {terms.map((term) => (
            <div key={term.id} className="flex items-start gap-2">
              <Checkbox 
                id={term.id}
                checked={acceptedTerms[term.id]}
                onCheckedChange={(checked) => 
                  setAcceptedTerms(prev => ({
                    ...prev,
                    [term.id]: checked as boolean
                  }))
                }
              />
              <div>
                <label 
                  htmlFor={term.id} 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {term.label}
                </label>
                <p className="text-sm text-gray-500">
                  {term.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stripe Payment Component */}
      <div className="space-y-2">
        <h3 className="font-medium">Payment Details</h3>
        <div 
          className="h-[400px] w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
          aria-label="Stripe Payment Component"
        >
          <div className="text-center text-gray-500">
            <p className="font-medium">Stripe Payment Component</p>
            <p className="text-sm">300x400px</p>
            <p className="text-xs mt-2">TODO: Julian to integrate Stripe API here</p>
          </div>
        </div>
      </div>
    </div>
  );
} 