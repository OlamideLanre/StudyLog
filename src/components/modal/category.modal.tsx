import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { supabase } from "@/supabaseClient";
import { Plus } from "lucide-react";

function CategoryModal() {
  const [category, setCategory] = useState<string>();
  const [error, setError] = useState<string>();

  const createCategory = async () => {
    try {
      if (category?.trim() === "" || category?.trim() === undefined) {
        setError("please enter a value");
      } else {
        const { data, error } = await supabase
          .from("category")
          .insert([{ category_name: category }])
          .select();
        console.log(data, error);
        setCategory("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Plus size={18} className="hover:bg-[#3F3F3F] rounded" />
        </DialogTrigger>
        <DialogContent className="bg-black text-white dark:bg-white dark:text-black">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Create new category to save resources
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            {/* <Label htmlFor="name-1">Category Name</Label> */}
            {error && (
              <p className="text-red-500 text-[14px] font-semibold">{error}</p>
            )}
            <Input
              id="category-1"
              name="category"
              placeholder="Enter category name e.g AI & ML"
              className="border border-black"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setError("");
              }}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={createCategory}>
              create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CategoryModal;
