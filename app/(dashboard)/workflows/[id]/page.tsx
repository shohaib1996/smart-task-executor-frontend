"use client";

import { useWorkflow } from "@/lib/hooks/use-workflows";
import { WorkflowDetail } from "@/components/workflows/workflow-detail";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { use } from "react";

export default function WorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: workflow, isLoading, error } = useWorkflow(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
          <div>
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading workflow</div>;
  }

  if (!workflow) {
    return notFound();
  }

  return <WorkflowDetail workflow={workflow} />;
}
