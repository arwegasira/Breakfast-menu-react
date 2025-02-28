import { customFetch } from '../Utils'

const getOrderQuery = (params) => {
  return {
    queryKey: ['orders'],
    queryFn: async () => await customFetch.get('/orders'),
  }
}
export const loader =
  (queryClient) =>
  async ({ request }) => {
    let url = new URL(request.url)
    const params = Object.fromEntries(url.searchParams)

    return null
  }
const Order = () => {
  return <h1>Order</h1>
}
export default Order
