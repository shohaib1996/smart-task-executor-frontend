"use client";

import { useCreateWorkflow } from "@/lib/hooks/use-workflows";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CreateWorkflowForm() {
  const [request, setRequest] = useState("");
  const createWorkflow = useCreateWorkflow();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) return;

    createWorkflow.mutate(request, {
      onSuccess: (data) => {
        toast.success("Workflow created successfully");
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to create workflow");
      },
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-[#c19ee0] dark:border-[#9163cb]">
      <CardHeader>
        <CardTitle className="text-[#6247aa] dark:text-[#c19ee0]">
          Create New Workflow
        </CardTitle>
        <CardDescription>
          Describe what you want to achieve in plain English. The AI will plan
          and execute it.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            placeholder="e.g., Schedule a meeting with John next Tuesday at 2 PM and send an invite."
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            className="min-h-[150px] focus-visible:ring-[#9163cb] dark:focus-visible:ring-[#b185db]"
            disabled={createWorkflow.isPending}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            disabled={createWorkflow.isPending || !request.trim()}
          >
            {createWorkflow.isPending ? "Creating..." : "Create Workflow"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
