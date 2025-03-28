import { useLoaderData } from 'react-router-dom'
import { customFetch } from '../Utils'

const singleOderQuery = (id) => {
  return {
    queryKey: ['singleOrder', id],
    queryFn: async () => customFetch.get(`/order/${id}`),
  }
}
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params
    try {
      const response = await queryClient.ensureQueryData(singleOderQuery(id))
      return {
        order: response.data.order,
      }
    } catch (error) {
      // un-authenticated
      if (error.response.status === 401) return redirect('/login')
    }
  }
const SingleOrder = () => {
  const { order } = useLoaderData()
  const orderStatusList = ['Pending', 'Approved', 'Cancelled', 'Completed']
  const { orderNumber, roomDetails, status: orderStatus, orderItems } = order
  console.log(order)
  return (
    <>
      <section className='mt-12 shadow rounded-lg py-8 px-4 max-w-[60rem] mx-auto'>
        <div className='pb-4 border-b flex flex-col gap-4 sm:flex-row sm:justify-between '>
          <span className='block text-sm px-1 font-medium md:text-base'>
            {orderNumber}
          </span>
          <span className='block text-sm px-1 font-medium md:text-base'>
            {roomDetails[0].name}
          </span>
          <span className='block text-sm px-1 font-medium md:text-base'>
            {roomDetails[0].phoneNumber}
          </span>
          <select
            className='select select-bordered select-sm block md:self-start md:font-medium'
            defaultValue={orderStatus}
          >
            {orderStatusList.map((status, idx) => {
              return <option key={idx}>{status}</option>
            })}
          </select>
        </div>
        <ul className='my-4 px-1 pb-4 border-b flex flex-col gap-2'>
          {orderItems.map((item, idx) => {
            return (
              <li key={idx} className='text-sm md:text-base'>
                {item}
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
export default SingleOrder
