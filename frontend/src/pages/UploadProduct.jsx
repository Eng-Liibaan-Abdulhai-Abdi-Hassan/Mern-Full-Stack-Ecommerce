import React, { useState } from "react";
import CloudinaryUploadImage from "../helpers/CloudinaryUploadImage";
import { CgClose } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AllApiDataHooks } from "../hooks/AllApiData";
const UploadProduct = ({ fetch, allcategories, close }) => {
  const [viewimage, setviewimage] = useState(false);
  const [imagedata, setimagedata] = useState("");
  const [uploaddata, setuploaddata] = useState({
    productname: "",
    productbrand: "",
    category: "",
    productimage: [],
    price: "",
   sellingprice: "",
    description: "",
  });

  const HandleImage = (e) => {
    let images = e.target.files;
    Array.from(images).map(async (data) => {
      let ArrayImages = await CloudinaryUploadImage(data);
      setuploaddata((prev) => {
        return {
          ...prev,
          productimage: [...prev.productimage, ArrayImages.url],
        };
      });
    });
  };

  const { uploadProduct } = AllApiDataHooks();

  const HandeChange = (e) => {
    let { name, value } = e.target;
    setuploaddata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const HandleUploadSubmit = async (e) => {
    e.preventDefault();
    uploadProduct(uploaddata, close).then(() => {
      fetch();
    });
  };

  const HandleDelete = (index) => {
    let imageremove = [...uploaddata.productimage];
    imageremove.splice(index, 1);
    setuploaddata((prev) => {
      return {
        ...prev,
        productimage: [...imageremove],
      };
    });
  };
  return (
    <div className=" flex justify-center items-center z-40">
      <div className="absolute  h-[450px] top-[13%]  md:w-[50%] md:left-[15%] sm:w-[94%] shadow-md overflow-y-scroll scroll bg-white ">
        {/* Title */}
        <div className="relative shadow-md p-4 bg-blue-600  ">
          <h1 className="text-center text-3xl animate-pulse font-semibold   transition-all delay-300">
            Upload Products
          </h1>
          <button
            className="absolute text-white right-5 top-5 cursor-pointer"
            onClick={close}
          >
            <CgClose />
          </button>
        </div>
        {/* Title */}

        {/* input */}

        <form onSubmit={HandleUploadSubmit} className="border border-slate-200">
          <div>
            <div className="flex flex-col my-2 ">
              <label htmlFor="" className="font-semibold px-4">
                Product Name:
              </label>
              <input
                onChange={HandeChange}
                name="productname"
                value={uploaddata?.productname}
                placeholder="Enter Product Name "
                className="h-8   mx-auto  bg-blue-100 rounded      w-[95%]  my-1 outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="text"
              />
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="" className="font-semibold px-4">
                Product Brand:
              </label>
              <input
                value={uploaddata.productbrand}
                name="productbrand"
                onChange={HandeChange}
                placeholder="Enter Product Brand "
                className="h-8  mx-auto  bg-blue-100      w-[95%]  rounded my-1              outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="text"
              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="" className="font-semibold px-4">
                Product category:
              </label>
              <select
                name="category"
                className="h-8  mx-auto  bg-blue-100      w-[95%]  rounded my-1              outline-none border border-slate-200 hover:ring-1 hover:ring-green-500"
                value={uploaddata.category}
                onChange={HandeChange}
              >
                <option value="">Select Category</option>
                {allcategories.map((data, index) => (
                  <option key={index} value={data.Category}>
                    {data.Category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="" className="font-semibold px-4">
                Product price:
              </label>
              <input
                value={uploaddata.price}
                name="price"
                onChange={HandeChange}
                placeholder="Enter Product price "
                className="h-8  mx-auto  bg-blue-100      w-[95%]  rounded my-1              outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="number"
              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="" className="font-semibold px-4">
                Productsellingprice:
              </label>
              <input
                name="sellingprice"
                value={uploaddata.sellingprice}
                onChange={HandeChange}
                placeholder="Enter Productsellingprice "
                className="h-8  mx-auto  bg-blue-100      w-[95%]  rounded my-1              outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="number"
              />
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="" className="font-semibold px-4">
                Product Image:
              </label>
              <div className="h-24  mx-auto  bg-blue-100    w-[95%]  rounded my-1              outline-none border border-slate-200  ">
                <div className="flex my-3 justify-center items-center flex-col">
                  <label htmlFor="Upload">
                    <FaCloudUploadAlt className="w-8 h-8" />
                  </label>
                  <label htmlFor="Upload" className="text-lg font-bold">
                    {" "}
                    Upload Image
                  </label>
                  <input
                    onChange={HandleImage}
                    hidden
                    type="file"
                    id="Upload"
                    multiple
                  />
                </div>
                <div>
                  {uploaddata.productimage[0] ? (
                    <div className="flex bg-slate-100 my-4  gap-2 overflow-scroll scroll">
                      {uploaddata.productimage.map((imageurl, index) => (
                        <div className="  shadow-md h-28 w-28">
                          <div className="relative group w-28 h-28  ">
                            <form>
                              <div
                                onClick={() => HandleDelete(index)}
                                className="bg-red-500 hover:bg-red-600 hidden text-white group-hover:block absolute bottom-3 right-3"
                              >
                                <MdDelete />
                              </div>
                            </form>
                            <img
                              key={index}
                              onClick={() => {
                                setimagedata(imageurl);

                                setviewimage(true);
                              }}
                              className="p-1 rounded w-full h-full"
                              src={imageurl}
                              alt=""
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm my-10 m-2 text-white">
                      {" "}
                      Please Insert Image
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col ${uploaddata.productimage[0] && "mt-[19%]"
                }`}
            >
              <label htmlFor="" className="font-semibold px-4">
                Product description:
              </label>
              <input
                name="description"
                value={uploaddata.description}
                onChange={HandeChange}
                placeholder="Enter Product description "
                className="h-8  mx-auto  bg-blue-100      w-[95%]  rounded my-1              outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="text"
              />
            </div>

            <div className="w-[50%] mx-auto my-3">
              <button className="text-white py-1 rounded-full px-4 w-full bg-blue-500  mb-5">
                Upload Product
              </button>
            </div>
          </div>
        </form>

        {/* input */}
       
      </div>
    </div>
  );
};

export default UploadProduct;
