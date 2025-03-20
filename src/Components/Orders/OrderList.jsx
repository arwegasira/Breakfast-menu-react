import Loading from '../Util/Loading'
import { forwardRef } from 'react'

const OrderList = forwardRef(
  ({ data, error, isFetchingNextPage, status, inView }, ref) => {
    if (status === 'pending') return <Loading></Loading>
    if (error)
      return (
        <section>
          <h2>{error.message}</h2>
        </section>
      )

    return (
      <section className='mt-16'>
        <div className='overflow-x-auto'>
          <table className='table'>
            {/* head */}
            <thead>
              <tr>
                <th>Order #</th>
                <th>Room</th>
                <th>Status</th>
                <th>Item Count</th>
              </tr>
            </thead>
            {/* <tbody> */}
            {/* row 1 */}
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
                        <td>{status}</td>
                        <td>{orderItems.length}</td>
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
