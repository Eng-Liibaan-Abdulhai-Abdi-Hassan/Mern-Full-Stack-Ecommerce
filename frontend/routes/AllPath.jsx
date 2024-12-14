import { createBrowserRouter } from 'react-router-dom'
import App from '../src/App'
import Home from '../src/pages/Home'
import ProductDetails from '../src/components/ProductDetails'
import SearchProduct from '../src/components/SearchProduct'
import FilterProductCategory from '../src/components/FilterCategory'
import Cart from '../src/components/Cart'
import AdminDashboard from '../src/pages/AdminDashboard'
import AllProducts from '../src/pages/AllProducts'
import SignUp from '../src/pages/SignUp'
import Login from '../src/pages/Login'
import ForgetPass from '../src/pages/ForgetPass'
import AllCategories from '../src/pages/AllCategories'
import OrderProduct from '../src/pages/AdminOrder'
import Order from '../src/components/OderPayment'
import EditProfile from '../src/components/EditProfile'

const router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'cart',
                element: <Cart />,
            },
            {
                path: 'ProductDetails/:id',
                element: <ProductDetails />,
            },
            {
                path: 'FilterProductCategory',
                element: <FilterProductCategory />,
            },
            {
                path: 'SearchProduct',
                element: <SearchProduct />,
            },
            {
                path: 'signup',
                element: <SignUp />,
            },
            {
                path: 'EditProfile',
                element: <EditProfile />,
            },
            {
                path: 'Order',
                element: <Order />,
            },
            {
                path: 'forgerpassword',
                element: <ForgetPass />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'AdminDashboard',
                element: <AdminDashboard />,
                children: [
                    {
                        path: 'AllProducts',
                        element: <AllProducts />,

                    },
                    {
                        path: 'AllCategory',
                        element: <AllCategories />,

                    },
                    {
                        path: 'AllOrderPayments',
                        element: <OrderProduct />,

                    },
                ]
            }
        ]
    }
])
export default router