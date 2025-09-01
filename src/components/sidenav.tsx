import { useEffect, useState } from "react";
import { ChevronUp, Plus } from "lucide-react";
import collectionIcon from "../assets/collection.svg";
import homeIcon from "../assets/homeicon.svg";
import CategoryModal from "./category.modal";
import { supabase } from "@/supabaseClient";

interface category {
  id: number;
  name: string;
}
// Sidebar Component
const Sidebar = () => {
  const [isCollectionOpen, setIsCollectionOpen] = useState(true);
  const [localCategory, setCategory] = useState<category[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      let { data: category, error } = await supabase
        .from("category")
        .select("*");
      setCategory(category);

      console.log(category, error);
    };
    fetchCategory();
  }, []);

  return (
    <div className="w-60 bg-[#282828] h-screen p-4 flex flex-col">
      <h1 className="mt-10 font-bold text-xl py-1 ">BrainCrumbs</h1>
      <hr className="text-white" />

      {/* Navigation Items */}
      <nav className="flex flex-col gap-2 mt-5">
        {/* Resources */}
        <button className="flex items-center gap-3 text-orange-400 py-2 px-2">
          <img src={homeIcon} alt="Collection Icon" />
          <span className="text-lg">Resources</span>
        </button>

        {/* Collection */}
        <div className="">
          <button
            onClick={() => setIsCollectionOpen(!isCollectionOpen)}
            className="flex items-center justify-between w-full text-white py-2 px-2 hover:bg-gray-700 rounded transition-colors"
          >
            <div className="flex items-center gap-3">
              <img src={collectionIcon} alt="Collection Icon" />
              <span className="text-lg">Collection</span>
            </div>
            <ChevronUp
              size={16}
              className={`transform transition-transform ${
                isCollectionOpen ? "" : "rotate-180"
              }`}
            />
          </button>
          <div
            className={`${
              isCollectionOpen
                ? "flex flex-col gap-2 text-white py-1 rounded-md "
                : "hidden text-white"
            }`}
          >
            {localCategory?.map((c) => (
              <div
                key={c.id}
                className="cursor-pointer hover:bg-[#3F3F3F] py-1.5"
              >
                <p className="pl-10">{c.category_name}</p>
              </div>
            ))}
            <div className="cursor-pointer hover:bg-[#3F3F3F] hover:border rounded-lg text-gray-400 py-1">
              <p className="pl-10 flex gap-2">
                <CategoryModal /> <Plus />
              </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Sidebar;
