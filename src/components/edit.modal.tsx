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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatabaseZapIcon, Edit } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import type { category } from "./sidenav";

const EditModal = ({ resourceID }) => {
  const [title, setTitle] = useState<string>();
  const [link, setLink] = useState<string>();
  const [notes, setNotes] = useState<string>();
  const [localCategory, setCategory] = useState<category[]>([]);
  const [fetchedResource, setFetchedResource] = useState([]);
  const [choice, setChoice] = useState<string>();

  async function fetcResource(resourceID: number) {
    try {
      let { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("id", resourceID);
      if (!error) {
        setFetchedResource(data);
        console.log("useState resource: ", fetchedResource);
      }
      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Edit
              size={18}
              className="cursor-pointer"
              onClick={() => {
                // navigate("/edit");
                console.log("edit button clicked");
                console.log("resource ID: ", resourceID);
                fetcResource(resourceID);
              }}
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-black text-white">
            <DialogHeader>
              <DialogTitle>Edit Resource</DialogTitle>
              <DialogDescription className="text-gray-400">
                Edit an existing resource here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            {fetchedResource.map((r) => (
              <div className="grid gap-4" key={r.id}>
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Title</Label>
                  <Input
                    id="name-1"
                    name="name"
                    placeholder="Array Reduce Function"
                    value={r.title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Link</Label>
                  <Input
                    id="link-1"
                    name="link"
                    placeholder="www.yourlink.com"
                    value={r.link}
                    onChange={(e) => {
                      setLink(e.target.value);
                    }}
                  />
                  <Textarea
                    placeholder="short description of your resource"
                    value={r.notes || "no notes added"}
                    onChange={(e) => {
                      setNotes(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <select
                    value={choice}
                    defaultValue="Select Category"
                    className="select"
                    onChange={(e) => {
                      setChoice(e.target.value), console.log(choice);
                    }}
                  >
                    <option disabled={true}>Select Category</option>
                    {localCategory.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            <DialogFooter>
              {/* <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose> */}
              <Button
                type="submit"
                onClick={() => {
                  console.log("save button clicked");
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default EditModal;
