import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AllApiDataHooks } from "../hooks/AllApiData";
import ImageBase64 from '../helpers/Imagebase64'
const SignUp = () => {
    const [signup, setsignup] = useState({
        email: "",
        password: "",
        avator: [],
        username: "",
        Confirmpassword: "",
    });
    let navigate = useNavigate();
    const HandleImage = async (e) => {
        let images = e.target.files;
        Array.from(images).map(async (data) => {
            let ArrayImages = await ImageBase64(data);
            setsignup((prev) => {
                return {
                    ...prev,
                    avator: [...prev.avator, ArrayImages],
                };
            });
        });
    };

    const { uploadUser } = AllApiDataHooks();

    const Handlesignup = async (e) => {
        e.preventDefault();
        uploadUser(signup);
    };
    return (
        <div className="container mx-auto">
            <div className=" h-auto bg-slate-100 w-[50%]  lg:w-[40%]  mx-auto my-5">
                {/* image */}
                <div className="flex p-1 bg-blue-500 border border-white justify-center items-center">
                    <div className="w-20 h-20  ">
                        <label htmlFor="Upload">
                            <img
                                className="h-full w-full  rounded-full border border-white"
                                src={signup.avator[0] ? signup.avator[0] : 'iamge'}
                                alt=""
                            />
                            <input
                                id="Upload"
                                hidden
                                type="file"
                                multiple
                                onChange={HandleImage}
                            />
                        </label>
                    </div>
                </div>
                {/* image */}

                {/* input */}

                <div className="h-96 w-full overflow-y-scroll scroll my-1 flex  flex-col">
                    <form onSubmit={Handlesignup}>
                        <div className="h-auto px-2 flex-col gap-2  w-full  ">
                            <label className="text-lg w-full font-semibold " htmlFor="">
                                UserName :
                            </label>
                            <input
                                value={signup.username}
                                onChange={(e) =>
                                    setsignup({...signup,
                                        username: e.target.value
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
                                E-mail :
                            </label>
                            <input
                                value={signup.email}
                                onChange={(e) =>
                                    setsignup({
                                        ...signup,
                                        email: e.target.value
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
                                value={signup.password}
                                onChange={(e) =>
                                    setsignup({
                                        ...signup,
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

                        <div className="h-auto px-2 flex-col gap-2  w-full  ">
                            <label className="text-lg w-full font-semibold " htmlFor="">
                                ConfirmPassword :
                            </label>
                            <input
                                value={signup.Confirmpassword}
                                onChange={(e) =>
                                    setsignup({
                                        ...signup,
                                        Confirmpassword: e.target.value
                                    })
                                }
                                className=" w-full my-2 
                rounded h-10 
                outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                                type="text"
                                placeholder="Enter E-mail or username"
                            />
                        </div>



                        <div className="w-40 mx-auto">
                            <button className="w-40 mx-auto hover:bg-blue-600 text-white  py-2 px-4 rounded-full bg-blue-500 my-6">
                                signup
                            </button>
                        </div>
                        <p className="text-sm -mt-3 m-4">
                            Already Have An Account{" "}
                            <Link to="/signup" className="text-red-500 hover:text-red-700">
                                signup
                            </Link>
                        </p>
                    </form>
                </div>

                {/* input */}
            </div>
        </div>
    );
};

export default SignUp;
