import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const redirect = useNavigate();
  async function signOut() {
    console.log("log out button clicked");

    const { error } = await supabase.auth.signOut();
    if (!error) {
      redirect("/auth/signin");
      localStorage.removeItem("userName");
    }

    console.log("an error occured: ", error);
  }
  return (
    <div>
      <button className="text-gray-400 text-sm underline" onClick={signOut}>
        Logout
      </button>
    </div>
  );
};

export default SignOutButton;
