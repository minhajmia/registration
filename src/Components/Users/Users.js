import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const Users = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myRegisterInfo, setMyRegisterInfo] = useState(null);

  useEffect(() => {
    fetch(
      `https://server-six-xi.vercel.app/users/loginUser?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setMyRegisterInfo(data));
  }, [user?.email]);

  // logout
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log Out Successful");
        navigate("/register");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="flex justify-center items-center mt-10">
      <div>
        <div className="border shadow-2xl p-5 mt-10 rounded-lg ">
          <h4 className="my-3 text-center font-semibold text-2xl">
            Your Registered Information{" "}
          </h4>
          <p>Name: {myRegisterInfo?.name}</p>
          <p>Email: {myRegisterInfo?.email}</p>
          <p>Phone: {myRegisterInfo?.phone}</p>
          <p>Address: {myRegisterInfo?.address}</p>
        </div>
        <Link>
          <button onClick={handleLogOut} className="block m-auto btn mt-5">
            Log Out
          </button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default Users;
