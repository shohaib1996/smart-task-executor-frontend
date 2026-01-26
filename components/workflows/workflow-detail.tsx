"use client";

import { WorkflowDetail as WorkflowDetailType } from "@/lib/types/workflow";
import { Button } from "@/components/ui/button";
import { WorkflowTimeline } from "./workflow-timeline";
import { ActionCard } from "./action-card";
import { WorkflowStatusBadge } from "./status-badge";
import { useCancelWorkflow } from "@/lib/hooks/use-workflows";
import { ArrowLeft, Ban } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useWorkflowStream } from "@/lib/hooks/use-workflow-stream";
import { useWorkflowWebSocket } from "@/lib/hooks/use-websocket";

export function WorkflowDetail({ workflow }: { workflow: WorkflowDetailType }) {
  const cancelWorkflow = useCancelWorkflow();

  // Real-time updates
  useWorkflowStream(workflow.id);
  useWorkflowWebSocket(workflow.id);

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
          <span>Created: {format(new Date(workflow.created_at), "PPP p")}</span>
          {workflow.completed_at && (
            <span>
              Completed: {format(new Date(workflow.completed_at), "PPP p")}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Actions</h2>
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
              />
            ))
          )}
        </div>
        <div>
          <WorkflowTimeline logs={workflow.audit_logs || []} />
        </div>
      </div>
    </div>
  );
}
