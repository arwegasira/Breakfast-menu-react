import { redirect } from 'react-router-dom'
import Loading from '../Util/Loading'
import { forwardRef } from 'react'

const statusColors = {
  Pending: 'bg-amber-200 text-amber-800',
  Approved: 'bg-emerald-200 text-emerald-800 ',
  Cancelled: 'bg-red-200 text-red-800',
  Completed: 'bg-sky-200 text-sky-800',
}
const OrderList = forwardRef(
  ({ data, error, isFetchingNextPage, status, inView }, ref) => {
    if (status === 'pending') return <Loading></Loading>
    if (error) {
      if (error.status === 401) return (window.location.href = '/login')
      return (
        <section className='flex justify-center items-center h-[30rem]'>
          <h2 className='font-bold text-xl md:text-2xl leading-5'>
            {error.message}
          </h2>
        </section>
      )
    }

    return (
      <section className='mt-16'>
        <div className='overflow-x-auto'>
          <table className='table table-xs md:table-sm lg:table-lg'>
            <thead>
              <tr className='text-sm md:text-sm lg:text-lg'>
                <th>Order #</th>
                <th>Room</th>
                <th></th>
                <th className='text-center'>Item Count</th>
              </tr>
            </thead>
            {data?.pages?.map((page) => {
              const { currentPage, orders } = page
              return (
                <tbody key={currentPage}>
                  {orders.map((order) => {
                    const {
                      _id,
                      orderNumber,
                      status,
                      roomDetails,
                      orderItems,
                    } = order
                    return (
                      <tr key={_id}>
                        <td>{orderNumber}</td>
                        <td>{roomDetails[0].name}</td>
                        <td className='flex justify-center'>
                          <div
                            className={`${statusColors[status]} p-1 rounded-md`}
                          >
                            {status}
                          </div>
                        </td>
                        <td className='text-center'>{orderItems.length}</td>
                      </tr>
                    )
                  })}
                </tbody>
              )
            })}
          </table>
          <div ref={ref}>{isFetchingNextPage && 'loading..'}</div>
        </div>
      </section>
    )
  }
)
export default OrderList
