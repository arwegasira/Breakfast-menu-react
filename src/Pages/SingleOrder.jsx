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
  console.log(order)
  return <div>SingleOrder</div>
}
export default SingleOrder
