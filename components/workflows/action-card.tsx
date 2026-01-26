"use client";

import { Action } from "@/lib/types/workflow";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ActionStatusBadge } from "./status-badge";
import { Button } from "@/components/ui/button";
import { Check, X, RotateCcw, Pencil, Trash } from "lucide-react";
import { ActionEditDialog } from "./action-edit-dialog";
// Will implement dialogs later
import { useState } from "react";
import { useApproveActions, useRemoveAction } from "@/lib/hooks/use-workflows";
import { toast } from "sonner";

export function ActionCard({
  action,
  workflowId,
}: {
  action: Action;
  workflowId: string;
}) {
  const approveAction = useApproveActions();
  const removeAction = useRemoveAction();

  const handleApprove = () => {
    approveAction.mutate(
      { workflowId, actions: [{ action_id: action.id, approved: true }] },
      {
        onSuccess: () => toast.success("Action approved"),
      },
    );
  };

  const handleReject = () => {
    approveAction.mutate(
      { workflowId, actions: [{ action_id: action.id, approved: false }] },
      {
        onSuccess: () => toast.success("Action rejected"),
      },
    );
  };

  const handleRemove = () => {
    if (confirm("Are you sure you want to remove this action?")) {
      removeAction.mutate(
        { workflowId, actionId: action.id },
        {
          onSuccess: () => toast.success("Action removed"),
        },
      );
    }
  };

  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-base font-medium">
            {action.title}
          </CardTitle>
          <span className="text-xs text-muted-foreground font-mono">
            {action.action_type}
          </span>
        </div>
        <ActionStatusBadge status={action.status} />
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">{action.description}</p>
        <div className="mt-4 rounded-md bg-muted p-2">
          <pre className="text-xs overflow-x-auto">
            {JSON.stringify(action.payload, null, 2)}
          </pre>
        </div>
        {action.error_message && (
          <div className="mt-2 text-sm text-destructive bg-destructive/10 p-2 rounded">
            Error: {action.error_message}
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-end gap-2 pt-2">
        {action.status === "pending" && action.requires_approval ? (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReject}
              disabled={approveAction.isPending}
            >
              <X className="mr-2 h-4 w-4" /> Reject
            </Button>
            <Button
              size="sm"
              onClick={handleApprove}
              disabled={approveAction.isPending}
            >
              <Check className="mr-2 h-4 w-4" /> Approve
            </Button>
            <ActionEditDialog action={action} workflowId={workflowId} />
          </>
        ) : null}

        {(action.status === "pending" || action.status === "failed") && (
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:text-destructive"
            onClick={handleRemove}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
