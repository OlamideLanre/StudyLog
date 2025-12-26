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
import { PlusCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
// import type { category } from "../sidenav";
import { useUser } from "@/hooks/useUser";
import type { category } from "@/lib/utils";

// Test();
const CreateModal = () => {
  const { user } = useUser();
  const [localCategory, setCategory] = useState<category[]>([]);
  const [errors, setErrors] = useState<{
    title?: string;
    link?: string;
    notes?: string;
    choice?: string;
  }>({});

  const [createData, setCreateData] = useState<{
    title: string;
    link: string;
    notes: string;
    choice: string;
  }>({
    title: "",
    link: "",
    notes: "",
    choice: "",
  });
  const { title, link, notes, choice } = createData;

  const insertResource = async () => {
    const newErrors: typeof errors = {};

    if (!title?.trim()) newErrors.title = "Title is required";
    if (!link?.trim()) newErrors.link = "Link is required";
    if (!notes?.trim()) newErrors.notes = "Note is required";
    if (!choice?.trim()) newErrors.choice = "Category is required";
    console.log("choice: ", choice);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; //stop if validation fails
    }

    //no errors = proceed with insert
    setErrors({});
    const { data, error } = await supabase
      .from("resources")
      .insert([{ title, link, notes, category_id: choice, user_id: user?.id }])
      .select();
    console.log("choice: ", choice);

    console.log(data, error);

    // reset fields
    setCreateData({ title: "", link: "", notes: "", choice: "" });
  };

  useEffect(() => {
    if (!user?.id) return;
    const fetchCategory = async () => {
      let { data: category, error } = await supabase
        .from("category")
        .select("*")
        .eq("user_id", user?.id);

      if (error) {
        console.error("Error fetching categories:", error.message);
      } else {
        setCategory(category ?? []);
        console.log("Fetched categories:", category);
      }
    };

    fetchCategory();
  }, [user]);

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <button className="flex items-center gap-3 text-white py-2 text-[17px]">
              <PlusCircle />
              Log session
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-black text-white dark:bg-white dark:text-black">
            <DialogHeader>
              <DialogTitle>Add new study session</DialogTitle>
              <DialogDescription className="text-gray-400">
                Fill in the details below to log your study session
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
                    "Session title"
                  )}
                </Label>
                <Input
                  id="name-1"
                  name="name"
                  placeholder="e.g Networking 101"
                  value={title}
                  onChange={(e) => {
                    setCreateData({ ...createData, title: e.target.value });
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
                    "Resource link"
                  )}
                </Label>
                <Input
                  id="link-1"
                  name="link"
                  placeholder="www.yourlink.com"
                  value={link}
                  onChange={(e) => {
                    setCreateData({ ...createData, link: e.target.value });
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
                    setCreateData({ ...createData, notes: e.target.value });
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
                    setCreateData({ ...createData, choice: e.target.value });
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
                Save session
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default CreateModal;
