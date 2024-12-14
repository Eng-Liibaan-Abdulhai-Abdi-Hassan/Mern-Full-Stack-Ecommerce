import { useState } from "react"
import { AllApiDataHooks } from "../hooks/AllApiData"
import CloudinaryUploadImage from "../helpers/CloudinaryUploadImage"
import { useusercontext } from "../context/Context"

const EditProfile = () => {

    const { authlogin,setauthlogin } = useusercontext()
    const [input, setinput] = useState(authlogin)
    const { loading, UpdateUser } = AllApiDataHooks()

    const HandleImage = async (e) => {
        let image = e.target.files[0]
        let data = await CloudinaryUploadImage(image)
        setinput({
            ...input,
            avator: data.url
        })

    }

    const HandleSubmit = async (e) => {
        e.preventDefault()

        let obj = {
            username: input.username,
            email: input.email,
            newpassword: input.newpassword,
            avator: input.avator,
            userid: authlogin?._id
        }
        UpdateUser(obj)
        setauthlogin(obj)
    }

    return (
        <div className='container mx-auto '>
            <div className='fixed items-center flex justify-center top-0 bottom-0 right-0 left-0 bg-red-500'>
                <form onSubmit={HandleSubmit} className='bg-blue-500  rounded lg:h-[420px] h-72 overflow-y-scroll scroll lg:w-[420px]'>
                    <div className='bg-sky-500 items-center p-2 cursor-pointer justify-center flex'>
                        <img className='w-20 h-20 rounded-full' src={authlogin ? input.avator : 'https://www.bing.com/th?id=OIP.1gqxePGrU4JMYrWZJy1XaQAAAA&w=157&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'} />
                    </div>
                    <div className='w-[371px] mx-auto mt-4 space-y-3'>
                        <h1 className='font-bold'>UserName :</h1>
                        <input value={input.username} onChange={(e) => setinput({ ...input, username: e.target.value })} type="text" className='w-full outline-none h-8 rounded   ' />
                    </div>
                    <div className='w-[371px] mx-auto mt-4 space-y-3'>
                        <h1 className='font-bold'>Email :</h1>
                        <input value={input.email} onChange={(e) => setinput({ ...input, email: e.target.value })} type="text" className='w-full h-8 rounded  outline-none  ' />
                    </div>
                    <div className='w-[371px] mx-auto mt-4 space-y-3'>
                        <h1 className='font-bold'>Password :</h1>
                        <input value={input.newpassword} onChange={(e) => setinput({ ...input, newpassword: e.target.value })} type="text" className='w-full h-8 rounded  outline-none  ' />
                    </div>
                    <div className='w-[371px] mx-auto mt-4 space-y-3'>
                        <h1 className='font-bold'>Avator :</h1>
                        <input id="upload" onChange={HandleImage} className="hidden" type="file" />
                        <div className=" border w bg-blue-500  border-slate-200 h-12 items-center flex rounded  ">

                            <label htmlFor="upload" className=' w-full text-center font-bold '>Upload Image</label>
                        </div>
                    </div>
                    <div className='w-[371px] mx-auto mt-5 space-y-4'>
                        <button className='bg-red-500  text-white h-10 rounded mb-10 w-full outline-none'>{loading ? 'loading...' : 'Change Profile'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
