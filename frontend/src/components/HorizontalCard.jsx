import { Link, useOutletContext } from 'react-router-dom'
import CurrencyChange from '../helpers/CurrencyChange'
import { useEffect } from 'react'
import { AllApiDataHooks } from '../hooks/AllApiData'
import AddCart from './AddCart'
const HorizontalProductCard = ({ loading, category }) => {
  let list = new Array(20).fill()
  const { filterproductcategory,AddCartSign, productcategory } = AllApiDataHooks()
  useEffect(() => {
    filterproductcategory(category)
  }, [])

  let { load } = useOutletContext()
  const HandleAddCart = async ( addcartid) => {
    AddCart(addcartid, AddCartSign).then(()=> load())
  }
  return (
    <div className='container mx-auto'>
      <h1 className='font-bold text-gray-500 text-2xl my-4'>{category}</h1>
      <div className=' rounded-md shadow-md flex px-4 lg:h-[220px] h-[214px] items-center gap-2 lg:gap-4  overflow-scroll bg-slate-100 scroll'>
        {
          loading ? list.map((data, index) => (
            list.map((data, index) => (
              <div key={index} className='flex justify-center items-center animate-pulse gap-2  border border-slate-400   bg-slate-200'>
                <div className='lg:h-48 h-40 w-52'>
                  <div
                    className='w-52 lg:h-48 h-40 rounded bg-slate-400'>
                  </div>
                </div>
                <div className='w-48 items-center justify-center    h-44 lg:h-48  '>
                  <div className='h-6 w-44 bg-slate-400 mt-5 rounded-full'></div>
                  <div className='h-6 w-44 bg-slate-400 mt-3 rounded-full'></div>
                  <div className='h-5 w-28 bg-slate-400 mt-3 rounded-full'></div>
                  <div className='h-5 w-44 bg-slate-400 mt-3 rounded-full'></div>
                  <div className='h-4 w-40 bg-slate-400 mt-3 rounded-full'></div>
                  {/* <div className='h-5 w-16 bg-slate-300 mt-2 rounded-full'></div> */}





                </div>
              </div>
            ))
          )) :
            productcategory.map((data, index) => (
              <div key={index} className='flex shadow-md border items-center rounded-xl justify-center lg:gap-2 bg-slate-100'>
                <Link to={'/ProductDetails/' + data._id} className='lg:h-48 h-40 w-52'>
                  <img className='w-52 lg:h-48 h-40  object-cover rounded-t-lg' src={data.productimage[0]} alt="" />
                </Link>
                <div className='w-52  h-44 lg:h-48 text-center  bg-white  '>
                  <h1 className="font-semibold  line-clamp-1 mx-auto p-2" >{data.productname}</h1>
                  <h1 className="font-medium text-gray-400  line-clamp-1 mx-auto p-2" >{data.category}</h1>



                  <div className="flex gap-3 items-center justify-center p-2  ">
                    {
                      data.price && 
                    <p className="line-clamp-1 text-red-500  font-bold w-auto mx-auto p-1 ">{CurrencyChange(data.price)}</p>

                    }
                    <p className="line-clamp-1 text-slate-500 w-auto mx-auto font-semibold p-1">{CurrencyChange(data.sellingprice)}</p>
                  </div>
                  <button onClick={(e) => HandleAddCart( data._id)} className="h-7  
             bg-red-600 lg:mt-4 hover:bg-red-700 font-bold text-white lg:w-40 w-44  rounded-xl">Add Cart</button>
                </div>
              </div>
            ))
        }

      </div>
    </div>
  )
}

export default HorizontalProductCard
