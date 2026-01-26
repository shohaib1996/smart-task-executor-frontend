import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type SSEStatus = "connecting" | "connected" | "error" | "closed";

export function useWorkflowStream(workflowId: string, enabled = true) {
  const [status, setStatus] = useState<SSEStatus>("connecting");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled || !workflowId) return;

    const token = localStorage.getItem("token");
    // Note: EventSource doesn't support headers easily.
    // We pass token as query param.
    const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/sse/workflows/${workflowId}/stream?token=${token}`;

    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      setStatus("connected");
    };

    eventSource.addEventListener("status", (event) => {
      try {
        const data = JSON.parse(event.data);
        // Update the cached workflow data
        queryClient.setQueryData(["workflow", workflowId], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            status: data.status,
            updated_at: data.updated_at,
          };
        });
        queryClient.invalidateQueries({ queryKey: ["workflow", workflowId] });
      } catch (e) {
        console.error("Failed to parse SSE status", e);
      }
    });

    eventSource.addEventListener("complete", (event) => {
      try {
        const data = JSON.parse(event.data);
        queryClient.setQueryData(["workflow", workflowId], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            status: data.status,
            summary: data.summary,
            error_message: data.error_message,
          };
        });
        queryClient.invalidateQueries({ queryKey: ["workflow", workflowId] });
        setStatus("closed");
        eventSource.close();
      } catch (e) {
        console.error("Failed to parse SSE complete", e);
      }
    });

    eventSource.addEventListener("error", () => {
      // console.error('SSE Error:', event);
      setStatus("error");
    });

    eventSource.onerror = () => {
      setStatus("error");
    };

    return () => {
      eventSource.close();
    };
  }, [workflowId, enabled, queryClient]);

  return { status };
}
