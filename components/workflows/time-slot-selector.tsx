"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, CalendarDays, Check, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSlot {
  id: string;
  start: string;
  end: string;
  duration_minutes: number;
}

export interface ConflictInfo {
  requested_start: string;
  requested_end: string;
  conflicting_calendars: string[];
  reason: string;
}

interface TimeSlotSelectorProps {
  slots: TimeSlot[];
  onSelect: (slotId: string) => void;
  isLoading?: boolean;
  /** Message to display (e.g., "Please select a time slot" or conflict explanation) */
  message?: string;
  /** Conflict information if user's preferred time wasn't available */
  conflictInfo?: ConflictInfo | null;
  /** List of attendee emails whose calendars couldn't be accessed */
  inaccessibleCalendars?: string[];
}

export function TimeSlotSelector({
  slots,
  onSelect,
  isLoading,
  message,
  conflictInfo,
  inaccessibleCalendars,
}: TimeSlotSelectorProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleSelect = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleConfirm = () => {
    if (selectedSlot) {
      onSelect(selectedSlot);
    }
  };

  return (
    <Card className="border-primary/50 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarDays className="h-5 w-5" />
          Select a Time Slot
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {message || "Choose your preferred meeting time from the available slots below."}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Show conflict alert if preferred time wasn't available */}
        {conflictInfo && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <span className="font-medium">Your preferred time is not available.</span>{" "}
              {conflictInfo.reason}
            </AlertDescription>
          </Alert>
        )}

        {/* Show info about inaccessible calendars */}
        {inaccessibleCalendars && inaccessibleCalendars.length > 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Could not check availability for: {inaccessibleCalendars.join(", ")}.
              Their calendars are private or not on Google.
            </AlertDescription>
          </Alert>
        )}
        <div className="grid gap-2">
          {slots.map((slot) => {
            const startDate = new Date(slot.start);
            const endDate = new Date(slot.end);
            const isSelected = selectedSlot === slot.id;

            return (
              <button
                key={slot.id}
                onClick={() => handleSelect(slot.id)}
                disabled={isLoading}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border text-left transition-all",
                  "hover:border-primary/50 hover:bg-primary/5",
                  isSelected
                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                    : "border-border bg-background"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {isSelected ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {format(startDate, "EEEE, MMMM d, yyyy")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(startDate, "h:mm a")} - {format(endDate, "h:mm a")}{" "}
                      ({slot.duration_minutes} min)
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <Button
          onClick={handleConfirm}
          disabled={!selectedSlot || isLoading}
          className="w-full"
        >
          {isLoading ? "Confirming..." : "Confirm Selection"}
        </Button>
      </CardContent>
    </Card>
  );
}
