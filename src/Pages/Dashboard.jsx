import { RechartBar } from '../Components'
import { customFetch } from '../Utils'
import { redirect, useLoaderData } from 'react-router-dom'
const dashboardQuery = () => {
  return {
    queryKey: ['dashboard'],
    queryFn: async () => await customFetch.get('/order/topOrderedItems'),
  }
}
export const loader = (queryClient) => async () => {
  try {
    const response = await queryClient.ensureQueryData(dashboardQuery())
    return {
      items: response.data.items,
    }
  } catch (error) {
    if (error.response.status === 401) return redirect('/login')
  }
  return null
}
const Dashboard = () => {
  return (
    <section className=''>
      <h1 className='mt-4 text-xl font-medium md:text-2xl mb-8'>
        Most Ordered Items
      </h1>
      {/* <div className='w-full md:w-[50%]'> */}
      <RechartBar></RechartBar>
      {/* </div> */}
    </section>
  )
}
export default Dashboard
