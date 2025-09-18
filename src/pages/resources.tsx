import DeleteModal from "@/components/delete.modal";
import EditModal from "@/components/edit.modal";
import { useResourcesContext } from "@/globalContext";
import { supabase } from "@/supabaseClient";
import { Delete, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DisplayResources() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [searchVal, setSearchVal] = useState("");
  const { id, category } = useParams();
  const { selectedResource, setResources } = useResourcesContext();

  // local copy for search
  const [filteredResources, setFilteredResources] = useState(selectedResource);

  //DELETE'S A RESOURCE
  const deleteResource = async (resourceID: number) => {
    const { error } = await supabase
      .from("resources")
      .delete()
      .eq("id", resourceID);

    if (!error) {
      const removeResource = selectedResource.filter(
        (resource) => resource.id !== resourceID
      );
      setResources(removeResource);
      setFilteredResources(removeResource); // update local copy too
      console.log("deleted resource", selectedResource);
    }
  };

  // Run search when searchVal or selectedResource changes
  useEffect(() => {
    if (searchVal.trim() === "") {
      setFilteredResources(selectedResource);
      return;
    }
    const filterBySearch = selectedResource.filter(
      (item) =>
        item.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        item.notes?.toLowerCase().includes(searchVal.toLowerCase())
    );

    setFilteredResources(filterBySearch);
  }, [searchVal, selectedResource]);

  //REFETCH AFTER UPDATE
  async function fetchResources() {
    if (!category) return;
    let { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("category_id", id);

    if (!error) {
      setResources(data ?? []);
    }
  }

  return (
    <div className="bg-black h-screen flex flex-col gap-2 p-10">
      <h1 className="text-white text-3xl font-semibold my-3">{category}</h1>
      <input
        type="text"
        placeholder="search a resource"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        className="placeholder:text-gray-400 py-2 pl-2 w-1/3 md:w-1/2 border border-white rounded-md text-white outline-none"
      />
      {filteredResources?.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <h1 className="font-semibold text-xl text-white">
            No resources found
          </h1>
        </div>
      ) : (
        filteredResources?.map((r) => (
          <div
            key={r.id}
            className="bg-[#282828] text-white w-[100%] xl:w-[60%] p-4 rounded-md"
          >
            <div className="flex justify-between">
              <h1 className="font-semibold text-lg">{r.title}</h1>
              <div className="flex gap-3 items-center">
                <EditModal resourceID={r.id} onUpdated={fetchResources} />
                <DeleteModal
                  deleteResource={() => {
                    deleteResource(r.id);
                  }}
                />
              </div>
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
}

export default DisplayResources;
