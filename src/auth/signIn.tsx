import { Input } from "@/components/ui/input";
import { supabase } from "@/supabaseClient";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
  const redirect = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!error) {
      redirect("/");
      console.log("login sucessful: ", data);
    } else {
      switch (error.message) {
        case "Email not confirmed":
          toast.error("Kindly Confirm your email to login");
          break;
        case "Invalid login credentials":
          toast.error("Invalid login credentials");
          break;
        default:
          toast.error(
            "An error occured while trying to log in.Try again later"
          );
          break;
      }
    }
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="grid w-full max-w-sm items-center gap-3 text-blue-950 ml-5">
          <Label htmlFor="email">Email</Label>
          <Input
            className="border border-black/20"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Email"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            className="border border-black/20"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-blue-950 text-white py-2 rounded-md"
            onClick={signInWithEmail}
          >
            Login
          </button>
          <p className="text-sm text-center text-black">
            Dont have an account?
            <Link
              to="/auth/signup"
              className="text-blue-950 hover:underline hover:font-semibold"
            >
              SignUp
            </Link>
          </p>
          <ToastContainer hideProgressBar={true} />
        </div>
      </div>
    </>
  );
};

export default SignIn;
