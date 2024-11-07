import React, { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("Admin");

  return (
    <form className="min-h-[100vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-lg text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        <button className="bg-primary text-white w-full py-2 rounded-md text-base hover:bg-lightRed hover:font-medium">
          Login
        </button>

        <div className="w-full flex justify-center mt-1">
          {state === "Admin" ? (
            <p>
              Doctor Login? <span className="text-primary underline cursor-pointer font-medium" onClick={() => setState('Doctor')}>Click here</span>
            </p>
          ) : (
            <p>
              Admin Login? <span className="text-primary underline cursor-pointer font-medium"  onClick={() => setState('Admin')}>Click here</span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;