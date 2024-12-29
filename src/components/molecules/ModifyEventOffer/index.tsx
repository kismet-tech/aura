import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { EventNameEditor } from '@/components/molecules/EventNameEditor';
import { PlannerStatus } from '@/components/molecules/Planners/PlannerStatusSaaS';
import { PlannerDateTime } from '@/components/molecules/Planners/PlannerDateTimeSaaS';
import { PlannerHost, VisibilityType, PaymentSplitType } from '@/components/molecules/Planners/PlannerHostSaaS';
import { PlannerGuests } from '@/components/molecules/Planners/PlannerGuestsSaaS';
import { PlannerVenue } from '@/components/molecules/Planners/PlannerVenueSaaS';
import { PlannerFinancials } from '@/components/molecules/Planners/PlannerFinancialsSaaS';
import { PlannerPublicNotes } from '@/components/molecules/Planners/PlannerPublicNotesSaaS';
import { PlannerPrivateNotes } from '@/components/molecules/Planners/PlannerPrivateNotesSaaS';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/shadcn/button";
import { X, Trash2 } from "lucide-react";
import { HotelEventOfferStatus } from "@kismet_ai/foundation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shadcn/alert-dialog";

interface EventData {
  name?: string;
  status?: HotelEventOfferStatus;
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
  onDelete?: () => void;
  initialData?: EventData;
  defaultOpen?: boolean;
}

export const ModifyEventOffer: React.FC<ModifyEventOfferProps> = ({
  open,
  onOpenChange,
  onSave,
  onDelete,
  initialData,
  defaultOpen = true
}) => {
  const [data, setData] = React.useState<EventData>(initialData || {
    status: HotelEventOfferStatus.PROSPECT,
    paymentSplitType: 'SINGLE_PAYER' as PaymentSplitType,
    visibility: 'PUBLIC' as VisibilityType,
    guestCount: 0
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = React.useState(false);

  React.useEffect(() => {
    if (initialData) {
      setData(initialData);
      setHasUnsavedChanges(false);
    }
  }, [initialData]);

  const [selectedVenues, setSelectedVenues] = React.useState<string[]>(data.venues || []);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [componentStates, setComponentStates] = React.useState({
    status: defaultOpen,
    dateTime: defaultOpen,
    host: defaultOpen,
    guests: defaultOpen,
    venue: defaultOpen,
    financials: defaultOpen,
    publicNotes: defaultOpen,
    privateNotes: defaultOpen
  });

  // Handle drawer close attempts
  const handleDrawerClose = (open: boolean) => {
    if (!open && hasUnsavedChanges) {
      setShowUnsavedDialog(true);
      return;
    }
    onOpenChange(open);
  };

  const handleCloseClick = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedDialog(true);
      return;
    }
    onOpenChange(false);
  };

  const handleConfirmClose = () => {
    // Save changes before closing
    onSave?.(data);
    setHasUnsavedChanges(false);
    setShowUnsavedDialog(false);
    onOpenChange(false);
  };

  const handleCancelClose = () => {
    setShowUnsavedDialog(false);
  };

  React.useEffect(() => {
    if (selectedVenues !== data.venues) {
      handleChange('venues', selectedVenues);
    }
  }, [selectedVenues]);

  const handleChange = (field: keyof EventData, value: EventData[keyof EventData]) => {
    setHasUnsavedChanges(true);
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleDelete = () => {
    onDelete?.();
    setShowDeleteDialog(false);
    setHasUnsavedChanges(false);
    onOpenChange(false);
  };

  const handleComponentOpenChange = (component: keyof typeof componentStates, isOpen: boolean) => {
    setComponentStates(prev => ({
      ...prev,
      [component]: isOpen
    }));
  };

  // Reset unsaved changes when drawer closes
  React.useEffect(() => {
    if (!open) {
      setHasUnsavedChanges(false);
    }
  }, [open]);

  return (
    <>
      <Drawer 
        open={open} 
        onOpenChange={handleDrawerClose}
        modal={true}
      >
        <DrawerContent>
          <ResizablePanelGroup direction="horizontal">
            <ResizableHandle withHandle className="absolute left-0 h-full" />
            <ResizablePanel defaultSize={100} minSize={30} maxSize={95}>
              <div className="max-h-[95vh] overflow-y-auto">
                <DrawerHeader className="sticky top-0 bg-white z-10">
                  <div className="flex justify-between items-center">
                    <div>
                      <DrawerTitle>Event Editor</DrawerTitle>
                      <DrawerDescription>
                        Edit or create an event here.
                        {hasUnsavedChanges && <span className="text-yellow-600 ml-2">(Unsaved changes)</span>}
                      </DrawerDescription>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      {hasUnsavedChanges ? (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={handleCloseClick}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={handleConfirmClose}
                          >
                            Save
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-gray-100"
                            onClick={() => setShowDeleteDialog(true)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-gray-100"
                            onClick={handleCloseClick}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </DrawerHeader>
                <div className="p-4 space-y-6">
                  <EventNameEditor
                    initialName={data.name}
                    onChange={(value) => handleChange('name', value)}
                  />
                  <PlannerStatus
                    initialStatus={data.status}
                    onChange={(value) => handleChange('status', value)}
                    open={componentStates.status}
                    onOpenChange={(open) => handleComponentOpenChange('status', open)}
                  />
                  <PlannerDateTime
                    initialStartDate={data.startDate}
                    initialEndDate={data.endDate}
                    onChange={(dates) => {
                      handleChange('startDate', dates.startDate);
                      handleChange('endDate', dates.endDate);
                    }}
                    open={componentStates.dateTime}
                    onOpenChange={(open) => handleComponentOpenChange('dateTime', open)}
                  />
                  <PlannerHost
                    initialVisibility={data.visibility}
                    initialPaymentSplitType={data.paymentSplitType}
                    onChange={(values) => {
                      handleChange('visibility', values.visibility);
                      handleChange('paymentSplitType', values.paymentSplitType);
                    }}
                    open={componentStates.host}
                    onOpenChange={(open) => handleComponentOpenChange('host', open)}
                  />
                  <PlannerGuests
                    initialGuestCount={data.guestCount}
                    onChange={(value) => handleChange('guestCount', value)}
                    open={componentStates.guests}
                    onOpenChange={(open) => handleComponentOpenChange('guests', open)}
                  />
                  <PlannerVenue
                    guestCount={data.guestCount || 0}
                    initialVenues={data.venues}
                    onChange={(venues) => handleChange('venues', venues)}
                    open={componentStates.venue}
                    onOpenChange={(open) => handleComponentOpenChange('venue', open)}
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
                    open={componentStates.financials}
                    onOpenChange={(open) => handleComponentOpenChange('financials', open)}
                  />
                  <PlannerPublicNotes
                    initialNotes={data.publicNotes}
                    onChange={(value) => handleChange('publicNotes', value)}
                    open={componentStates.publicNotes}
                    onOpenChange={(open) => handleComponentOpenChange('publicNotes', open)}
                  />
                  <PlannerPrivateNotes
                    initialNotes={data.privateNotes}
                    onChange={(value) => handleChange('privateNotes', value)}
                    open={componentStates.privateNotes}
                    onOpenChange={(open) => handleComponentOpenChange('privateNotes', open)}
                  />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </DrawerContent>
      </Drawer>

      {/* Unsaved Changes Dialog */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You have unsaved changes</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to save your changes before closing?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClose}>Save & Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event offer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}; 