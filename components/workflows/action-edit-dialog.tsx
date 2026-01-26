"use client";

import { Action } from "@/lib/types/workflow";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEditAction } from "@/lib/hooks/use-workflows";
import { useState } from "react";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

export function ActionEditDialog({
  action,
  workflowId,
}: {
  action: Action;
  workflowId: string;
}) {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState(
    JSON.stringify(action.payload, null, 2),
  );
  const editAction = useEditAction();

  const handleSave = () => {
    try {
      const parsedPayload = JSON.parse(payload);
      editAction.mutate(
        { workflowId, actionId: action.id, payload: parsedPayload },
        {
          onSuccess: () => {
            toast.success("Action updated");
            setOpen(false);
          },
          onError: (error) => {
            console.error(error);
            toast.error("Failed to update action");
          },
        },
      );
    } catch (e) {
      toast.error("Invalid JSON");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Action Payload</DialogTitle>
          <DialogDescription>
            Make changes to the action parameters here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="h-[300px] font-mono text-xs"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={editAction.isPending}>
            {editAction.isPending ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
