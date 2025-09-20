import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Delete } from "lucide-react";
import { Button } from "../ui/button";

function DeleteModal({ deleteResource }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Delete
          color="red"
          //   onClick={() => {
          //     deleteResource(r.id);
          //   }}
          className="cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="text-white bg-black dark:bg-white dark:text-black">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            resource.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            className="bg-red-500 hover:bg-red-400 dark:text-white"
            onClick={() => {
              deleteResource();
            }}
          >
            Delete
          </Button>
          {/* <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteModal;
