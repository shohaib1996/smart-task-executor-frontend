import { AuditLog, WorkflowStatus } from "@/lib/types/workflow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, parseUTCDate } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Clock, Loader2 } from "lucide-react";

interface WorkflowTimelineProps {
  logs: AuditLog[];
  workflowStatus?: WorkflowStatus;
}

export function WorkflowTimeline({ logs, workflowStatus }: WorkflowTimelineProps) {
  // Show spinner when workflow is actively processing (not waiting for user input or finished)
  const isInProgress = workflowStatus === "pending" ||
    workflowStatus === "investigating" ||
    workflowStatus === "executing";

  // Also check if the last log suggests ongoing processing
  const lastLog = logs[logs.length - 1];
  const isProcessingLog = lastLog && (
    lastLog.event_type.includes("start") ||
    lastLog.event_type.includes("checking") ||
    lastLog.event_type.includes("finding") ||
    lastLog.event_type.includes("calendar_read") ||
    lastLog.message.toLowerCase().includes("checking") ||
    lastLog.message.toLowerCase().includes("finding") ||
    lastLog.message.toLowerCase().includes("...")
  );

  const showSpinnerOnLast = isInProgress || isProcessingLog;

  return (
    <Card className="h-full max-h-[calc(100vh-200px)] flex flex-col overflow-hidden">
      <CardHeader className="shrink-0">
        <CardTitle>Activity Log</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full px-6 pb-6">
          <div className="relative border-l ml-3 my-2 space-y-6">
            {logs.length === 0 && (
              <p className="pl-6 text-sm text-muted-foreground">
                No activity yet.
              </p>
            )}
            {logs.map((log, index) => {
              const isLastLog = index === logs.length - 1;
              const showSpinner = isLastLog && showSpinnerOnLast;

              let Icon = Info;
              let color = "text-blue-500";

              if (
                log.event_type.includes("error") ||
                log.event_type.includes("fail")
              ) {
                Icon = AlertCircle;
                color = "text-red-500";
              } else if (
                log.event_type.includes("inaccessible") ||
                log.event_type.includes("warning")
              ) {
                Icon = AlertTriangle;
                color = "text-amber-500";
              } else if (
                log.event_type.includes("complete") ||
                log.event_type.includes("approve")
              ) {
                Icon = CheckCircle2;
                color = "text-green-500";
              } else if (log.event_type.includes("start")) {
                Icon = Clock;
                color = "text-yellow-500";
              }

              return (
                <div key={log.id} className="ml-6 relative">
                  <span
                    className={cn(
                      "absolute -left-[31px] top-1 bg-background rounded-full p-1",
                      color,
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-medium wrap-break-word overflow-hidden">
                        {log.message}
                      </span>
                      {showSpinner && (
                        <Loader2 className="w-3 h-3 animate-spin text-muted-foreground shrink-0" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(parseUTCDate(log.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                    {log.details && Object.keys(log.details).length > 0 && (
                      <pre className="mt-2 w-full rounded-md bg-muted p-2 text-xs overflow-x-auto">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
