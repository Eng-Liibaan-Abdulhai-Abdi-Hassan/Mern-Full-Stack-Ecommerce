import { useOutletContext } from "react-router-dom"
import CurrencyChange from "../helpers/CurrencyChange"
import AddCart from "./AddCart"
const FilterCategoryCard = ({ productname,AddCartSign, productimage, category, price, sellingprice,_id }) => {

    let { load } = useOutletContext()
    const HandleAddCart = async ( addcartid) => {
      AddCart(addcartid, AddCartSign).then(()=> load())
    }
  
    return (
        <div className="bg-slate-100 w-full h-80 shadow-md ">
            <div className="h-40 w-full">
                <img className="h-40 w-full rounded-t-lg" src={productimage[0]} alt="" />
            </div>


            <div className="h-40 w-full  mx-auto text-center shadow-md bg-white  ">
                <h1 className="font-semibold  line-clamp-1 mx-auto p-1" >{productname}</h1>
                <h1 className="font-medium text-gray-400  line-clamp-1 mx-auto p-1" >{category}</h1>

                <div className="flex gap-3 items-center justify-center  ">
                    <p className="line-clamp-1 text-red-500  font-bold w-auto mx-auto  ">{CurrencyChange(price)}</p>
                    <p className="line-clamp-1 text-slate-500 w-auto mx-auto font-semibold">{CurrencyChange(sellingprice)}</p>
                </div>
                <button onClick={()=>HandleAddCart(_id)} className="h-7  hover:bgopc400
               bg-red-600 mt-3 hover:bg-red-700 font-bold text-white lg:w-48 w-60  rounded-xl">Add Cart</button>
            </div>
        </div>
    )
}

export default FilterCategoryCard
