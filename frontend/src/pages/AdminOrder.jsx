import { useNavigate } from "react-router-dom";
import { AllApiDataHooks } from "../hooks/AllApiData";
import { useusercontext } from "../context/Context";
import { useEffect } from "react";
const OrderProduct = () => {
    const { AllPaymentMethod } = AllApiDataHooks();
    const { authlogin } = useusercontext();
    let navigate = useNavigate();
    useEffect(() => {
        if (authlogin === null || authlogin?.role === "user") {
            navigate("/");
        }
    }, []);
    return (
        <div className="relative text-center overflow-y-scroll srcoll h-[550px] overflow-x-auto shadow-md sm:rounded-lg w-full  p-5 ">
            <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-center  text-gray-00 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            SubTotalAmount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ShippingAmount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            TotalAmount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>


                    </tr>
                </thead>
                <tbody className="text-center ">
                    {AllPaymentMethod.map((data, index) => (
                        data.productDetails.map((pro, i) => (
                            <tr
                                key={index + i}
                                className="bg-white border-b text-black   hover:bg-gray-50 dark:hover:bg-slate-100"
                            >
                                <td className="px-6 py-4 ">{i + 1}</td>
                                <td >
                                    <div className=" w-12 h-12 mx-auto   ">
                                        {
                                            <img className="rounded-full h-full w-full" src={pro.image[0]} alt="" />

                                        }

                                    </div>
                                </td>
                                <td className="px-6 py-4">{data.email}</td>
                                <td className="px-6 py-4">{pro.name}</td>
                                <td className="px-6 py-4">{pro.price}</td>
                                <td className="px-6 py-4">{pro.quantity}</td>
                                <td className="px-6 py-4">{data.SubTotalAmount}</td>
                                {data.shipping_options.map((item, index) => (
                                    <td key={index} className="px-6 py-4">{item.shipping_amount}</td>
                                ))}
                                <td className="px-6 py-4">{data.TotalAmount}</td>
                                <td className="px-6 py-4">{data.paymentDetails.payment_status}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default OrderProduct;