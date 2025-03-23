"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { useState } from "react";
import { deleteEvent } from "@/server/db/events-crud";
import { useToast } from "@/hooks/use-toast";

interface DeleteDialogProps {
  itemId: number;
  itemName?: string;
}

export function DeleteDialog({ itemId, itemName = "item" }: DeleteDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
          aria-label={`Delete ${itemName}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete {itemName}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {itemName.toLowerCase()}? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={pending}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="destructive"
            onClick={async () => {
              setPending(true);
              const result = await deleteEvent(itemId);
              if (result.success) {
                toast({
                  variant: "default",
                  title: "Item deleted successfully.",
                });
              } else {
                toast({
                  variant: "destructive",
                  title: "Deletion failed.",
                  description: result.error,
                });
              }
              setOpen(false);
              setPending(false);
            }}
            disabled={pending}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
