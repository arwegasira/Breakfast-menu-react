import { useLoaderData, Link } from 'react-router-dom'
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

const updateOrderStatus = async ({ id, status }) => {
  await customFetch.patch(`/order/${id}`, { status })
  window.location.reload()
}
const SingleOrder = () => {
  const { order } = useLoaderData()
  const orderStatusList = ['Pending', 'Approved', 'Cancelled', 'Completed']
  const {
    orderNumber,
    roomDetails,
    status: orderStatus,
    orderItems,
    _id,
  } = order
  return (
    <>
      <section className='max-w-[60rem] mx-auto mt-12'>
        <Link
          to='/Orders'
          className='btn  primary-button text-sm uppercase cursor-pointer'
        >
          Return to Orders
        </Link>
      </section>

      <section className='mt-4 shadow rounded-lg py-8 px-4 max-w-[60rem] mx-auto border'>
        <div className='pb-4 border-b border-zinc-300 flex flex-col gap-4 sm:flex-row sm:justify-between '>
          <span className='block text-sm px-1 font-normal md:text-base'>
            {orderNumber}
          </span>
          <span className='block text-sm px-1 font-normal md:text-base'>
            {roomDetails[0].name}
          </span>
          <span className='block text-sm px-1 font-normal md:text-base'>
            {roomDetails[0].phoneNumber}
          </span>
          <select
            className='select select-bordered select-sm block md:self-start md:font-medium'
            defaultValue={orderStatus}
            onChange={async (e) => {
              try {
                await updateOrderStatus({ id: _id, status: e.target.value })
              } catch (error) {
                console.log(error)
              }
            }}
          >
            {orderStatusList.map((status, idx) => {
              return <option key={idx}>{status}</option>
            })}
          </select>
        </div>
        <ul className='my-4 px-1 pb-4 border-b border-zinc-300 flex flex-col gap-2'>
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
