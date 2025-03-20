import { customFetch } from '../Utils'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLoaderData } from 'react-router-dom'
import { OrderList, Search } from '../Components'
import { OrderSearchForm } from '../Components'

export const loader = async ({ request }) => {
  let url = new URL(request.url)
  const params = Object.fromEntries(url.searchParams)

  return { params }
}
const fetchOrders = async ({ pageParam, queryKey }) => {
  const [, orderStatus, orderNumber, room] = queryKey
  const { data } = await customFetch.get(
    `/order?page=${pageParam}&status=${
      orderStatus && orderStatus !== undefined ? orderStatus : ''
    }&room=${room && room !== undefined ? room : ''}&orderNumber=${
      orderNumber && orderNumber !== undefined ? orderNumber : ''
    }`
  )
  return data
}
const Order = () => {
  const {
    params: { orderStatus, room, orderNumber },
  } = useLoaderData()

  const {
    data,
    error,
    isFetchNextPageError,
    isFetchingNextPage,
    status,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['orders', orderStatus, orderNumber, room],
    queryFn: fetchOrders,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.pageCount
        ? lastPage.currentPage + 1
        : undefined,
  })
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [fetchNextPage, inView])

  return (
    <>
      <Search sectionPadding='pt-6 pb-8 px-8' maxWidth='max-w-[65rem]'>
        <OrderSearchForm></OrderSearchForm>
      </Search>
      <OrderList
        data={data}
        error={error}
        isFetchingNextPage={isFetchingNextPage}
        status={status}
        ref={ref}
        inView={inView}
      ></OrderList>
    </>
  )
}
export default Order
