import { useEffect } from "react"
import CurrencyChange from "../helpers/CurrencyChange"
import { AllApiDataHooks } from "../hooks/AllApiData"
import { Link, useOutletContext } from "react-router-dom"
import { useRef } from "react"
import AddCart from "./AddCart"

const ProductDetailsCard = ({ AddCartSign, _id, category, list, loading }) => {
  let { load } = useOutletContext()
  const HandleAddCart = async (addcartid) => {
    AddCart(addcartid, AddCartSign).then(() => load())
  }
  const { filterproductcategory, productcategory } = AllApiDataHooks();
  let filterdata = productcategory.filter((data) => data._id !== _id)
  useEffect(() => {
    filterproductcategory(category)
  }, [category])

  const scroll = useRef()
  window.scrollTo({
    behavior: "smooth",
    top: 0
  })
  return (
    <div className="container mx-auto  mt-10 ">

      <div className="bg-slate-100 shadow-md">
        <div className="grid lg:grid-cols-4 gap-2 p-1 md:grid-cols-2  sm:grid-cols-2 overflow-scroll h-[500px] scroll w-full mx-auto ">

          {
            loading && list.map((_, index) => (
              <div ref={scroll} key={index} className="bg-white rounded-xl shadow-md animate-pulse  w-full h-80 ">
                <div className="h-40 w-full bg-slate-400 ">
                </div>
                <div className="h-40 lg:w-64 text-center px-2 ">
                  <h1 className="font-semibold mt-4   line-clamp-1 mx-auto  h-5 bg-slate-400 rounded-full " ></h1>
                  <h1 className="font-semibold mt-4   line-clamp-1 mx-auto h-5 bg-slate-400 rounded-full " ></h1>
                  <h1 className="font-semibold mt-4   line-clamp-1 mx-auto  h-5 bg-slate-400 rounded-full " ></h1>
                  <h1 className="font-semibold mt-4   line-clamp-1  h-5 bg-slate-400 w-40 rounded-full " ></h1>


                </div>
              </div>
            ))
          }
          {/* VerticalDetails */}
          {
            filterdata.map((data, index) => (
              <div ref={scroll} key={index} className=" shadow-md w-full h-80 ">
                <Link to={'/ProductDetails/' + data._id} className="h-40 w-full">
                  <img className="h-40 w-full rounded-t-lg object-fill" src={data.productimage[0]} alt="" />
                </Link>
                <div className="h-40 lg:w-64 text-center bg-white  shadow-md w-full ">
                  <h1 className="font-semibold   line-clamp-1 mx-auto p-1" >{data.productname}</h1>
                  <h1 className="font-medium text-gray-400  line-clamp-1 mx-auto p-1" >{data.category}</h1>

                  <div className="flex gap-2 items-center w-full justify-evenly p-1">
                    <p className="text-red-500  font-bold line-clamp-1 ">{CurrencyChange(data.price)}</p>
                    <p className="text-slate-500 line-through  font-semibold line-clamp-1 ">{CurrencyChange(data.sellingprice)}</p>
                  </div>
                  <button onClick={() => HandleAddCart(_id)} className="h-7 hover:bg-red-700 bg-red-500 font-bold text-white lg:w-40 w-72 mt-3 rounded-xl">Add Cart</button>
                </div>
              </div>
            ))
          }





        </div>
      </div>
    </div>
  )
}

export default ProductDetailsCard
