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
import { Textarea } from "./ui/textarea";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { supabase } from "@/supabaseClient";

// Test();
const Modal = () => {
  const [title, setTitle] = useState<string>();
  const [link, setLink] = useState<string>();
  const [notes, setNotes] = useState<string>();
  // const [category, setCategory] = useState<string>();

  const Test = async () => {
    const { data, error } = await supabase
      .from("resources")
      .insert([{ title: title, link: link, notes: notes, category_id: 1 }])
      .select();
    console.log(data, error);
  };
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <div className="border border-gray-700 rounded-xl p-8 min-w-[150] hover:bg-gray-900 transition-colors cursor-pointer flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-xl font-semibold text-gray-400">
                    New Entry
                  </span>
                  <Plus size={20} className="text-gray-400" />
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-black text-white">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription className="text-gray-400">
                Dumb what you learnt today here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Title</Label>
                <Input
                  id="name-1"
                  name="name"
                  placeholder="Array Reduce Function"
                  value={title}
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
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                />
                <Textarea
                  placeholder="short description of your resource"
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                  }}
                />
              </div>
              <div>
                <Select
                // onValueChange={field.onChange}
                // defaultValue={field.value}
                >
                  {/* <FormControl> */}
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  {/* </FormControl> */}
                  <SelectContent>
                    <SelectItem value="category1">category1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              {/* <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose> */}
              <Button type="submit" onClick={Test}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default Modal;
