import { useLoaderData } from 'react-router-dom'
import { customFetch } from '../Utils'
import { AddNewRoom, Modal, Pagination, Search } from '../Components'
import SearchForm from '../Components/Room/SearchForm'
import { RoomList } from '../Components'

const getRoomsQuery = (params) => {
  const { page, search } = params

  return {
    queryKey: ['getRooms', search ? search : '', page ? parseInt(page) : 1],
    queryFn: async () =>
      await customFetch.get(
        `/rooms?search=${search ? search : ''}&page=${page ? Number(page) : 1}`
      ),
  }
}
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url)
    const params = Object.fromEntries(url.searchParams)

    const response = await queryClient.ensureQueryData(getRoomsQuery(params))

    return {
      meta: response.data.meta,
      rooms: response.data.rooms,
      params,
      queryClient,
    }
  }
const Rooms = () => {
  const { rooms, meta } = useLoaderData()

  return (
    <>
      <Modal>
        <AddNewRoom></AddNewRoom>
      </Modal>
      <Search>
        <SearchForm></SearchForm>
      </Search>
      <RoomList></RoomList>
      <Pagination></Pagination>
    </>
  )
}
export default Rooms
