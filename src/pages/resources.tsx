import { useCategoryContext, useResourcesContext } from "@/globalContext";
import { useState } from "react";

function DisplayResources() {
  const [loading, setLoading] = useState<Boolean>(false);
  const { selectedCategory } = useCategoryContext();
  const { selectedResource } = useResourcesContext();

  return (
    <>
      <div className="bg-black h-screen flex flex-col gap-2 items-center">
        {loading ? (
          <p>Loading..</p>
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
              <a
                href={r.link}
                target="_blank"
                className="text-sm hover:text-orange-500"
              >
                {r.link}
              </a>
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
