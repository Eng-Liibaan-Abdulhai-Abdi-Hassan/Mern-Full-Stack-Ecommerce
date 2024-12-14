export const endpoint = 'http://localhost:3000/api'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useusercontext } from '../context/Context'
import { useNavigate } from 'react-router-dom'
let publish_key = "pk_test_51Q8hzh01QyvmabRgH6XthAdUjvhBWCVDN5Sv6utq2CqAW1jiHd1y78INP1DDrNH80ZuM63fzaBTCDvZgRhOs5GEm00ZzG5KQng"
const AllApiDataHooks = () => {
    const { setauthlogin, authlogin } = useusercontext()
    const [loading, setloading] = useState(false)
    const [SearchData, setSearchData] = useState([])
    const [AllAddCart, setAllAddCart] = useState([])
    const [AllPaymentMethod, setAllPaymentMethod] = useState([])
    const [SinglePaymentMethod, setSinglePaymentMethod] = useState([])
    const [total, settotal] = useState(0)
    let navigate = useNavigate()
    const [AllProductData, setAllProductData] = useState([])
    const [productcategory, setproductcategory] = useState([])
    const [allcategories, setallcategories] = useState([])
    const [AllProductCategory, setAllProductCategory] = useState([])
    const [singleproduct, setsingleproduct] = useState({
        productname: '',
        productbrand: '',
        productimage: [],
        category: '',
        price: '',
        sellingprice: '',
        description: '',
    })
    const SearchProduct = async (search) => {
        setloading(true)
        let { data } = await axios.get(endpoint + '/product/searchproduct?' + search)
        setloading(false)
        setSearchData(data)
    }
    const PaymentMethod = async (item) => {
        setloading(true)
        let { data } = await axios.post(endpoint + '/payment/signuppayment', { item })
        window.location.href = data
        setloading(false)
    }
    const AllProduct = async () => {
        setloading(true)
        let { data } = await axios.get(endpoint + '/product/getallproduct')
        setloading(false)
        setAllProductData(data)
    }
    const FetchAddCart = async () => {
        setloading(true)
        let { data } = await axios.get(endpoint + '/addcart/getalladdcart', {
            withCredentials: true
        })
        setloading(false)
        setAllAddCart(data)


        return data
    }
    const fetchAllCategories = async () => {
        setloading(true)
        let { data } = await axios.get(endpoint + '/category/getallcategory')
        setloading(false)
        setallcategories(data)


        return data
    }
    const GetAllpaymentmethod = async () => {
        setloading(true)
        let { data } = await axios.get(endpoint + '/payment/GetAllpaymentmethod')
        setloading(false)
        setAllPaymentMethod(data)
        return data
    }
    const GetSinglepaymentmethod = async () => {
        setloading(true)
        let { data } = await axios.get(endpoint + '/payment/Getpaymentmethod/' + authlogin?._id)
        setloading(false)
        setSinglePaymentMethod(data)
        return data
    }
    const UpdatAddCart = async (addcartid, quantity) => {
        setloading(true)
        let { data } = await axios.put(endpoint + '/addcart/updateaddcart', { addcartid, quantity })
        setloading(false)


        return data
    }
    const DeleteAddCart = async (addcartid) => {
        setloading(true)
        let { data } = await axios.delete(endpoint + '/addcart/deleteaddcart/' + addcartid)
        setloading(false)

        return data
    }
    const DeleteCategory = async (categoryid) => {
        setloading(true)
        let { data } = await axios.delete(endpoint + '/category/deletecategory/' + categoryid)
        setloading(false)

        return data
    }
    const AuthLogin = async (login) => {
        setloading(true)
        let { data } = await axios.post(endpoint + '/auth/login', login)
        setloading(false)
        navigate('/')
        setauthlogin(data);
        localStorage.setItem('authlogin', JSON.stringify(data))
        return data
    }
    const AuthLogout = async () => {
        setloading(true)
        let { data } = await axios.post(endpoint + '/auth/logout')
        setloading(false)

        setauthlogin(null);
        localStorage.clear()
        return data
    }
    const updateProduct = async (updatedata) => {
        setloading(true)
        let { data } = await axios.put(endpoint + '/product/updateproduct', updatedata)
        setloading(false)


        return data
    }
    const updateCategory = async (updatedata) => {
        setloading(true)
        let { data } = await axios.put(endpoint + '/category/updatecategory', updatedata)
        setloading(false)


        return data
    }
    const deleteProduct = async (productid) => {
        setloading(true)
        let { data } = await axios.delete(endpoint + '/product/deleteproduct/' + productid)
        setloading(false)

        return data
    }
    const GetAllProductCategory = async () => {
        setloading(true)
        let { data } = await axios.get(endpoint + '/product/getproductcategory')
        setloading(false)
        setAllProductCategory(data)
    }
    const GetProductCount = async () => {
        setloading(true)
        if (authlogin) {
            let { data } = await axios.get(endpoint + '/product/productcount/' + authlogin?._id)
            settotal(data.count)
            setloading(false)
            return data.count
        }
    }
    const ProductDetails = async (productid, setActiveImage) => {
        setloading(true)
        let { data } = await axios.get(endpoint + '/product/getsingleproduct/' + productid)
        setActiveImage(data?.productimage[0])
        setloading(false)
        setsingleproduct(data)
    }
    const filterproductcategory = async (category) => {
        if (!category) return
        setloading(true)
        let search = `/product/filterproductcategory?category=${category}`;
        let get = `/product/filterproductcategory/`
        let { data } = await axios.post(endpoint + '/' + search || endpoint + '/' + get, { category })
        setloading(false)
        setproductcategory(data)
    }

    const AddCartSign = async (productid) => {
        let { data } = await axios.post(endpoint + '/addcart/addcartsignup', { productid, userid: authlogin._id })
        return data
    }
    const CategorySign = async (uploaddata) => {
        let { data } = await axios.post(endpoint + '/category/categorysignup', uploaddata)
        return data
    }
    const uploadProduct = async (uploaddata, close) => {
        let { data } = await axios.post(endpoint + '/product/productsignup', uploaddata)
        close()
        return data
    }

    const uploadUser = async (uploaddata) => {
        let { data } = await axios.post(endpoint + '/auth/signup', uploaddata)
        return data
    }
    const UpdateUser = async (uploaddata) => {
        let { data } = await axios.put(endpoint + '/auth/updateuser', uploaddata)
        setauthlogin(data);
        localStorage.setItem('authlogin', JSON.stringify(data))
        navigate('/')
        return data
    }

    useEffect(() => {
        filterproductcategory()
        AllProduct()
        GetAllProductCategory()
        GetSinglepaymentmethod()
        GetAllpaymentmethod()
        FetchAddCart()
        GetProductCount()
        fetchAllCategories()
    }, [])

    return { UpdateUser, GetAllpaymentmethod, GetSinglepaymentmethod, AllPaymentMethod, SinglePaymentMethod, PaymentMethod, AuthLogin, AuthLogout, updateCategory, DeleteCategory, uploadUser, CategorySign, fetchAllCategories, allcategories, uploadProduct, deleteProduct, updateProduct, settotal, UpdatAddCart, AllAddCart, DeleteAddCart, FetchAddCart, total, AddCartSign, GetProductCount, setproductcategory, AllAddCart, AllProduct, singleproduct, ProductDetails, AllProductCategory, AllProductData, productcategory, SearchProduct, filterproductcategory, SearchData, loading }
}
export {
    AllApiDataHooks

}