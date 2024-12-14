import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AllApiDataHooks } from "../hooks/AllApiData";
axios.defaults.withCredentials = true;
const Login = () => {
  let navigate = useNavigate();
  const [login, setlogin] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { AuthLogin } = AllApiDataHooks();

  const HandleLogin = async (e) => {
    e.preventDefault();
    AuthLogin(login);
  };
  return (
    <div className="container mx-auto">
      <div className=" h-96 bg-slate-100   w-[50%]  lg:w-[40%] mx-auto my-5">
        {/* image */}
        <div className="flex p-1 bg-blue-500 border border-white justify-center items-center">
          <div className="w-20 h-20 ">
            <img className="h-full w-full  rounded-full" src={'iamge'} alt="" />
          </div>
        </div>
        {/* image */}

        {/* input */}

        <div className="h-96  overflow-y-scroll scroll my-1 flex  flex-col">
          <form onSubmit={HandleLogin}>
            <div className="h-auto px-2 flex-col gap-2  w-full  ">
              <label className="text-lg w-full font-semibold " htmlFor="">
                E-mail or username :
              </label>
              <input
                value={login.email}
                onChange={(e) =>
                  setlogin({
                    ...login,
                    email: e.target.value,
                    username: e.target.value,
                  })
                }
                className=" w-full my-2 
                rounded h-10 
                outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="text"
                placeholder="Enter E-mail or username"
              />
            </div>
            <div className="h-auto px-2 flex-col gap-2  w-full  ">
              <label className="text-lg w-full font-semibold " htmlFor="">
               Password :
              </label>
              <input
                value={login.password}
                onChange={(e) =>
                  setlogin({
                    ...login,
                    password: e.target.value
                  })
                }
                className=" w-full my-2 
                rounded h-10 
                outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="text"
                placeholder="Enter E-mail or username"
              />
            </div>
            
            <Link
              style={{ float: "right" }}
              to="/forgerpassword"
              className="-mt-2 mr-4 text-sm hover:underline cursor-pointer hover:text-red-500"
            >
              Forgetpassword?
            </Link>

            <div className="w-40 mx-auto">
              <button className="w-40 mx-auto hover:bg-blue-600 text-white  py-2 px-4 rounded-full bg-blue-500 my-6">
                Login
              </button>
            </div>
            <p className="text-sm -mt-3 m-4">
              I Don't Have An Account{" "}
              <Link to="/signup" className="text-red-500 hover:text-red-700">
                SignUp
              </Link>
            </p>
          </form>
        </div>

        {/* input */}
      </div>
    </div>
  );
};

export default Login;
