"use client";

import { useState, useEffect, useMemo } from "react";
import {
  WorkflowDetail as WorkflowDetailType,
  PendingSlot,
  ActionApproval,
} from "@/lib/types/workflow";
import { Button } from "@/components/ui/button";
import { WorkflowTimeline } from "./workflow-timeline";
import { ActionCard } from "./action-card";
import { WorkflowStatusBadge } from "./status-badge";
import { TimeSlotSelector, ConflictInfo } from "./time-slot-selector";
import { useCancelWorkflow, useApproveActions } from "@/lib/hooks/use-workflows";
import { ArrowLeft, Ban, Send } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useWorkflowStream } from "@/lib/hooks/use-workflow-stream";
import { useWorkflowWebSocket } from "@/lib/hooks/use-websocket";
import { toast } from "sonner";
import { parseUTCDate } from "@/lib/utils";

export function WorkflowDetail({ workflow }: { workflow: WorkflowDetailType }) {
  const cancelWorkflow = useCancelWorkflow();
  const approveActions = useApproveActions();
  const [wsSlots, setWsSlots] = useState<PendingSlot[]>([]);
  const [wsConflictInfo, setWsConflictInfo] = useState<ConflictInfo | null>(null);
  const [wsInaccessibleCalendars, setWsInaccessibleCalendars] = useState<string[]>([]);
  const [wsMessage, setWsMessage] = useState<string | undefined>();
  // Track approval decisions: action_id -> approved (true/false)
  const [approvalDecisions, setApprovalDecisions] = useState<Record<string, boolean>>({});
  const [isSelectingSlot, setIsSelectingSlot] = useState(false);

  // Real-time updates
  useWorkflowStream(workflow.id);
  const { messages, selectOption } = useWorkflowWebSocket(workflow.id);

  // Listen for slot_selection messages from WebSocket
  useEffect(() => {
    const slotMessage = messages.find((m) => m.type === "slot_selection");
    if (slotMessage?.data?.slots) {
      setWsSlots(slotMessage.data.slots as PendingSlot[]);
      setWsConflictInfo(slotMessage.data.conflict_info as ConflictInfo | null);
      setWsInaccessibleCalendars(slotMessage.data.inaccessible_calendars as string[] || []);
      setWsMessage(slotMessage.data.message as string | undefined);
    }
  }, [messages]);

  // Combine slots from API response and WebSocket (API takes precedence on initial load)
  const pendingSlots = useMemo(() => {
    // If we got slots from WebSocket, use those (they're more recent)
    if (wsSlots.length > 0) return wsSlots;
    // Otherwise use slots from API response
    return workflow.pending_slots || [];
  }, [wsSlots, workflow.pending_slots]);

  const handleSlotSelect = async (slotId: string) => {
    setIsSelectingSlot(true);
    try {
      selectOption(slotId);
      toast.success("Time slot selected! Processing...");
      setWsSlots([]);
    } catch {
      toast.error("Failed to select time slot");
    } finally {
      setIsSelectingSlot(false);
    }
  };

  // Get actions that require approval and are still pending
  const pendingApprovalActions = useMemo(() => {
    return workflow.actions?.filter(
      (action) => action.status === "pending" && action.requires_approval
    ) || [];
  }, [workflow.actions]);

  // Check if all pending actions have a decision
  const allActionsDecided = useMemo(() => {
    return pendingApprovalActions.length > 0 &&
      pendingApprovalActions.every((action) => action.id in approvalDecisions);
  }, [pendingApprovalActions, approvalDecisions]);

  // Count approved/rejected
  const decisionCounts = useMemo(() => {
    const approved = Object.values(approvalDecisions).filter(Boolean).length;
    const rejected = Object.values(approvalDecisions).filter((v) => v === false).length;
    return { approved, rejected, total: Object.keys(approvalDecisions).length };
  }, [approvalDecisions]);

  const handleActionDecision = (actionId: string, approved: boolean) => {
    setApprovalDecisions((prev) => ({ ...prev, [actionId]: approved }));
  };

  const handleClearDecision = (actionId: string) => {
    setApprovalDecisions((prev) => {
      const next = { ...prev };
      delete next[actionId];
      return next;
    });
  };

  const handleSubmitAllDecisions = () => {
    const actions: ActionApproval[] = Object.entries(approvalDecisions).map(
      ([action_id, approved]) => ({ action_id, approved })
    );

    if (actions.length === 0) {
      toast.error("No actions to submit");
      return;
    }

    approveActions.mutate(
      { workflowId: workflow.id, actions },
      {
        onSuccess: () => {
          toast.success(`Submitted ${actions.length} action decision(s)`);
          setApprovalDecisions({});
        },
        onError: () => {
          toast.error("Failed to submit action decisions");
        },
      }
    );
  };

  const handleApproveAll = () => {
    const decisions: Record<string, boolean> = {};
    pendingApprovalActions.forEach((action) => {
      decisions[action.id] = true;
    });
    setApprovalDecisions(decisions);
  };

  const handleRejectAll = () => {
    const decisions: Record<string, boolean> = {};
    pendingApprovalActions.forEach((action) => {
      decisions[action.id] = false;
    });
    setApprovalDecisions(decisions);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b pb-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="-ml-2">
            <Link href="/workflows">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              disabled={
                workflow.status === "completed" ||
                workflow.status === "failed" ||
                workflow.status === "cancelled" ||
                cancelWorkflow.isPending
              }
              onClick={() => cancelWorkflow.mutate(workflow.id)}
            >
              <Ban className="mr-2 h-4 w-4" />
              Cancel Workflow
            </Button>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {workflow.user_request}
            </h1>
            <p className="text-muted-foreground mt-1">
              {workflow.summary || "No summary yet."}
            </p>
          </div>
          <WorkflowStatusBadge status={workflow.status} />
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Created: {format(parseUTCDate(workflow.created_at), "PPP p")}</span>
          {workflow.completed_at && (
            <span>
              Completed: {format(parseUTCDate(workflow.completed_at), "PPP p")}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          {/* Time Slot Selection UI */}
          {pendingSlots.length > 0 && (
            <TimeSlotSelector
              slots={pendingSlots}
              onSelect={handleSlotSelect}
              isLoading={isSelectingSlot}
              message={wsMessage}
              conflictInfo={wsConflictInfo}
              inaccessibleCalendars={wsInaccessibleCalendars}
            />
          )}

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Actions</h2>
            {pendingApprovalActions.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleApproveAll}
                >
                  Approve All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRejectAll}
                >
                  Reject All
                </Button>
              </div>
            )}
          </div>

          {workflow.actions?.length === 0 ? (
            <div className="border border-dashed rounded-lg p-8 text-center text-muted-foreground">
              No actions generated yet. The AI is planning...
            </div>
          ) : (
            workflow.actions.map((action) => (
              <ActionCard
                key={action.id}
                action={action}
                workflowId={workflow.id}
                decision={approvalDecisions[action.id]}
                onDecision={(approved) => handleActionDecision(action.id, approved)}
                onClearDecision={() => handleClearDecision(action.id)}
              />
            ))
          )}

          {/* Batch Submit Button */}
          {decisionCounts.total > 0 && (
            <div className="sticky bottom-4 flex items-center justify-between bg-background border rounded-lg p-4 shadow-lg">
              <div className="text-sm text-muted-foreground">
                {decisionCounts.approved} approved, {decisionCounts.rejected} rejected
                {!allActionsDecided && pendingApprovalActions.length > decisionCounts.total && (
                  <span className="ml-1">
                    ({pendingApprovalActions.length - decisionCounts.total} remaining)
                  </span>
                )}
              </div>
              <Button
                onClick={handleSubmitAllDecisions}
                disabled={approveActions.isPending}
              >
                <Send className="mr-2 h-4 w-4" />
                Submit {decisionCounts.total} Decision{decisionCounts.total !== 1 ? "s" : ""}
              </Button>
            </div>
          )}
        </div>
        <div>
          <WorkflowTimeline logs={workflow.audit_logs || []} />
        </div>
      </div>
    </div>
  );
}
