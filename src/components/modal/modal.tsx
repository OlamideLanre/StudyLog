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
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import type { category } from "../sidenav";

// Test();
const Modal = () => {
  const [title, setTitle] = useState<string>();
  const [link, setLink] = useState<string>();
  const [notes, setNotes] = useState<string>();
  const [choice, setChoice] = useState<string>();
  const [localCategory, setCategory] = useState<category[]>([]);
  const [errors, setErrors] = useState<{
    title?: string;
    link?: string;
    notes?: string;
    choice?: string;
  }>({});

  // const [error, setError] = useState<string>();
  // const [formData, setFormData] = useState({
  //   title: title,
  //   link: link,
  //   notes: notes,
  //   choice: choice,
  // });

  const insertResource = async () => {
    const newErrors: typeof errors = {};

    if (!title?.trim()) newErrors.title = "Title is required";
    if (!link?.trim()) newErrors.link = "Link is required";
    if (!notes?.trim()) newErrors.notes = "Note is required";
    if (!choice?.trim()) newErrors.choice = "Category is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; //stop if validation fails
    }

    //no errors = proceed with insert
    setErrors({});
    const { data, error } = await supabase
      .from("resources")
      .insert([{ title, link, notes, category_id: choice }])
      .select();

    console.log(data, error);

    // reset fields
    setTitle("");
    setLink("");
    setNotes("");
    setChoice("");
  };

  useEffect(() => {
    const fetchCategory = async () => {
      let { data: category, error } = await supabase
        .from("category")
        .select("*");

      if (error) {
        console.error("Error fetching categories:", error.message);
      } else {
        setCategory(category ?? []);
        console.log("Fetched categories:", category);
      }
    };

    fetchCategory();
  }, []);

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <div
              className="border border-gray-700 rounded-xl p-8 min-w-[150] hover:bg-gray-900 dark:hover:bg-[#112A46] hover:text-white transition-colors cursor-pointer flex items-center justify-center"
              title="use to add a new resource"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xl font-semibold text-gray-400">
                  New Entry
                </span>
                <Plus size={20} className="text-gray-400" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-black text-white dark:bg-white dark:text-black">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription className="text-gray-400">
                Dumb what you learnt today here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
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
                    setErrors((prev) => ({ ...prev, title: undefined }));
                  }}
                  className={
                    errors.title
                      ? " border border-red-500"
                      : ` dark:border dark:border-gray-500`
                  }
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">
                  {errors.link ? (
                    <p className="text-red-500 text-[14px]">Link is required</p>
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
                    setErrors((prev) => ({ ...prev, link: undefined }));
                  }}
                  className={
                    errors.link
                      ? "border border-red-500"
                      : `dark:border dark:border-gray-500`
                  }
                  required
                />
                <Textarea
                  placeholder="short description of your resource"
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                    setErrors((prev) => ({ ...prev, notes: undefined }));
                  }}
                  className={
                    errors.notes
                      ? "border border-red-500"
                      : `dark:border dark:border-gray-500`
                  }
                  required
                />
              </div>
              <div>
                {errors.choice && (
                  <p className="text-red-500 text-[14px] font-semibold">
                    Select a category
                  </p>
                )}
                <select
                  value={choice}
                  defaultValue="Select Category"
                  onChange={(e) => {
                    setChoice(e.target.value);
                    setErrors((prev) => ({ ...prev, choice: undefined }));
                  }}
                  className={`${
                    errors.choice
                      ? "border border-red-500 select dark:bg-slate-200"
                      : "dark:border dark:border-gray-500 select dark:bg-slate-200"
                  }`}
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
            <DialogFooter>
              {/* <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose> */}
              <Button type="submit" onClick={insertResource}>
                Add Resource
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default Modal;
