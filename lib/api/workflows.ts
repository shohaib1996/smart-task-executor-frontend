import { apiClient } from "./client";
import { Workflow, WorkflowDetail, ActionApproval } from "@/lib/types/workflow";

export const workflowApi = {
  list: async (skip = 0, limit = 20): Promise<Workflow[]> => {
    const { data } = await apiClient.get("/api/workflows", {
      params: { skip, limit },
    });
    return data;
  },

  get: async (id: string): Promise<WorkflowDetail> => {
    const { data } = await apiClient.get(`/api/workflows/${id}`);
    return data;
  },

  create: async (userRequest: string): Promise<Workflow> => {
    const { data } = await apiClient.post("/api/workflows", {
      user_request: userRequest,
    });
    return data;
  },

  approve: async (workflowId: string, actions: ActionApproval[]) => {
    const { data } = await apiClient.post(
      `/api/workflows/${workflowId}/approve`,
      {
        workflow_id: workflowId,
        actions,
      },
    );
    return data;
  },

  editAction: async (workflowId: string, actionId: string, payload: object) => {
    const { data } = await apiClient.put(
      `/api/workflows/${workflowId}/actions/${actionId}`,
      { action_id: actionId, payload },
    );
    return data;
  },

  removeAction: async (workflowId: string, actionId: string) => {
    const { data } = await apiClient.delete(
      `/api/workflows/${workflowId}/actions/${actionId}`,
    );
    return data;
  },

  cancel: async (workflowId: string) => {
    const { data } = await apiClient.post(
      `/api/workflows/${workflowId}/cancel`,
    );
    return data;
  },
};
