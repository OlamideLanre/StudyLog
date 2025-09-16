import { useCategoryContext, useResourcesContext } from "@/globalContext";
import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DisplayResources() {
  const [loading, setLoading] = useState<Boolean>(false);
  const { category } = useParams();
  const { selectedResource, setResources } = useResourcesContext();
  const { selectedCategory } = useCategoryContext();

  const deleteResource = async (resourceID: number) => {
    const { error } = await supabase
      .from("resources")
      .delete()
      .eq("id", resourceID);
    // error ? console.log(error) : console.log("resource deleted");
    if (!error) {
      const removeResource = selectedResource.filter(
        (resource) => resource.id !== resourceID
      );
      setResources(removeResource);
      console.log("deleted resource", selectedResource);
    }
  };

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
              <div className="flex justify-between">
                <h1 className="font-semibold text-lg">{r.title}</h1>
                <button
                  onClick={() => {
                    deleteResource(r.id);
                  }}
                  className="cursor-pointer text-red-500"
                  title="delete's a resource"
                >
                  delete
                </button>
              </div>

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
