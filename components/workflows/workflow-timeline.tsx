import { AuditLog } from "@/lib/types/workflow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, AlertCircle, Info, Clock } from "lucide-react";

export function WorkflowTimeline({ logs }: { logs: AuditLog[] }) {
  return (
    <Card className="h-full max-h-[calc(100vh-200px)] flex flex-col">
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-6 pb-6">
          <div className="relative border-l ml-3 my-2 space-y-6">
            {logs.length === 0 && (
              <p className="pl-6 text-sm text-muted-foreground">
                No activity yet.
              </p>
            )}
            {logs.map((log) => {
              let Icon = Info;
              let color = "text-blue-500";

              if (
                log.event_type.includes("error") ||
                log.event_type.includes("fail")
              ) {
                Icon = AlertCircle;
                color = "text-red-500";
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
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{log.message}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(log.timestamp), {
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
