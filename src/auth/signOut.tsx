import { supabase } from "@/supabaseClient";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const redirect = useNavigate();
  async function signOut() {
    console.log("log out button clicked");

    const { error } = await supabase.auth.signOut();
    !error
      ? redirect("/auth/signin")
      : console.log("an error occured: ", error);
  }
  return (
    <div>
      <button className="" onClick={signOut}>
        <LogOutIcon size={20} />
      </button>
    </div>
  );
};

export default SignOutButton;
