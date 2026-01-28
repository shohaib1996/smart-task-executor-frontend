"use client";

import { useWorkflows } from "@/lib/hooks/use-workflows";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkflowStatusBadge } from "@/components/workflows/status-badge";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { parseUTCDate } from "@/lib/utils";

export default function WorkflowListPage() {
  const [page, setPage] = useState(0);
  const limit = 9;
  const {
    data: workflows,
    isLoading,
    error,
  } = useWorkflows(page * limit, limit);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading workflows.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Workflows</h1>
        <Button asChild>
          <Link href="/workflows/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Workflow
          </Link>
        </Button>
      </div>

      {workflows?.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-[#c19ee0] dark:border-[#9163cb] rounded-lg bg-[#dec9e9]/20 dark:bg-[#9163cb]/10">
          <p className="text-muted-foreground">No workflows found.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflows?.map((workflow) => (
            <Card
              key={workflow.id}
              className="flex flex-col hover:border-[#9163cb] dark:hover:border-[#c19ee0] transition-colors"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <WorkflowStatusBadge status={workflow.status} />
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(parseUTCDate(workflow.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <CardTitle className="line-clamp-2 text-lg mt-2">
                  {workflow.user_request}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {workflow.summary || "No summary available."}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/workflows/${workflow.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination controls could go here */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setPage((p) => p + 1)}
          disabled={!workflows || workflows.length < limit}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
