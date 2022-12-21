import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-hot-toast";

const Register = () => {
  const { register, verifyEmail } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  const handleSubmit = (event) => {
    setError("");
    event.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;
    const registerUser = { name, email, password, phone, address };
    register(email, password)
      .then((result) => {
        saveUserToDB(registerUser);
        emailVerification();
        toast.success("please Verify your email");
        nameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        phoneRef.current.value = "";
        addressRef.current.value = "";
      })
      .catch((err) => {
        const message = err.message;
        setError(message);
      });
  };

  //  save register user to database
  const saveUserToDB = (registerUser) => {
    fetch("https://server-six-xi.vercel.app/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerUser),
    });
  };

  // email verification
  const emailVerification = () => {
    verifyEmail()
      .then(() => {})
      .catch((error) => console.error(error));
  };
  return (
    <div className="flex justify-center items-center my-8">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 py-5 px-5  rounded-lg shadow-2xl"
      >
        <h2 className="text-center font-semibold text-2xl">Register</h2>
        <div className="form-control">
          <label htmlFor="">Name</label>
          <input
            type="text"
            required
            placeholder="Name "
            ref={nameRef}
            className="input input-bordered w-full"
          />
        </div>
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
        <div className="form-control ">
          <label htmlFor="">Password</label>
          <input
            type="password"
            required
            placeholder="Password "
            className="input input-bordered w-full "
            ref={passwordRef}
          />
        </div>
        <p className="text-red-500">{error}</p>
        <div className="form-control">
          <label htmlFor="">Phone</label>
          <input
            type="number"
            required
            placeholder="Phone number "
            className="input input-bordered w-full"
            ref={phoneRef}
          />
        </div>
        <div className="form-control">
          <label htmlFor="">Address</label>
          <input
            type="text"
            required
            placeholder="Address "
            className="input input-bordered w-full"
            ref={addressRef}
          />
        </div>
        <input
          type="submit"
          className="btn block m-auto mt-4 w-full capitalize"
          value="Register Now"
        />
        <div className="text-center mt-2">
          <p className="font-semibold">
            {" "}
            Already have an account?{" "}
            <Link to="/login" className="underline text-blue-500 italic">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
