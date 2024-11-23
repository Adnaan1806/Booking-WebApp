import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHander = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", { name, password, email });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
          // Redirect to login page after successful account creation
          setState("Login");
          navigate("/login");  // Navigate to login page
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", { password, email });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          window.location.href = "http://localhost:3004/";  // Redirect after successful login
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHander} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-lg text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl w-full flex justify-center font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="w-full flex justify-center">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-customOrange text-white w-full py-2 rounded-md text-base mt-2 hover:bg-lightRed"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="w-full flex justify-center mt-1">
          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-customOrange font-medium underline cursor-pointer"
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-customOrange font-medium underline cursor-pointer"
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
