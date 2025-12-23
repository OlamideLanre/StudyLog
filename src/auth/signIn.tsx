import { Input } from "@/components/ui/input";
import { supabase } from "@/supabaseClient";
import { Label } from "@radix-ui/react-label";
import { Eye, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
  const redirect = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!error) {
      setIsLoading(true);
      redirect("/");
      console.log("login sucessful: ", data);
    } else {
      setIsLoading(false);
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
          console.log(error.code);

          break;
      }
    }
  }
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-blue-950 p-5">
        <div className="grid w-full bg-white p-8 rounded-md max-w-sm items-center gap-2 text-blue-950">
          <div className="mb-3">
            <h1 className="font-bold text-center text-2xl">Study Log</h1>
            <p className="text-center text-sm text-slate-500 mt-1">
              welcome back! Please enter your details
            </p>
          </div>

          <Label htmlFor="email" className="font-semibold text-black">
            Email Address
          </Label>
          <Input
            className="border border-black/20"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Enter your email"
          />
          <div className="flex justify-between">
            <Label htmlFor="password" className="font-semibold text-black ">
              Password
            </Label>
            <Link
              to="/password_rest"
              className="text-slate-500 underline text-sm "
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              className="border border-black/20"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 text-gray-400
                    flex items-center 
                    "
            >
              <Eye
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-950 text-white font-semibold py-2 rounded-md"
            onClick={signInWithEmail}
          >
            {isLoading ? <Loader2Icon /> : "Sign In"}
          </button>
          <p className="text-sm text-center text-black mt-5">
            Dont have an account?
            <Link
              to="/auth/signup"
              className="text-blue-950 font-semibold ml-2 underline"
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
