import DeleteModal from "@/components/modal/delete.modal";
import EditModal from "@/components/modal/edit.modal";
import { useResourcesContext } from "@/globalContext";
import { user } from "@/hooks/getUser";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { supabase } from "@/supabaseClient";
import { Share } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function DisplayResources() {
  const [loading, setLoading] = useState<Boolean>(true);
  const [searchVal, setSearchVal] = useState("");
  const { id, category } = useParams();
  const { selectedResource, setResources } = useResourcesContext();
  const [error, setError] = useState<string>("");
  const isOnline = useOnlineStatus();

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
    } else {
      console.log(isOnline);
      !isOnline
        ? setError("Could not delete, you’re offline.")
        : setError("Something went wrong, try again.");
    }
  };

  //CLEAR ERROR WHEN INTERNET IS RECONNECTED
  useEffect(() => {
    if (isOnline) {
      setError(""); // clear error when back online
    }
  }, [isOnline]);

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
  async function fetchUpdatedResources() {
    if (!category) return;
    let { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("user_id", user?.id)
      .eq("category_id", id);

    if (!error) {
      setResources(data ?? []);
    }
  }
  // FETCHES RESOURCES WHEN USER REDIRECTS FROM LINK OR DIRECT URL
  useEffect(() => {
    async function display() {
      let { data: resources, error } = await supabase
        .from("resources")
        .select("*")
        .eq("user_id", user?.id)
        .eq("category_id", id);
      setLoading(true);
      if (error) {
        setError("Something went wrong, try again.");
      } else {
        setResources(resources ?? []);
        setLoading(false);
      }
    }
    display();
  }, [id]);

  //SHAREABLE LINK
  async function ShareResource(ID: number) {
    const BaseURL = `https://study-log-tawny.vercel.app/share/${ID}`;
    try {
      await window.navigator.clipboard.writeText(BaseURL);
      toast("Resource link to clipboard!");
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      toast("Copy to link failed.");
    }
  }

  return (
    <div className="bg-black h-screen flex flex-col gap-2 p-5 md:p-10 dark:bg-white dark:text-black">
      <h1 className="text-white dark:text-black text-3xl font-semibold my-3">
        {category}
      </h1>
      <input
        type="text"
        placeholder="search a resource"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        className="placeholder:text-gray-400 py-2 pl-2 w-full md:w-1/2 border border-white dark:border-black rounded-md text-white dark:text-black outline-none"
      />
      {loading ? (
        <p>Loading...</p>
      ) : filteredResources?.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <h1 className="font-semibold text-xl dark:text-black text-white">
            No saved sessions
          </h1>
        </div>
      ) : (
        filteredResources?.map((r) => (
          <div
            key={r.id}
            className="bg-[#282828] text-white w-full xl:w-[60%] p-4 rounded-md dark:bg-[#eaf4f4] dark:text-black"
          >
            <div className="flex justify-between">
              <h1 className="font-semibold text-lg">{r.title}</h1>
              <div className="flex gap-3 items-center">
                <EditModal
                  resourceID={r.id}
                  onUpdated={fetchUpdatedResources}
                />
                <DeleteModal
                  deleteResource={() => {
                    deleteResource(r.id);
                  }}
                  delError={error}
                />
                <Share
                  className="cursor-pointer"
                  onClick={() => ShareResource(r.id)}
                  size={17}
                />
                <ToastContainer />
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
