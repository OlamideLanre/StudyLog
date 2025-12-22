import { useEffect } from "react";
import { useUser } from "./useUser";
import { supabase } from "@/supabaseClient";
import type { categoryProps } from "@/lib/utils";

export function getCatgory({ setCategory, setLoading }: categoryProps) {
  const { user } = useUser();
  useEffect(() => {
    if (!user?.id) return;
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
          console.log(error.message);
        }
      } catch (error) {
        setLoading(false);
        console.log("An error occured while fetching category data");
      }
    };
    fetchCategory();
  }, [user]);
}
