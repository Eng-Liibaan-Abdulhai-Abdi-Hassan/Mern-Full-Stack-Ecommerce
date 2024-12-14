import { useState } from "react";
import ProductCard from "./ProductCard";
import UploadProduct from "./UploadProduct";
import { AllApiDataHooks } from "../hooks/AllApiData";
const AllProducts = () => {
  const [isupload, setisupload] = useState(false);
  const { AllProduct, AllProductData,allcategories } = AllApiDataHooks();
  return (
    <div className="relative bg-[#fffefe] h-[500px] w-full overflow-y-scroll scroll">
      {/* UplaodPrduct */}
      <div className="shadow-md flex items-end justify-end p-3 ">
        <button
          onClick={() => setisupload((prev) => !prev)}
          className="cursor-pointer bg-blue-500 py-1 px-4 rounded-full hover:bg-red-500 text-white"
        >
          Upload Product
        </button>
      </div>
      {/* UplaodPrduct */}

      {/* ProductList */}
      <div className="flex items-center flex-wrap w-full ">
        {AllProductData.map((data, index) => (
          <ProductCard
            key={index}
            fetch={AllProduct}
            allcategories={allcategories}
            data={data}
          />
        ))}
      </div>

      {/* ProductList */}

      {isupload && (
        <UploadProduct
          fetch={AllProduct}
          allcategories={allcategories}
          close={() => setisupload(false)}
        />
      )}
    </div>
  );
};

export default AllProducts;
