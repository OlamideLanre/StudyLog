import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/supabaseClient";
import { Eye, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const redirect = useNavigate();
  const [userDetails, setUserDetails] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: userDetails?.email,
      password: userDetails?.password,
    });
    if (!error) {
      redirect("/");
      localStorage.setItem("userName", userDetails.first_name);
    } else {
      switch (error.message) {
        case "Password should be at least 6 characters":
          toast.error("Password should be at least 6 characters");
          break;
        case `Email address "${userDetails.email}" is invalid`:
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
      <div className="h-screen">
        <div className="bg-blue-950 h-[50vh] relative"></div>
        <div className="flex items-center justify-center shadow-md bg-white rounded-md w-90 md:w-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
          <div className="grid w-full max-w-sm items-center gap-3 text-blue-950 p-5">
            <div className="text-center">
              <h1 className="text-3xl text-black font-bold mb-2">
                Create an account
              </h1>
              <p className="text-gray-400 text-sm font-semibold">
                Join Study Log to start tracking your <br /> progress
              </p>
            </div>
            {/* <div className="flex gap-4">
              <div>
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  className="border border-black/20"
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      first_name: e.target.value,
                    })
                  }
                  value={userDetails.first_name}
                  type="first-name"
                  id="first-name"
                  placeholder="first-name"
                />
              </div>
              <div>
                {" "}
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  className="border border-black/20"
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      last_name: e.target.value,
                    })
                  }
                  value={userDetails.last_name}
                  type="last-name"
                  id="last-name"
                  placeholder="last-name"
                />
              </div>
            </div> */}
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                className="border border-black/20 pl-9"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                value={userDetails.email}
                type="email"
                id="email"
                placeholder="Email"
              />
              <div
                className="absolute inset-y-0 left-0 pl-3 
                    flex items-center 
                    pointer-events-none"
              >
                <Mail className="text-gray-400" size={18} />
              </div>
            </div>

            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                className="border border-black/20 pl-9"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
                value={userDetails.password}
                type="password"
                id="password"
                placeholder="Password"
              />
              <div
                className="absolute inset-y-0 left-0 pl-3 
                    flex items-center 
                    pointer-events-none"
              >
                <LockKeyhole className="text-gray-400" size={18} />
              </div>
              <div
                className="absolute inset-y-0 right-0 pr-3 text-gray-400
                    flex items-center 
                    "
              >
                <Eye className="cursor-pointer" />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-950 text-white py-2 rounded-md"
              onClick={signUpNewUser}
            >
              Sign Up
            </button>
            <p className="text-sm text-center text-black">
              Already have an account?
              <Link
                to="/auth/signin"
                className="text-blue-950 hover:underline font-bold"
              >
                Sign In
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
