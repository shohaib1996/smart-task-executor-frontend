import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workflowApi } from "@/lib/api/workflows";
import { ActionApproval } from "@/lib/types/workflow";

export function useWorkflows(skip = 0, limit = 20) {
  return useQuery({
    queryKey: ["workflows", skip, limit],
    queryFn: () => workflowApi.list(skip, limit),
  });
}

export function useWorkflow(id: string) {
  return useQuery({
    queryKey: ["workflow", id],
    queryFn: () => workflowApi.get(id),
    refetchInterval: (query) => {
      const data = query.state.data;
      // Stop polling when workflow is in a terminal state
      if (
        data?.status === "completed" ||
        data?.status === "failed" ||
        data?.status === "cancelled"
      ) {
        return false;
      }
      return 3000; // Poll every 3 seconds while active
    },
  });
}

export function useCreateWorkflow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userRequest: string) => workflowApi.create(userRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
  });
}

export function useApproveActions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      workflowId,
      actions,
    }: {
      workflowId: string;
      actions: ActionApproval[];
    }) => workflowApi.approve(workflowId, actions),
    onSuccess: (_, { workflowId }) => {
      queryClient.invalidateQueries({ queryKey: ["workflow", workflowId] });
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
  });
}

export function useEditAction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      workflowId,
      actionId,
      payload,
    }: {
      workflowId: string;
      actionId: string;
      payload: object;
    }) => workflowApi.editAction(workflowId, actionId, payload),
    onSuccess: (_, { workflowId }) => {
      queryClient.invalidateQueries({ queryKey: ["workflow", workflowId] });
    },
  });
}

export function useRemoveAction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      workflowId,
      actionId,
    }: {
      workflowId: string;
      actionId: string;
    }) => workflowApi.removeAction(workflowId, actionId),
    onSuccess: (_, { workflowId }) => {
      queryClient.invalidateQueries({ queryKey: ["workflow", workflowId] });
    },
  });
}

export function useCancelWorkflow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workflowId: string) => workflowApi.cancel(workflowId),
    onSuccess: (_, workflowId) => {
      queryClient.invalidateQueries({ queryKey: ["workflow", workflowId] });
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
  });
}
