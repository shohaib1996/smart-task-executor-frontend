import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no workflows
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start by creating a new smart task workflow.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/workflows/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Workflow
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
