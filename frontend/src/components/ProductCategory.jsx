import { Link } from "react-router-dom"
import { AllApiDataHooks } from "../hooks/AllApiData"
const ProductCategory = ({ loading }) => {
    const list = new Array(30).fill()
    const { AllProductCategory } = AllApiDataHooks()
    return (
        <div className="bg-slate-100 bg-opacity-40 rounded-r-lg    md:h-28 sm:h-24 container mx-auto ">
            <div className="overflow-scroll   p-4 flex scroll gap-2">
                {loading ? list.map((_, index) => (
                    <div key={index}>
                        <div className="bg-slate-400 h-14    w-14 animate-pulse  md:h-20 sm:h-16 sm:w-16  md:w-20 rounded-full">
                        </div>
                    </div>

                )) :

                    // List Category

                    AllProductCategory.map((item, index) => (
                        <Link to={'/FilterProductCategory?category=' + item.category} key={index}  className="bg-white " >
                            <div className="border-2 shadow-lg bg-slate-100 border-slate-300 h-14 w-14 md:h-16 sm:h-14 sm:w-14  md:w-16 mix-blend-multiply rounded-full bg-opacity-85">
                                <img className="rounded-full h-full transition-all p-0.5 w-full hover:scale-110  object-cover cursor-pointer bg-blend-multiply " src={item.productimage[0]} alt="" />
                            </div>
                            <div>
                                <h1 className="text-center text-sm font-bold">{item.category}</h1>

                            </div>
                        </Link>
                    ))

                }



            </div>

        </div>
    )
}

export default ProductCategory
