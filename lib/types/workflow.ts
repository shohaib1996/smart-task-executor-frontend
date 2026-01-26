export type WorkflowStatus =
  | "pending"
  | "investigating"
  | "awaiting_approval"
  | "executing"
  | "completed"
  | "failed"
  | "cancelled";

export type ActionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "executing"
  | "completed"
  | "failed"
  | "skipped";

export type ActionType =
  | "calendar_read"
  | "calendar_create"
  | "calendar_update"
  | "calendar_delete"
  | "email_send"
  | "notion_create"
  | "notion_update";

export interface Action {
  id: string;
  action_type: ActionType;
  title: string;
  description: string;
  payload: Record<string, unknown>;
  status: ActionStatus;
  requires_approval: boolean;
  api_name?: string;
  estimated_cost: number;
  order: number;
  result?: Record<string, unknown>;
  error_message?: string;
  executed_at?: string;
}

export interface AuditLog {
  id: string;
  event_type: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface Workflow {
  id: string;
  user_request: string;
  status: WorkflowStatus;
  summary?: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface WorkflowDetail extends Workflow {
  actions: Action[];
  audit_logs: AuditLog[];
}

export interface ActionApproval {
  action_id: string;
  approved: boolean;
}
