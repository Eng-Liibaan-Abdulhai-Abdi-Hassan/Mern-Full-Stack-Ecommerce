import React from 'react'
import CurrencyChange from '../helpers/CurrencyChange'
import { useOutletContext } from 'react-router-dom'
import AddCart from './AddCart'

const SearchProductCard = ({ productname, AddCartSign, category, productimage, price, sellingprice, _id }) => {
    let { load } = useOutletContext()
    const HandleAddCart = async (addcartid) => {
        AddCart(addcartid, AddCartSign).then(() => load())
    }

    return (
        <div className="bg-white w-full h-80 ">
            <div className="h-40 w-full">
                <img className="h-40 w-full" src={productimage[0]} alt="" />
            </div>
            <div className="h-40 lg:w-64 text-center  ">
                <h1 className="font-semibold   line-clamp-1 mx-auto p-1" >{productname}</h1>
                <h1 className="font-medium text-gray-400  line-clamp-1 mx-auto p-1" >{category}</h1>

                <div className="flex gap-2 items-center justify-center p-1">
                    <p className="text-red-500  font-bold line-clamp-1 ">{CurrencyChange(price)}</p>
                    <p className="text-slate-500 line-through  font-semibold line-clamp-1 ">{CurrencyChange(sellingprice)}</p>
                </div>
                <button onClick={() => HandleAddCart(_id)} className="h-7 hover:bg-red-700 bg-red-500 font-bold text-white lg:w-40 w-80 mt-3 rounded-xl">Add Cart</button>
            </div>
        </div>
    )
}

export default SearchProductCard
