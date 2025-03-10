import { useLoaderData, redirect } from 'react-router-dom'
import { customFetch } from '../Utils'
import { BreakfastItemList, Search } from '../Components'
import SearchForm from '../Components/BreakfastItems/SearchForm'

const getBreakfastItems = (params) => {
  const { search } = params
  return {
    queryKey: ['breakfastItems', search ? search : ''],
    queryFn: async () =>
      customFetch.get(`/breakfastItems?search=${search ? search : ''}`),
  }
}
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url)
    const params = Object.fromEntries(url.searchParams)

    try {
      const response = await queryClient.ensureQueryData(
        getBreakfastItems(params)
      )
      return {
        breakfastItems: response.data.items,
        params: params,
      }
    } catch (error) {
      if (error.response.status === 401) return redirect('/login')
    }
  }
const BreakfastItems = () => {
  return (
    <>
      <Search>
        <SearchForm></SearchForm>
      </Search>
      <BreakfastItemList></BreakfastItemList>
    </>
  )
}
export default BreakfastItems
