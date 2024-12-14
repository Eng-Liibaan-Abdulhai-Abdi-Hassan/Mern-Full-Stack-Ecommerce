import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import ProductDetailsCard from "./ProductDetailsCard";
import CurrencyChange from "../helpers/CurrencyChange";
import { useEffect } from "react";
import { useOutletContext, useParams } from 'react-router-dom'
import { AllApiDataHooks } from "../hooks/AllApiData";
import { useState } from "react";
import AddCart from "./AddCart";
const ProductDetails = () => {
    let { id } = useParams()
    const [ActiveImage, setActiveImage] = useState('')
    const [IsZoom, setIsZoom] = useState(false)
    const [ZoomImage, setZoomImage] = useState({
        y: 0,
        x: 0
    })

    const { ProductDetails, loading, AddCartSign, singleproduct } = AllApiDataHooks()
    let { load } = useOutletContext()
    const HandleAddCart = async (addcartid) => {
        AddCart(addcartid, AddCartSign).then(() => load())
    }
    useEffect(() => {
        ProductDetails(id, setActiveImage)
    }, [id])

    const HandleZoomIn = (e) => {
        setIsZoom(true)
        let { left, height, top, width } = e.target.getBoundingClientRect()
        let x = (e.clientX - left) / width
        let y = (e.clientY - top) / height
        setZoomImage({
            y,
            x
        })

    }
    const HandleZoomOut = (e) => {
        setIsZoom(false)

    }




    const HandleOnMouseEnter = (activeimage) => {
        setActiveImage(activeimage)

    }
    const list = new Array(30).fill()
    return (
        <div className="container mx-auto cursor-pointer  ">
            <div className="flex gap-2">
                <div className="bg-white  overflow-scroll scroll h-80 mb-2 lg:w-32 min-w-24">
                    {
                        loading ? list.map((_, index) => (
                            <div key={index} className="lg:h-28 animate-pulse h-20 w-full mb-1">
                                <div
                                    className="lg:h-28 bg-slate-400 h-20 w-full">
                                </div>
                            </div>
                        )) :
                            singleproduct?.productimage.map((data, index) => (
                                <div

                                    onMouseEnter={() => HandleOnMouseEnter(data)

                                    }
                                    onClick={() => HandleOnMouseEnter(data)

                                    }
                                    key={index} className="lg:h-28 h-20 w-full mb-1">
                                    <img className="lg:h-28 h-20 w-full" src={data} alt="" />
                                </div>
                            ))
                    }

                </div>

                <div className="bg-white border shadow-md w-full h-80">

                    <div className="grid lg:grid-cols-[308px,1fr] grid-cols-1 gap-2 lg:h-full">
                        {
                            loading ?
                                <div

                                    className="lg:block animate-pulse  bg-slate-400  lg:h-full hidden  h-80  ">

                                </div> :
                                <div
                                    onMouseLeave={HandleZoomOut}
                                    onMouseEnter={HandleZoomIn}
                                    onClick={HandleZoomIn}
                                    className="lg:block hidden lg:h-60  lg:mt-9 h-80">
                                    <img className="w-full h-full" src={ActiveImage} alt="" />

                                </div>
                        }
                        {
                            !IsZoom ?

                                loading ?
                                    <div className=" bg-slate-200  h-80  px-4 ">
                                        <div className=" flex gap-4  w-full h-full animate-pulse ">

                                            <div className="h-40 w-full mx-auto   ">
                                                <h1 className="font-semibold  mt-5 line-clamp-1 bg-slate-400 h-7 rounded-full  mx-auto" ></h1>
                                                <h1 className="font-semibold  mt-4 line-clamp-1 bg-slate-400 h-7 rounded-full  " ></h1>
                                                <h1 className="font-semibold w-60 mt-4 line-clamp-1 bg-slate-400 h-7 rounded-full  " ></h1>
                                                <h1 className="font-semibold  mt-4 line-clamp-1 bg-slate-400 h-8 rounded-full  " ></h1>
                                                <h1 className="font-semibold w-72 mt-4 line-clamp-1 bg-slate-400 h-6 rounded-full  " ></h1>






                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className=" px-4 w-full overflow-hidden  h-full">
                                        <h1 className="font-bold  text-3xl line-clamp-1 p-1">{singleproduct.productname} </h1>
                                        <h1 className="font-bold text-gray-500 text-lg line-clamp-1 p-1">{singleproduct.category} </h1>
                                        <div className="flex gap-3">
                                            <p className="text-red-500 font-bold">{CurrencyChange(singleproduct.price)}</p>
                                            <p className="text-gray-400 font-semibold">{CurrencyChange(singleproduct.sellingprice)}</p>
                                        </div>
                                        <div className=" flex gap-2 p-1 ">
                                            <FaStar size={24} color="red" />
                                            <FaStar size={24} color="red" />
                                            <FaStar size={24} color="red" />
                                            <FaRegStarHalfStroke size={24} color="red" />
                                            <FaStarHalfAlt size={24} color="red" />
                                            <FaStarHalf size={24} color="red" />
                                        </div>

                                        <div className="flex gap-3 p-1">
                                            <button onClick={() => HandleAddCart(id)} className="bg-red-500 rounded-xl h-7 w-40 text-white font-bold hover:bg-red-700">Add Cart</button>
                                            <button className="bg-blue-500 rounded-xl h-7 w-40 text-white font-bold hover:bg-blue-700">Buy Now</button>
                                        </div>
                                        <div className="font-bold ">
                                            Description:
                                        </div>
                                        <p className="line-clamp-4  overflow-y-scroll ">{singleproduct.description}</p>
                                    </div>

                                :
                                <div className="flex items-center w-full smh-60"
                                    style={{
                                        background: `url(${ActiveImage})`,
                                        backgroundAttachment: "100%",
                                        backgroundSize: 'cover',
                                        backgroundPosition: `${ZoomImage.x * 100}% ${ZoomImage.y * 100}%`
                                    }} >

                                </div>
                        }
                    </div>
                </div>
            </div>



            <ProductDetailsCard list={list} loading={loading} AddCartSign={AddCartSign} {...singleproduct} />


        </div>
    )
}

export default ProductDetails
