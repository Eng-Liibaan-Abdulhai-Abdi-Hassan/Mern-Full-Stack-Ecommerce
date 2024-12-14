import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import FilterCategoryCard from "./FilterCategoryCard"
import { AllApiDataHooks } from "../hooks/AllApiData"

const FilterProductCategory = () => {
  const list = new Array(50).fill()

  let location = useLocation();
  let SearchInput = new URLSearchParams(location.search)

  let data = []
  SearchInput.forEach((item) => {
    return data[item] = true
  });

  const [sortby, setsortby] = useState('')
  const [selected, setselected] = useState(data)
  const [filterproduct, setfilterproduct] = useState([])
  const { setproductcategory, AddCartSign, loading, productcategory, AllProductCategory, filterproductcategory } = AllApiDataHooks()
  const HandleCheckBox = (e) => {
    let { value, checked } = e.target;
    setselected({
      ...selected,
      [value]: checked
    })
  }


  const HandlRadio = (e) => {
    let { value } = e.target;
    setsortby(value)
    if (value === "asc") {
      setproductcategory((prev) => prev.sort((a, b) => a.sellingprice - b.sellingprice))
    } else {
      setproductcategory((prev) => prev.sort((a, b) => b.sellingprice - a.sellingprice))

    }
  }

  let navigate = useNavigate()
  useEffect(() => {
    let ObjectintoArray = Object.keys(selected).map((data) => {
      if (selected[data]) {
        return data
      }
    }).filter(data => data)
    setfilterproduct(ObjectintoArray)
    let PutONSearch = ObjectintoArray.map((data, index) => {
      if (ObjectintoArray.length - 1 === index) {
        return `category=${data}`
      }
      return `category=${data}&&`
    })



    navigate('/FilterProductCategory?' + PutONSearch.join(""))


  }, [selected])

  useEffect(() => { filterproductcategory(filterproduct) }, [filterproduct])


  return (
    <div className="container mx-auto  ">

      <div className="flex w-full gap-2 bg-white shadow-md">
        {
          loading ?
            <div className="lg:w-60 w-52  lg:px-4">

              <div className="mt-2 items-center justify-center mb-2 flex gap-2 w-full">
                <div className="w-4 h-4 rounded-full animate-bounce bg-red-400">
                </div>
                <div className=" animate-pulse leading-normal text-center  rounded-full bg-re3d-400">
                  Loading
                </div>
              </div>

              <div className=" h-[500px] overflow-scroll scroll">

                {
                  loading ?
                    list.map((_, index) => (
                      <div key={index} className="flex gap-2 animate-pulse cursor-pointer">
                        <div className="mt-2  bg-slate-400 rounded-full h-4  flex gap-2 w-4 ">
                        </div>
                        <div className="mt-2 bg-slate-400 rounded-full h-4  flex gap-2 w-40 ">
                        </div>
                      </div>
                    ))
                    :
                    AllProductCategory.map((data, index) => (
                      <div key={index} className="mt-2 flex gap-2 w-full ">
                        <input checked={selected[data?.category]} value={data.category} type="checkbox" className="w-4" onChange={HandleCheckBox} />
                        <label >{data.category}</label>
                      </div>
                    ))
                }
              </div>


            </div>


            :

            <div className="lg:w-60 w-52  lg:px-4">
              <div className="flex gap-2 w-full">
                <input checked={sortby === 'asc'} value={"asc"} className="w-4" name="sortby" type="radio" onChange={HandlRadio} />
                <h1>Price Low to Hight</h1>
              </div>
              <div className="mt-2 flex gap-2 w-full">
                <input
                  checked={sortby === 'desc'} value={"desc"} type="radio" className="w-4" name="sortby" onChange={HandlRadio} />
                <h1>Price Hight to Low</h1>
              </div>

              <div className=" h-[500px] overflow-scroll scroll">

                {
                  loading ?
                    list.map((_, index) => (
                      <div className="flex gap-2 animate-pulse cursor-pointer">
                        <div className="mt-2 bg-slate-400 rounded-full h-4  flex gap-2 w-4 ">
                        </div>
                        <div className="mt-2 bg-slate-400 rounded-full h-4  flex gap-2 w-40 ">
                        </div>
                      </div>
                    ))
                    :
                    AllProductCategory.map((data, index) => (
                      <div key={index} className="mt-2 flex gap-2 w-full ">
                        <input checked={selected[data?.category]} value={data.category} type="checkbox" className="w-4" onChange={HandleCheckBox} />
                        <label >{data.category}</label>
                      </div>
                    ))
                }
              </div>


            </div>
        }

        <div className="bg-slate-200 shadow-md w-full h-full">
          <div className="grid lg:grid-cols-3 gap-1 p-1 md:grid-cols-2 overflow-scroll h-[600px] scroll w-full mx-auto ">


            {
              loading ? list.map((_, index) => (
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


                productcategory.map((data, index) => (
                  <FilterCategoryCard {...data} AddCartSign={AddCartSign} key={index} />
                ))

            }




          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterProductCategory
