import { supabase } from "@/supabaseClient";
import Modal from "../components/modal/modal";
import { useEffect, useState } from "react";
import type { category } from "@/components/sidenav";
import { useNavigate } from "react-router-dom";
import { user } from "@/hooks/getUser";
import Sidebar from "@/components/sidenav";

const BrainCrumbs = () => {
  const [topTwoCategory, setCategory] = useState<category[]>();
  const name = localStorage.getItem("userName");

  const navigate = useNavigate();
  useEffect(() => {
    async function firstTwoCategories() {
      let { data: category, error } = await supabase
        .from("category")
        .select("*")
        .eq("user_id", user?.id)
        .limit(2);
      if (error) {
        console.log("an error occured");
      } else {
        setCategory(category ?? []);
        console.log(topTwoCategory);
      }
    }
    firstTwoCategories();
  }, []);

  return (
    <div className="flex h-screen bg-black text-white dark:bg-white dark:text-black">
      <div className="text-white">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <h1 className="text-5xl font-bold mb-4 dark:text-[#112A46]">
            Hi {name}
          </h1>
          <p className="text-gray-400 text-xl mb-12">
            What did you study today?
          </p>

          {/* Collection Cards */}

          <div className="flex flex-col md:flex-row gap-2">
            {topTwoCategory?.map((c) => (
              <div
                key={c.id}
                className="border border-gray-400 rounded-xl p-8 min-w-[150] hover:bg-gray-900 dark:hover:bg-[#112A46] hover:text-white text-[#112A46] transition-colors cursor-pointer"
                onClick={() =>
                  navigate(`/resources/${c.id}/${c.category_name}`)
                }
              >
                <h3 className="text-2xl font-semibold mb-2">
                  {c.category_name}
                </h3>
                {/* <p className="text-gray-400">10 saved</p> */}
              </div>
            ))}

            <Modal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainCrumbs;
