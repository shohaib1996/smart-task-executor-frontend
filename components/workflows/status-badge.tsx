import { Badge } from "@/components/ui/badge";
import { WorkflowStatus, ActionStatus } from "@/lib/types/workflow";

const workflowStatusConfig: Record<
  WorkflowStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  pending: { label: "Pending", variant: "secondary" },
  investigating: { label: "Investigating", variant: "default" },
  awaiting_approval: { label: "Awaiting Approval", variant: "outline" },
  executing: { label: "Executing", variant: "default" },
  completed: { label: "Completed", variant: "default" },
  failed: { label: "Failed", variant: "destructive" },
  cancelled: { label: "Cancelled", variant: "secondary" },
};

const actionStatusConfig: Record<
  ActionStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  pending: { label: "Pending", variant: "secondary" },
  approved: { label: "Approved", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
  executing: { label: "Executing", variant: "default" },
  completed: { label: "Completed", variant: "default" },
  failed: { label: "Failed", variant: "destructive" },
  skipped: { label: "Skipped", variant: "secondary" },
};

export function WorkflowStatusBadge({ status }: { status: WorkflowStatus }) {
  const config = workflowStatusConfig[status] || {
    label: status,
    variant: "secondary",
  };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function ActionStatusBadge({ status }: { status: ActionStatus }) {
  const config = actionStatusConfig[status] || {
    label: status,
    variant: "secondary",
  };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
