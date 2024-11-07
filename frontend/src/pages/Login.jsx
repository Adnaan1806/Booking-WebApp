import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHander = async (event) => {
    event.preventDefault();
  };

  return (
    <form className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-lg text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl w-full flex justify-center font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="w-full flex justify-center">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
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
        <button className="bg-customOrange text-white w-full py-2 rounded-md text-base mt-2 hover:bg-lightRed">
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
