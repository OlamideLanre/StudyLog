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
type MyComponentProps = {
  deleteResource: () => void;
  delError: string;
};

const DeleteModal: React.FC<MyComponentProps> = ({
  deleteResource,
  delError,
}) => {
  // console.log(isOnline);

  return (
    <Dialog>
      <DialogTrigger>
        <Delete color="red" className="cursor-pointer" />
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
        </DialogFooter>
        {delError && (
          <p className="text-red-500 font-semibold text-[14px]">{delError}</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
