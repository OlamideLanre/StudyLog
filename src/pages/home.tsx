import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { user } from "@/hooks/getUser";
import { useUser } from "@/hooks/useUser";
import type { category } from "@/lib/utils";

const BrainCrumbs = () => {
  const [topTwoCategory, setCategory] = useState<category[]>();
  const { user } = useUser();

  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.id) return;
    async function firstTwoCategories() {
      let { data: category, error } = await supabase
        .from("category")
        .select("*")
        .eq("user_id", user?.id)
        .limit(2);
      if (error) {
        console.log(error.message);
      } else {
        setCategory(category ?? []);
        // console.log(topTwoCategory);
      }
    }
    firstTwoCategories();
  }, [user]);

  return (
    <div className="flex h-screen bg-black text-white dark:bg-white dark:text-black">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <h1 className=" text-3xl md:text-5xl font-bold mb-4 dark:text-[#112A46]">
            Welcome back
          </h1>
          <p className="text-gray-400 md:text-xl mb-12">
            {topTwoCategory?.length == 0
              ? "no saved resources"
              : "Here's your recent logged categories"}
          </p>

          {/* Collection Cards */}

          <div className="flex flex-row gap-2">
            {topTwoCategory?.map((c) => (
              <div
                key={c.id}
                className="border border-gray-400 rounded-xl p-8 min-w-[150] hover:text-white text-white dark:text-[#112A46] transition-colors cursor-pointer"
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

            {/* <Modal /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainCrumbs;
