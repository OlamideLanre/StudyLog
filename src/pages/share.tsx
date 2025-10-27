import { useResourcesContext } from "@/globalContext";
import { supabase } from "@/supabaseClient";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SharedResource = () => {
  const { id } = useParams();
  const { selectedResource, setResources } = useResourcesContext();
  async function displaySharedResource(id: number) {
    try {
      let { data: resources, error } = await supabase
        .from("resources")
        .select("*")
        .eq("id", id);
      !error
        ? setResources(resources ?? [])
        : console.log("an error occured while fetching shared resource");
    } catch (error) {
      throw new Error("Could not find shared resource");
    }
  }
  useEffect(() => {
    displaySharedResource(id);
  }, [id]);

  return (
    <div className="bg-white">
      {selectedResource?.length === 0 ? (
        <p className="flex justify-center items-center text-xl h-screen text-[#112A46] font-semibold">
          Sorry we can't find this shared resource
        </p>
      ) : (
        selectedResource?.map((r) => (
          <div
            key={r.id}
            className="bg-[#282828] text-white w-xl xl:w-[60%] p-4 mx-auto rounded-md dark:bg-[#eaf4f4] dark:text-black"
          >
            <div className="flex justify-between">
              <h1 className="font-semibold text-lg">{r.title}</h1>
            </div>

            <Link
              to={r.link}
              target="_blank"
              className="text-sm hover:text-orange-500"
            >
              {r.link}
            </Link>
            <p className="font-light mt-2">{r.notes || "no notes"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SharedResource;
