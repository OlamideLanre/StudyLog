import { useEffect, useState } from "react";
import { Sun, Menu, Loader2 } from "lucide-react";
import homeIcon2 from "../assets/homeIcon2.svg";
import CategoryModal from "./modal/category.modal";
import { supabase } from "@/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useCategoryContext, useResourcesContext } from "@/globalContext";
import { useTheme } from "@/ThemeToggle";
import { user } from "@/hooks/getUser";
import SignOutButton from "@/auth/signOut";
import CreateModal from "./modal/create.modal";

export interface category {
  id: number;
  category_name: string;
}
// Sidebar Component

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState<Boolean>(false);
  const [allCategory, setCategory] = useState<category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCategory, setSelectedCategory } = useCategoryContext();
  const { setResources } = useResourcesContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        let { data: category, error } = await supabase
          .from("category")
          .select("*")
          .eq("user_id", user?.id);
        if (!error) {
          setCategory(category ?? []);
          setLoading(false);
        } else {
          console.log(error);
        }
      } catch (error) {
        setLoading(false);
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
      let { data: resources, error } = await supabase
        .from("resources")
        .select("*")
        .eq("user_id", user?.id)
        .eq("category_id", category_id);

      if (!error) {
        navigate(`/resources/${category_id}/${category_name}`);
        setResources(resources ?? []);
        console.log("resources: ", resources);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div>
        <div className="lg:hidden pt-5 bg-[#282828] dark:bg-[#112A46] h-screen">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? "" : <Menu size={28} />}
          </button>
        </div>

        <div
          className={`
    fixed top-0 left-0 h-screen w-60 bg-[#282828] p-4 flex flex-col dark:bg-[#112A46] 
    transform transition-transform duration-300 
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    lg:translate-x-0 lg:static
  `}
        >
          {isOpen ? (
            <Menu size={28} color="white" onClick={() => setIsOpen(!isOpen)} />
          ) : (
            ""
          )}
          <div className="flex justify-between items-end">
            <h1 className="mt-5 font-bold text-xl py-1 text-white">StudyLog</h1>
            <div className="flex gap-2">
              <SignOutButton />
              <button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
                className="text-white hover:text-gray-300 transition-colors pb-1"
              >
                <Sun size={24} />
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-2 mt-5">
            <button className="flex items-center gap-3 text-white py-2 px-2">
              <img src={homeIcon2} alt="Collection Icon" />
              <Link to="/" className="text-[17px]">
                Resources
              </Link>
            </button>
            <CreateModal />

            <div className="">
              <h5 className="text-gray-500 font-semibold my-3">CATEGORIES</h5>

              <div className=" text-white mb-1 ">
                {loading ? (
                  <p className="pl-3 py-1.5 rounded-md">
                    <Loader2 />
                  </p>
                ) : (
                  allCategory?.map((c) => (
                    <div key={c.id} className="cursor-pointer rounded-md ">
                      <p
                        className="pl-3 py-1.5 rounded-md text-[17px]"
                        onClick={() => {
                          setSelectedCategory(c.id);
                          fetchSelectedResource(c.id, c.category_name);
                          setIsOpen(false); // close sidebar on mobile
                        }}
                      >
                        {c.category_name}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div>
                <CategoryModal />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
