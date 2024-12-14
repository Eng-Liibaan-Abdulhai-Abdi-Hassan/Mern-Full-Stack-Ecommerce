import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AllApiDataHooks } from '../hooks/AllApiData'
import SearchProductCard from './SearchProductCard'
const SearchProduct = () => {
  const list = new Array(30).fill()
  let location = useLocation().search.split('?')[1]
  const { SearchProduct,AddCartSign, SearchData, loading } = AllApiDataHooks()
  useEffect(() => {
    SearchProduct(location)
  }, [location])
  console.log('serach',search.get('search'))
  return (
    <div className="container mx-auto  ">

      <div className="bg-slate-100 shadow-md">
        <div className="grid lg:grid-cols-4 gap-2 p-1 md:grid-cols-2  sm:grid-cols-2 overflow-scroll h-[500px] scroll w-full mx-auto ">

          {/* VerticalDetails */}


          {
            loading ? list.map((data, index) => (
              <div key={index} className="bg-white w-full h-80 ">
                  <div className="h-40 w-full p-1 animate-pulse">
                    <div className=" h-40 bg-slate-400 w-full "></div>
                  </div>
                  <div className="h-40 w-full text-center   px-1  animate-pulse">

                    <div className="bg-slate-400 h-6 rounded-full mt-2">

                    </div>
                    <div className="bg-slate-400 h-5 rounded-full mt-2">

                    </div>
                    <div className="bg-slate-400 h-5 w-52 rounded-full mt-2">

                    </div>
                    <div className="bg-slate-400 h-6 rounded-full w-40 mt-2">

                    </div>
                    <div className="bg-slate-400 h-6 rounded-full w-52 mt-2">

                    </div>

                  </div>
                </div>
            )) :
              SearchData.map((data, index) => (
                <SearchProductCard  AddCartSign={AddCartSign} {...data} key={index} />
              ))
          }





        </div>
      </div>
    </div>
  )
}

export default SearchProduct
