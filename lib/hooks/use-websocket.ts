import { useEffect, useState, useCallback, useRef } from "react";
import { toast } from "sonner";

interface WSMessage {
  type: string;
  workflow_id?: string;
  data?: Record<string, unknown>;
}

export function useWorkflowWebSocket(
  workflowId: string | null,
  enabled = true,
) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WSMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const sendMessage = useCallback((message: WSMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const wsBase = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";
    const wsUrl = workflowId
      ? `${wsBase}/ws/${workflowId}?token=${token}`
      : `${wsBase}/ws?token=${token}`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "pong") return;

        setMessages((prev) => [...prev, data]);

        // Show toasts for relevant events
        if (data.type === "notification") {
          toast.info(data.message);
        } else if (data.type === "approval_request") {
          toast.warning("Action requires approval: " + data.action_title);
        } else if (data.type === "error") {
          toast.error(data.message);
        }
      } catch (e) {
        console.error("WS Parse error", e);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    // Ping mechanism
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "ping" }));
      }
    }, 30000);

    return () => {
      clearInterval(pingInterval);
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [workflowId, enabled]);

  const selectOption = useCallback(
    (optionId: string) => {
      sendMessage({ type: "select_option", option_id: optionId } as any);
    },
    [sendMessage],
  );

  return {
    isConnected,
    messages,
    sendMessage,
    selectOption,
  };
}
