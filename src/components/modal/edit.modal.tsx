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
import { Edit } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

import type { ResourceData } from "@/globalContext";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import type { category } from "@/lib/utils";

type editProps = { resourceID: number; onUpdated: () => void };

const EditModal: React.FC<editProps> = ({ resourceID, onUpdated }) => {
  const [title, setTitle] = useState<string>();
  const [link, setLink] = useState<string>();
  const [notes, setNotes] = useState<string>();
  const [allCategory, setCategory] = useState<category[]>([]);
  const [fetchedResource, setFetchedResource] = useState<ResourceData[]>([]);
  const [choice, setChoice] = useState<number>();
  const [errors, setErrors] = useState<{
    title?: string;
    link?: string;
    notes?: string;
  }>({});
  const [isConnected, setisConnected] = useState<string>();

  const isOnline = useOnlineStatus();

  async function fetcResource(resourceID: number) {
    try {
      let { data: resource, error } = await supabase
        .from("resources")
        .select("*")
        .eq("id", resourceID);

      if (!error) {
        setFetchedResource(resource ?? []);
      } else {
        console.log("an error occured: ", error);
        // console.log(!isOnline ? "internet connection lost" : "user is online");
      }
    } catch (error) {
      console.log(error);
    }
  }
  // UPDATE RESOURCE
  async function updateResource(resourceID: number) {
    const newErrors: typeof errors = {};

    if (!title?.trim()) newErrors.title = "Title is required";
    if (!link?.trim()) newErrors.link = "Link is required";
    if (!notes?.trim()) newErrors.notes = "Note is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; //stop if validation fails
    }

    //runs if no error
    const { data, error } = await supabase
      .from("resources")
      .update({ title: title, link: link, notes: notes, category_id: choice })
      .eq("id", resourceID)
      .select();
    if (!error) {
      setTitle("");
      setLink("");
      setNotes("");
      setChoice(0);
      console.log(data);
    } else {
      !isOnline
        ? setisConnected("Couldn't update, you're offline.")
        : setisConnected("An error occured, try again.");
      console.log("error occured while updating: ", error);
    }
    if (onUpdated) {
      onUpdated();
    }
  }
  // fetching all categories
  useEffect(() => {
    async function fetchResourceCategory() {
      let { data, error } = await supabase.from("category").select("*");
      if (!error) {
        setCategory(data ?? []);
      }
    }
    fetchResourceCategory();
  }, []);

  //SETTING THE DATA TO THEIR INPUT FILED
  useEffect(() => {
    if (fetchedResource && fetchedResource.length > 0) {
      const r = fetchedResource[0];
      setTitle(r.title);
      setLink(r.link);
      setNotes(r.notes);
      setChoice(r.category_id);
    }
  }, [fetchedResource]);

  //CLEAR ERROR WHEN INTERNET IS RECONNECTED
  useEffect(() => {
    if (isOnline) {
      setisConnected(""); // clear error when back online
    }
  }, [isOnline]);
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Edit
              size={18}
              className="cursor-pointer"
              onClick={() => {
                fetcResource(resourceID);
              }}
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-black text-white dark:bg-slate-100 dark:text-black">
            <DialogHeader>
              <DialogTitle>Edit Resource</DialogTitle>
              <DialogDescription className="text-gray-400">
                Edit an existing resource here. Click save when you&apos;re
                done.
              </DialogDescription>
              {isConnected && (
                <p className="text-red-500 font-semibold">{isConnected}</p>
              )}
            </DialogHeader>
            {fetchedResource.map((r) => (
              <div className="grid gap-4" key={r.id}>
                <div className="grid gap-3">
                  <Label htmlFor="name-1">
                    {errors.title ? (
                      <p className="text-red-500 text-[14px]">
                        Title is required
                      </p>
                    ) : (
                      "Title"
                    )}
                  </Label>
                  <Input
                    id="name-1"
                    name="name"
                    placeholder="Array Reduce Function"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="dark:border dark:border-gray-500"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">
                    {errors.link ? (
                      <p className="text-red-500 text-[14px]">
                        Link is required
                      </p>
                    ) : (
                      "Link"
                    )}
                  </Label>
                  <Input
                    id="link-1"
                    name="link"
                    placeholder="www.yourlink.com"
                    value={link}
                    onChange={(e) => {
                      setLink(e.target.value);
                    }}
                    className="dark:border dark:border-gray-500"
                  />
                  <Textarea
                    placeholder="short description of your resource"
                    value={notes}
                    onChange={(e) => {
                      setNotes(e.target.value);
                    }}
                    className="dark:border dark:border-gray-500"
                  />
                </div>
                <div>
                  <select
                    value={choice}
                    defaultValue="Select Category"
                    className="select dark:bg-slate-200"
                    onChange={(e) => {
                      setChoice(Number(e.target.value)), console.log(choice);
                    }}
                  >
                    <option disabled={true}>Select Category</option>
                    {allCategory.map((c) => (
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
                  updateResource(resourceID);
                }}
                // className="dark:bg-orange-500"
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
