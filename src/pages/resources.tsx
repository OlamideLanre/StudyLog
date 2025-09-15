import { useCategoryContext, useResourcesContext } from "@/globalContext";
import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DisplayResources() {
  const [loading, setLoading] = useState<Boolean>(false);
  const { category } = useParams();
  const { selectedResource, setResources } = useResourcesContext();
  const { selectedCategory } = useCategoryContext();

  useEffect(() => {
    if (!category) return;

    const fetchResources = async () => {
      setLoading(true);
      let { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("category_id", selectedCategory); // or .eq("category_id", +categoryId)
      console.log("category ID", selectedCategory);

      if (!error) setResources(data ?? []);
      setLoading(false);
    };

    fetchResources();
  }, [category]);

  return (
    <>
      <div className="bg-black h-screen flex flex-col gap-2 p-10">
        <h1 className="text-white text-3xl font-semibold my-3">{category}</h1>
        {!selectedResource ? (
          <div className="h-screen flex justify-center items-center ">
            <h1 className="font-semibold text-xl text-white">
              Resource not found
            </h1>
          </div>
        ) : (
          selectedResource?.map((r) => (
            <div
              key={r.id}
              className="bg-[#282828] text-white w-[60%] p-4 rounded-md"
              onClick={() => {
                console.log("category context: ", selectedCategory);
              }}
            >
              <h1 className="font-semibold text-lg">{r.title}</h1>
              <Link
                to={r.link}
                target="_blank"
                className="text-sm hover:text-orange-500"
              >
                {r.link}
              </Link>
              <p className="font-light mt-2">
                {r.notes ? r.notes : "no notes"}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default DisplayResources;
