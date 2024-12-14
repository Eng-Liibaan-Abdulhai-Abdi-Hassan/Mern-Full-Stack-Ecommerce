import React, { useEffect } from "react";
import moment from "moment";
import { AllApiDataHooks } from "../hooks/AllApiData";
import CurrencyChange from "../helpers/CurrencyChange";
import { useusercontext } from "../context/Context";
import { useNavigate } from "react-router-dom";
const Order = () => {
    const list = new Array(30).fill('')
    const { SinglePaymentMethod, loading } = AllApiDataHooks();

    const { authlogin } = useusercontext();
    let navigate = useNavigate();
    useEffect(() => {
        if (authlogin === null || authlogin?.role === "admin") {
            navigate("/");
        }
    }, []);
    return (
        <div className="container mx-auto py-5 sm:px-4 bg-white">
            {SinglePaymentMethod.length === 0 && (
                <div className="flex justify-center items-center h-80">
                    <h1 className="text-2xl font-bold text-gray-800">No Order Found</h1>
                </div>
            )}
            <div className="bg-blue-500 ">
                <div className="flex  gap-1 overflow-scrodll min-h-[500px] scroll">
                    {
                        SinglePaymentMethod.map((data, index) => (
                            <div key={index} className="bg-white h-auto shadow-md border border-slate-200">
                                {
                                    data?.productDetails.map((item, index) => (
                                        <div key={index} className="px-4">
                                            <div className="w-full h-44 m-1">
                                                <img className="w-full h-44" src={item.image[0]} alt="" />
                                            </div>
                                            <div>
                                                <h1 className="font-bold text-2xl">{item.name}</h1>
                                                <h1 className="font-bold text-gray-400 text-lg">Category</h1>
                                                <div className="flex  font-bold text-gray-600 text-lg">Quantity = <p className="text-slate-900">{item.quantity}</p></div>
                                                <div className="flex gap-4 mt-4">
                                                    <div className="text-white text-right pr-4 bg-red-500 w-full text-xl h-8  font-bold rounded">Price : {CurrencyChange(item.price)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                <h1 className="text-lg mt-6 font-bold  bg-slate-400 text-white border-b-3  text-center">Payment Method</h1>
                                <div className="mt-4 px-4">
                                    <div className="flex gap-4  ">Payment Type = <p className="font-bold">{data.paymentDetails.payment_method_type}</p></div>
                                    <div className="flex gap-4">Payment Status = <p className="font-bold">{data.paymentDetails.payment_status}</p></div>
                                    <div className="flex gap-4">Sub_Total_Amount =
                                        <p className="font-bold">{CurrencyChange(data.SubTotalAmount)}</p>
                                    </div>
                                    <div className="flex gap-4">Shipping_Amount = <div className="font-bold">
                                        {
                                            data.shipping_options.map((item, index) => (
                                                <div key={index} className="font-bold">{CurrencyChange(item.shipping_amount)}</div>
                                            ))
                                        }
                                    </div></div>
                                    <div className="flex gap-2">Transaction Date = {moment(data.createdAt).format("lll")}</div>
                                    <div className="flex gap-4 mb-10">Total_Amount = <p className="font-bold bg-red-500 lg:w-40 w-28 text-lg text-white text-center rounded ">{CurrencyChange(data.TotalAmount)}</p></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    );
};

export default Order;