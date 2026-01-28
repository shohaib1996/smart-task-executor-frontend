import { WorkflowStatus, ActionStatus } from "@/lib/types/workflow";
import { cn } from "@/lib/utils";

const workflowStatusConfig: Record<
  WorkflowStatus,
  {
    label: string;
    className: string;
  }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-[#dec9e9] text-[#6247aa] dark:bg-[#9163cb]/30 dark:text-[#e8daf0]",
  },
  investigating: {
    label: "Investigating",
    className:
      "bg-[#c19ee0] text-[#6247aa] dark:bg-[#9163cb]/50 dark:text-[#f0e6f6] animate-pulse",
  },
  awaiting_approval: {
    label: "Awaiting Approval",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-500/25 dark:text-amber-200 border border-amber-300 dark:border-amber-500/50",
  },
  executing: {
    label: "Executing",
    className:
      "bg-[#9163cb] text-white dark:bg-[#b185db]/70 dark:text-white animate-pulse",
  },
  completed: {
    label: "Completed",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/25 dark:text-emerald-300",
  },
  failed: {
    label: "Failed",
    className:
      "bg-red-100 text-red-800 dark:bg-red-500/25 dark:text-red-300",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300",
  },
};

const actionStatusConfig: Record<
  ActionStatus,
  {
    label: string;
    className: string;
  }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-[#dec9e9] text-[#6247aa] dark:bg-[#9163cb]/30 dark:text-[#e8daf0]",
  },
  approved: {
    label: "Approved",
    className:
      "bg-[#b185db] text-[#6247aa] dark:bg-[#b185db]/40 dark:text-[#f0e6f6]",
  },
  rejected: {
    label: "Rejected",
    className:
      "bg-red-100 text-red-800 dark:bg-red-500/25 dark:text-red-300",
  },
  executing: {
    label: "Executing",
    className:
      "bg-[#9163cb] text-white dark:bg-[#b185db]/70 dark:text-white animate-pulse",
  },
  completed: {
    label: "Completed",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/25 dark:text-emerald-300",
  },
  failed: {
    label: "Failed",
    className:
      "bg-red-100 text-red-800 dark:bg-red-500/25 dark:text-red-300",
  },
  skipped: {
    label: "Skipped",
    className:
      "bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300",
  },
};

export function WorkflowStatusBadge({ status }: { status: WorkflowStatus }) {
  const config = workflowStatusConfig[status] || {
    label: status,
    className:
      "bg-[#dec9e9] text-[#6247aa] dark:bg-[#9163cb]/30 dark:text-[#e8daf0]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}

export function ActionStatusBadge({ status }: { status: ActionStatus }) {
  const config = actionStatusConfig[status] || {
    label: status,
    className:
      "bg-[#dec9e9] text-[#6247aa] dark:bg-[#9163cb]/30 dark:text-[#e8daf0]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
