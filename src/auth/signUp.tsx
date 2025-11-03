import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/supabaseClient";
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
      <div className="h-screen grid grid-cols-2">
        <div className="bg-pink-300">Left side</div>
        <div className="flex items-center justify-center">
          <div className="grid w-full max-w-sm items-center gap-3 text-blue-950 p-5">
            <div className="flex gap-4">
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
            </div>
            <Label htmlFor="email">Email</Label>
            <Input
              className="border border-black/20"
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              value={userDetails.email}
              type="email"
              id="email"
              placeholder="Email"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              className="border border-black/20"
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              value={userDetails.password}
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
