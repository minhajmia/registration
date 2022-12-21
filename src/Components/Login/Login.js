import React, { useContext, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const Login = () => {
  const { login, changePassword, user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    setError("");
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email && password)
      login(email, password)
        .then((result) => {
          if (user?.emailVerified) {
            emailRef.current.value = "";
            passwordRef.current.value = "";
            toast.success("Login successful");
            navigate("/users");
          } else {
            toast.error("Please register and verify email");
            emailRef.current.value = "";
            passwordRef.current.value = "";
          }
        })
        .catch((err) => {
          const message = err.message;
          setError(message);
        });
  };

  const forgetPasswordHandler = () => {
    const email = emailRef.current.value;
    if (email) {
      changePassword(email).then(() => (emailRef.current.value = ""));
      toast.success("Please check your email with spam and reset new password");
    }
  };
  return (
    <div className="flex justify-center items-center my-8">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 py-10 px-5  rounded-lg shadow-2xl "
      >
        <h2 className="text-center font-semibold text-2xl">Login</h2>
        <div className="form-control">
          <label htmlFor="">Email</label>
          <input
            type="email"
            required
            placeholder="Email "
            className="input input-bordered w-full"
            ref={emailRef}
          />
        </div>
        <div className="form-control">
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password "
            className="input input-bordered w-full"
            ref={passwordRef}
          />
        </div>
        <p className="text-red-500">{error}</p>
        <input
          type="submit"
          className="btn block m-auto mt-4 capitalize  w-full"
          value="Login Now"
        />
        <div className="text-center mt-2">
          <button
            onClick={forgetPasswordHandler}
            className="font-semibold underline text-blue-500 italic"
          >
            Forget Password ?
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="font-semibold">
            {" "}
            New user?{" "}
            <Link
              to="/register"
              className="font-semibold underline text-blue-500 italic"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
