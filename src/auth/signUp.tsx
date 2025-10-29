import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/supabaseClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const redirect = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      //   options: {
      //     emailRedirectTo: "/",
      //   },
    });
    if (!error) {
      redirect("/");
    } else {
      switch (error.message) {
        case "Password should be at least 6 characters":
          toast.error("Password should be at least 6 characters");
          break;
        case `Email address "${email}" is invalid`:
          toast.error(
            "Invalid Email Address. Enter a valid email to create your account."
          );
          break;
        default:
          toast.error(
            "An error occured while creating your acctount.Try again later"
          );
          break;
      }
    }
  }
  return (
    <>
      <div className="h-screen grid grid-cols-2">
        <div className="bg-pink-300">Left side</div>
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
              onClick={signUpNewUser}
            >
              Create Account
            </button>
            <p className="text-sm text-center text-black">
              Already have an account?
              <Link
                to="/auth/signin"
                className="text-blue-950 hover:underline hover:font-semibold"
              >
                SignIn
              </Link>
            </p>
            <ToastContainer hideProgressBar={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
