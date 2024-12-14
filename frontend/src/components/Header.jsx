import { useEffect, useState } from "react"
import { FaShoppingCart, FaUserEdit } from "react-icons/fa"
import { IoSearch } from "react-icons/io5"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useusercontext } from "../context/Context"
import { AllApiDataHooks } from "../hooks/AllApiData"
import { RiAdminFill } from "react-icons/ri"
import { FaBorderAll } from "react-icons/fa6"
const Header = ({ total, load }) => {

    let location = useLocation()
    const { AuthLogout, loading } = AllApiDataHooks()

    const { authlogin } = useusercontext()

    const [displaymenu, setdisplaymenu] = useState(false)

    let SearchInput = new URLSearchParams(location.search).get('search')
    const [search, setsearch] = useState(SearchInput || '')
    let navigate = useNavigate()
    const HandleSearch = (e) => {
        let { value } = e.target;
        setsearch(value)
        if (value) {
            navigate('/SearchProduct?search=' + value)
        } else {
            navigate('')
        }

    }


    const HandLogout = () => {
        load()
        AuthLogout()

    }



    return (
        <div className="bg-white shadow-md lg:rounded-lg fixed w-full z-40 h-14">
            <div className="flex h-full px-5 lg:px-0 cursor-pointer justify-between items-center  container mx-auto">
                <Link to='' className="lg:text-xl md:text-lg text-xs font-bold ">Hubal Market</Link>
                <div className="md:flex lg:flex hidden">
                    <input value={search} onChange={HandleSearch} type="text" className="border border-slate-300 outline-none  px-4 h-9 w-72 rounded-l-full " placeholder="Search Product ...." />
                    <button className="bg-blue-500 rounded-r-full w-16 h-9 flex items-center justify-center ">
                        <IoSearch size={24} color="white" />
                    </button>
                </div>

                <div className=" relative flex gap-4   items-center ">
                    <div onClick={() => setdisplaymenu(!displaymenu)} className=" w-full h-full border rounded-full border-slate-400">
                        <div className="">
                            <img className="h-8 w-8   rounded-full " src={authlogin ? authlogin?.avator : 'https://www.bing.com/th?id=OIP.1gqxePGrU4JMYrWZJy1XaQAAAA&w=157&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'} alt="" />
                        </div>
                        {
                            displaymenu &&
                            <div className="absolute right-4  w-44 top-12 shadow-md rounded  bg-red-500" onClick={() => setdisplaymenu(!displaymenu)}>
                                {
                                    authlogin?.role === "admin" ?
                                        <div className="h-32" >
                                            <Link to='/AdminDashboard' className="flex gap-2 p-1 hover:text-white mt-2 hover:bg-blue-500  items-center ">
                                                <RiAdminFill size={24} />
                                                <h1 className="font-medium text-neutral-700 tracking-wider">AdminDashboard</h1>
                                            </Link>
                                            <Link to='/AdminDashboard/AllOrderPayments' className="flex gap-2 p-1 hover:text-white mt-2 hover:bg-blue-500  items-center ">
                                                <FaBorderAll size={24} />
                                                <h1 className="font-medium text-neutral-700 tracking-wider">Order</h1>
                                            </Link>
                                            <Link to='/EditProfile' className="flex gap-2 p-1 hover:text-white mt-2 hover:bg-blue-500  items-center ">
                                                <FaUserEdit size={24} />
                                                <h1 className="font-medium text-neutral-700 tracking-wider">Update Profile</h1>
                                            </Link>
                                        </div>

                                        :
                                        <div className="h-24">

                                            <Link to='/Order' className="flex gap-2 p-1 hover:text-white mt-2 hover:bg-blue-500  items-center ">
                                                <FaBorderAll size={24} />
                                                <h1 className="font-medium text-neutral-700 tracking-wider">Order</h1>
                                            </Link>
                                            <Link to='/EditProfile' className="flex gap-2 p-1 hover:text-white mt-2 hover:bg-blue-500  items-center ">
                                                <FaUserEdit size={24} />
                                                <h1 className="font-medium text-neutral-700 tracking-wider">Update Profile</h1>
                                            </Link>
                                        </div>
                                }
                            </div>


                        }

                    </div>



                    {
                        authlogin &&
                        <Link to='cart' className="relative">
                            <div>
                                <FaShoppingCart size={24} color="#00f" />
                            </div>
                            <div className="bg-red-500  absolute  items-center justify-center flex rounded-full text-white w-6 min-w-full h-6 -top-4 -right-4">
                                {total}
                            </div>
                        </Link>
                    }

                    {
                        !authlogin ?

                            <Link to='/login' className="text-sm font-bold ">Login</Link> :
                            loading ?
                                <h1>loading</h1>
                                :
                                <Link to='/' onClick={HandLogout} className="text-sm  ">Logout</Link>

                    }
                </div>
            </div>
        </div>
    )
}

export default Header
