import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Search from './components/pages/Search.jsx'
import Caption from './components/pages/Caption.jsx'

const router = createBrowserRouter([
  {path:'/',
  element:<App />,
  children:[
    {
      path:'/',
      element:<Search/>
    },
    {
      path:'/caption',
      element:<Caption/>
    }
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
