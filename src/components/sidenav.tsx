import { useEffect, useState } from "react";
import { ChevronUp, Plus, Sun } from "lucide-react";
import collectionIcon from "../assets/collection.svg";
import homeIcon from "../assets/homeicon.svg";
import CategoryModal from "./modal/category.modal";
import { supabase } from "@/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useCategoryContext, useResourcesContext } from "@/globalContext";
import { useTheme } from "@/ThemeToggle";

export interface category {
  id: number;
  category_name: string;
}
// Sidebar Component

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState<Boolean>();
  const [isCollectionOpen, setIsCollectionOpen] = useState(true);
  const [allCategory, setCategory] = useState<category[]>([]);
  const { selectedCategory, setSelectedCategory } = useCategoryContext();
  const { setResources } = useResourcesContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        let { data: category, error } = await supabase
          .from("category")
          .select("*");
        if (!error) {
          setCategory(category ?? []);
        } else {
          console.log(error);
        }
      } catch (error) {
        console.log("An error occured while fetching category data");
      }
    };
    fetchCategory();
  }, []);

  async function fetchSelectedResource(
    category_id: number,
    category_name: string
  ) {
    try {
      setLoading(true);
      let { data: resources, error } = await supabase
        .from("resources")
        .select("*")
        .eq("category_id", category_id);

      if (!error) {
        navigate(`/resources/${category_id}/${category_name}`);
        setLoading(false);
        setResources(resources ?? []);
        // console.log(selectedResource);
      } else {
        console.log(error);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="w-60 bg-[#282828] h-screen p-4 flex flex-col dark:bg-white dark:border dark:border-gray-400 dark:text-black">
      <div className="flex justify-between items-end">
        <h1 className="mt-10 font-bold text-xl py-1 ">BrainCrumbs</h1>
        <button
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
          className="text-white hover:text-gray-300 transition-colors pb-1"
        >
          <Sun size={24} className="dark:text-black" />
        </button>
      </div>

      <hr className="text-white" />

      {/* Navigation Items */}
      <nav className="flex flex-col gap-2 mt-5">
        {/* Resources */}
        <button className="flex items-center gap-3 text-orange-400 py-2 px-2">
          <img src={homeIcon} alt="Collection Icon" />
          <Link to="/" className="text-lg">
            Resources
          </Link>
        </button>

        {/* Collection */}
        <div className="">
          <div className="flex items-center">
            <button
              onClick={() => setIsCollectionOpen(!isCollectionOpen)}
              className="flex items-center justify-between w-full text-white py-2 px-2 hover:bg-gray-700 rounded transition-colors dark:hover:bg-orange-300"
            >
              <div className="flex items-center gap-3">
                <img src={collectionIcon} alt="Collection Icon" />
                <span className="text-lg dark:text-black">Collection</span>
              </div>

              <ChevronUp
                size={16}
                className={`transform transition-transform dark:text-black ${
                  isCollectionOpen ? "" : "rotate-180"
                }`}
              />
            </button>
            {/* modal to create new category */}

            <CategoryModal />
          </div>
          <div
            className={`${
              isCollectionOpen
                ? "flex flex-col gap-2 text-white py-1 rounded-md dark:text-black"
                : "hidden text-white"
            }`}
          >
            {allCategory?.map((c) => (
              <div
                key={c.id}
                className={
                  selectedCategory === c.id
                    ? "bg-[#3F3F3F] py-1.5 dark:bg-orange-500 rounded"
                    : `cursor-pointer hover:bg-[#3F3F3F] py-1.5 dark:hover:bg-orange-300`
                }
              >
                <p
                  className="pl-10"
                  onClick={() => {
                    setSelectedCategory(c.id);
                    fetchSelectedResource(c.id, c.category_name);
                  }}
                >
                  {c.category_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Sidebar;
