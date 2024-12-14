import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import router from '../routes/AllPath'
import { UserProvider } from './context/Context'
createRoot(document.getElementById('root')).render(
  <UserProvider>
    <RouterProvider router={router} />
    <Toaster />
  </UserProvider>,
)
