import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { EventNameEditor } from '@/components/molecules/EventNameEditor';
import { PlannerStatus, EventStatus } from '@/components/molecules/Planners/PlannerStatusSaaS';
import { PlannerDateTime } from '@/components/molecules/Planners/PlannerDateTimeSaaS';
import { PlannerHost, VisibilityType, PaymentSplitType } from '@/components/molecules/Planners/PlannerHostSaaS';
import { PlannerGuests } from '@/components/molecules/Planners/PlannerGuestsSaaS';
import { PlannerVenue } from '@/components/molecules/Planners/PlannerVenueSaaS';
import { PlannerFinancials } from '@/components/molecules/Planners/PlannerFinancialsSaaS';
import { PlannerPublicNotes } from '@/components/molecules/Planners/PlannerPublicNotesSaaS';
import { PlannerPrivateNotes } from '@/components/molecules/Planners/PlannerPrivateNotesSaaS';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

interface EventData {
  name?: string;
  status?: EventStatus;
  startDate?: Date | null;
  endDate?: Date | null;
  guestCount?: number;
  venues?: string[];
  priceInCents?: number;
  undiscountedPriceInCents?: number;
  pricePerHourInCents?: number;
  altFoodBevPriceInCents?: number;
  paymentSplitType?: PaymentSplitType;
  visibility?: VisibilityType;
  publicNotes?: string;
  privateNotes?: string;
}

export type { EventData };

export interface ModifyEventOfferProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: EventData) => void;
  initialData?: EventData;
  defaultOpen?: boolean;
}

export const ModifyEventOffer: React.FC<ModifyEventOfferProps> = ({
  open,
  onOpenChange,
  onSave,
  initialData,
  defaultOpen = true
}) => {
  const [data, setData] = React.useState<EventData>(initialData || {
    status: 'PROSPECT' as EventStatus,
    paymentSplitType: 'SINGLE_PAYER' as PaymentSplitType,
    visibility: 'PUBLIC' as VisibilityType,
    guestCount: 0
  });

  const [selectedVenues, setSelectedVenues] = React.useState<string[]>(data.venues || []);

  React.useEffect(() => {
    if (selectedVenues !== data.venues) {
      handleChange('venues', selectedVenues);
    }
  }, [selectedVenues]);

  const handleChange = (field: keyof EventData, value: EventData[keyof EventData]) => {
    setData(prev => ({ ...prev, [field]: value }));
    onSave?.({ ...data, [field]: value });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <ResizablePanelGroup direction="horizontal">
          <ResizableHandle withHandle className="absolute left-0 h-full" />
          <ResizablePanel defaultSize={100} minSize={30} maxSize={95}>
            <div className="max-h-[95vh] overflow-y-auto">
              <DrawerHeader className="sticky top-0 bg-white z-10">
                <DrawerTitle>Add Event Offer</DrawerTitle>
                <DrawerDescription>
                  Create a new event offer here. Click save when you're done.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 space-y-6">
                <EventNameEditor
                  initialName={data.name}
                  onChange={(value) => handleChange('name', value)}
                />
                <PlannerStatus
                  initialStatus={data.status}
                  onChange={(value) => handleChange('status', value)}
                  open={defaultOpen}
                  onOpenChange={(open) => {}}
                />
                <PlannerDateTime
                  initialStartDate={data.startDate}
                  initialEndDate={data.endDate}
                  onChange={(dates) => {
                    handleChange('startDate', dates.startDate);
                    handleChange('endDate', dates.endDate);
                  }}
                  open={defaultOpen}
                  onOpenChange={(open) => {}}
                />
                <PlannerHost
                  initialVisibility={data.visibility}
                  initialPaymentSplitType={data.paymentSplitType}
                  onChange={(values) => {
                    handleChange('visibility', values.visibility);
                    handleChange('paymentSplitType', values.paymentSplitType);
                  }}
                  open={defaultOpen}
                  onOpenChange={(open) => {}}
                />
                <PlannerGuests
                  initialGuestCount={data.guestCount}
                  onChange={(value) => handleChange('guestCount', value)}
                  open={defaultOpen}
                  onOpenChange={(open) => {}}
                />
                <PlannerVenue
                  guestCount={data.guestCount || 0}
                  initialVenues={data.venues}
                  onChange={(venues) => handleChange('venues', venues)}
                  open={defaultOpen}
                  onOpenChange={(open) => {}}
                />
                <PlannerFinancials
                  initialPriceInCents={data.priceInCents}
                  initialUndiscountedPriceInCents={data.undiscountedPriceInCents}
                  initialPricePerHourInCents={data.pricePerHourInCents}
                  initialAltFoodBevPriceInCents={data.altFoodBevPriceInCents}
                  paymentSplitType={data.paymentSplitType || 'SINGLE_PAYER'}
                  onChange={(values) => {
                    handleChange('priceInCents', values.priceInCents);
                    handleChange('undiscountedPriceInCents', values.undiscountedPriceInCents);
                    handleChange('pricePerHourInCents', values.pricePerHourInCents);
                    handleChange('altFoodBevPriceInCents', values.altFoodBevPriceInCents);
                  }}
                  open={defaultOpen}
                  onOpenChange={(open) => {}}
                />
                <PlannerPublicNotes
                  initialNotes={data.publicNotes}
                  onChange={(value) => handleChange('publicNotes', value)}
                  open={defaultOpen}
                  onOpenChange={(open) => {}}
                />
                <PlannerPrivateNotes
                  initialNotes={data.privateNotes}
                  onChange={(value) => handleChange('privateNotes', value)}
                  open={defaultOpen}
                  onOpenChange={(open) => {}}
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </DrawerContent>
    </Drawer>
  );
}; 