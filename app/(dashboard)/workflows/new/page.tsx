import { CreateWorkflowForm } from "@/components/workflows/create-workflow-form";

export default function NewWorkflowPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">New Workflow</h1>
      </div>
      <CreateWorkflowForm />
    </div>
  );
}
