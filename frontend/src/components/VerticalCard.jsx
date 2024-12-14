import { Link, useOutletContext } from 'react-router-dom'
import CurrencyChange from '../helpers/CurrencyChange'
import { useEffect } from 'react'
import { AllApiDataHooks } from '../hooks/AllApiData'
import AddCart from './AddCart'
const VerticalProductCard = ({loading, category }) => {
  let list = new Array(30).fill()
  const { filterproductcategory,AddCartSign, productcategory } = AllApiDataHooks()
  useEffect(() => {
    filterproductcategory(category)
  }, [])

  let { load } = useOutletContext()
  const HandleAddCart = async ( addcartid) => {
    AddCart(addcartid, AddCartSign).then(()=> load())
  }

  return (
    <div className="container mx-auto">
      <h1 className='font-bold text-gray-500 text-2xl my-4'>{category}</h1>

      <div className="mb-1 h-[355px] rounded-md lg:h-[360px]  items-center px-2 bg-slate-100   flex scroll overflow-scroll gap-2">
        {
          loading ? list.map((data, index) => (
            <div key={index} className="w-72 h-80 bg-slate-200 animate-pulse ">
              <div className="w-72">
                <div className="h-40    bg-slate-400"></div>
                <div className="h-6   rounded-full m-2 bg-slate-400"></div>
                <div className="h-4  rounded-full m-2 bg-slate-400"></div>
                <div className="h-6 w-40   rounded-full m-2 bg-slate-400"></div>
                <div className="h-5   rounded-full m-2 bg-slate-400"></div>
                <div className="h-6  w-48  rounded-full m-2 bg-slate-400"></div>
              </div>

            </div>
          )) :
            productcategory.map((data, index) => (
              <div key={index} className="w-72 h-80 bg-slate-100 shadow-md rounded-b-lg">
                <Link to={'/ProductDetails/' + data._id}  className="w-72 h-44">
                  <img className="w-72 h-44 rounded-t-lg" src={data.productimage[0]} alt="" />
                </Link>
                <div className="h-40 w-64  mx-auto text-center shadow-md bg-white   ">
                  <h1 className="font-semibold  line-clamp-1 mx-auto p-1" >{data.productname}</h1>
                  <h1 className="font-medium text-gray-400  line-clamp-1 mx-auto p-1" >{data.category}</h1>



                  <div className="flex gap-3 items-center justify-center  ">
                    <p className="line-clamp-1 text-red-500  font-bold w-auto mx-auto  ">{CurrencyChange(data.price)}</p>
                    <p className="line-clamp-1 text-slate-500 w-auto mx-auto font-semibold">{CurrencyChange(data.sellingprice)}</p>
                  </div>
                  <button onClick={()=>HandleAddCart(data._id)} className="h-7  hover:bgopc400
               bg-red-600 mt-3 hover:bg-red-700 font-bold text-white lg:w-48 w-60  rounded-xl">Add Cart</button>
                </div>
              </div>
            ))
        }

      </div>



    </div>
  )
}

export default VerticalProductCard
