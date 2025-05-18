import { redirect, useLoaderData, useLocation } from 'react-router-dom'
import { customFetch } from '../Utils'
import { AddNewRoom, Modal, Pagination, Search } from '../Components'
import SearchForm from '../Components/Room/SearchForm'
import { RoomList } from '../Components'
import { useGLobalContext } from '../AppContext'
import { useEffect, useRef } from 'react'

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
    try {
      const response = await queryClient.ensureQueryData(getRoomsQuery(params))
      const rooms = response?.data?.rooms
      const meta = response?.data?.meta
      return {
        meta: meta,
        rooms: rooms,
        params,
        queryClient,
      }
    } catch (error) {
      // un-authenticated
      if (error.response.status === 401) return redirect('/login')
    }
  }
const Rooms = () => {
  const { rooms, meta } = useLoaderData()
  const { page } = meta
  const { search, pathname } = useLocation()
  const { isModalOpen, closeModal } = useGLobalContext()
  // make sure if we delete the last room on a page we go to previous page
  if (rooms.length === 0 && page > 1) {
    const urlSearchParams = new URLSearchParams(search)
    urlSearchParams.set('page', Number(page - 1))
    window.location.href = `${pathname}?${urlSearchParams.toString()}`
  }

  const editFormRef = useRef(null)

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        e.preventDefault()
        editFormRef.current.reset()
        closeModal()
      }
    }
    document.addEventListener('keydown', handleKeydown)

    return () => document.removeEventListener('keydown', handleKeydown)
  }, [isModalOpen])

  return (
    <>
      <Modal>
        {isModalOpen ? <AddNewRoom ref={editFormRef}></AddNewRoom> : null}
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
