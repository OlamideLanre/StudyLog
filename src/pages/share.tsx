import { useResourcesContext } from "@/globalContext";
import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SharedResource = () => {
  const { id } = useParams();
  const { selectedResource, setResources } = useResourcesContext();
  const [loading, setLoading] = useState<boolean>(false);
  async function displaySharedResource(id: number) {
    try {
      setLoading(true);
      let { data: resources, error } = await supabase
        .from("resources")
        .select("*")
        .eq("id", id);
      if (error) {
        console.log("an error occured while fetching shared resource");
      } else {
        setLoading(false);
        setResources(resources ?? []);
      }
    } catch (error) {
      throw new Error("Could not find shared resource");
    }
  }
  useEffect(() => {
    displaySharedResource(Number(id));
  }, [id]);

  return (
    <div className="bg-white p-3">
      {loading && selectedResource?.length > 0 ? (
        <p className="flex justify-center items-center text-xl h-screen text-[#112A46] font-semibold">
          Fetching resource...
        </p>
      ) : (
        selectedResource?.map((r) => (
          <div
            key={r.id}
            className="w-full md:w-1/2 p-4 mx-auto rounded-md bg-[#eaf4f4] text-black"
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
