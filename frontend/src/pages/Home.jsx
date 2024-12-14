import HorizontalProductCard from "../components/HorizontalCard"
import ProductCategory from "../components/ProductCategory"
import VerticalProductCard from "../components/VerticalCard"
import { AllApiDataHooks } from "../hooks/AllApiData"
const Home = () => {
    const { AllProductCategory, loading } = AllApiDataHooks()
    const list = new Array(30).fill('')
    return (
        <div>
            <ProductCategory loading={loading} />
            {
                loading &&
                <>
                    {list.map((data, index) => (

                        <HorizontalProductCard key={index} loading={loading} />
                    ))}

                    {list.map((data, index) => (
                        <VerticalProductCard key={index} loading={loading} />
                    ))}
                </>
            }


            {AllProductCategory.map((data, index) => (

                <HorizontalProductCard key={index} category={data.category} />
            ))}
            {AllProductCategory.map((data, index) => (
                <VerticalProductCard key={index} category={data.category} />
            ))}

        </div>
    )
}

export default Home
