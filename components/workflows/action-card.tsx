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
import { Check, X, Undo2, Trash } from "lucide-react";
import { ActionEditDialog } from "./action-edit-dialog";
import { useRemoveAction } from "@/lib/hooks/use-workflows";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  action: Action;
  workflowId: string;
  /** The current decision for this action (true=approved, false=rejected, undefined=no decision) */
  decision?: boolean;
  /** Callback when user makes a decision */
  onDecision?: (approved: boolean) => void;
  /** Callback when user clears their decision */
  onClearDecision?: () => void;
}

export function ActionCard({
  action,
  workflowId,
  decision,
  onDecision,
  onClearDecision,
}: ActionCardProps) {
  const removeAction = useRemoveAction();

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

  const hasDecision = decision !== undefined;

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
      <CardFooter className="justify-between gap-2 pt-2">
        {/* Show decision indicator if a decision has been made */}
        {action.status === "pending" && action.requires_approval && hasDecision && (
          <div className={cn(
            "flex items-center gap-2 text-sm font-medium",
            decision ? "text-green-600" : "text-red-600"
          )}>
            {decision ? (
              <>
                <Check className="h-4 w-4" />
                Marked for approval
              </>
            ) : (
              <>
                <X className="h-4 w-4" />
                Marked for rejection
              </>
            )}
          </div>
        )}

        {/* Spacer when no decision indicator */}
        {!(action.status === "pending" && action.requires_approval && hasDecision) && <div />}

        <div className="flex items-center gap-2">
          {action.status === "pending" && action.requires_approval ? (
            hasDecision ? (
              /* Show undo button when decision is made */
              <Button
                size="sm"
                variant="outline"
                onClick={onClearDecision}
              >
                <Undo2 className="mr-2 h-4 w-4" /> Undo
              </Button>
            ) : (
              /* Show approve/reject buttons when no decision yet */
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDecision?.(false)}
                >
                  <X className="mr-2 h-4 w-4" /> Reject
                </Button>
                <Button
                  size="sm"
                  onClick={() => onDecision?.(true)}
                >
                  <Check className="mr-2 h-4 w-4" /> Approve
                </Button>
                <ActionEditDialog action={action} workflowId={workflowId} />
              </>
            )
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
        </div>
      </CardFooter>
    </Card>
  );
}
