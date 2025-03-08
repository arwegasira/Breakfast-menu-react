import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy, Suspense } from 'react'
import { ErrorElement } from './Components'

import {
  BreakfastItems,
  Landing,
  Layout,
  Home,
  Error,
  Login,
  YourOrder,
  Orders,
} from './Pages'

const queryClient = new QueryClient()
//loaders
import { loader as roomLoader } from './Pages/Rooms'
import { loader as breakfastItemsLoader } from './Pages/BreakfastItems'
import { loader as HomeLoader } from './Pages/Home'
import { loader as yourOrderLoader } from './Pages/YourOrder'
import { loader as orderLoader } from './Pages/Order'
import { loader as loginLoader } from './Pages/Login'
import { loader as landingLoader } from './Pages/Landing'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout></Layout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Landing></Landing>,
        loader: landingLoader,
      },

      {
        path: 'breakfastItems',
        element: <BreakfastItems></BreakfastItems>,
        loader: breakfastItemsLoader(queryClient),
        errorElement: <ErrorElement></ErrorElement>,
      },
      {
        path: 'rooms',
        async lazy() {
          let { Rooms } = await import('./Pages')
          return { Component: Rooms }
        },
        loader: roomLoader(queryClient),
        errorElement: <ErrorElement></ErrorElement>,
      },
      {
        path: 'Orders',
        element: <Orders></Orders>,
        errorElement: <ErrorElement></ErrorElement>,
        loader: orderLoader(queryClient),
      },
    ],
  },
  { path: 'home', element: <Home></Home>, loader: HomeLoader(queryClient) },
  {
    path: 'your-order',
    element: <YourOrder></YourOrder>,
    errorElement: <ErrorElement></ErrorElement>,
    loader: yourOrderLoader(queryClient),
  },
  {
    path: 'login',
    element: <Login></Login>,
    errorElement: <ErrorElement></ErrorElement>,
    loader: loginLoader,
  },
])
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  )
}
export default App
