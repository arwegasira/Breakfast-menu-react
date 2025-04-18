import { Search, UserSearchForm } from '../Components'
import { customFetch } from '../Utils'
import { redirect, useLoaderData } from 'react-router-dom'

const userQuery = (params) => {
  const { username, status, email, page } = params
  return {
    queryKey: [
      'getUsers',
      username ? username : '',
      status ? status : '',
      email ? email : '',
      page ? parseInt(page) : 1,
    ],
    queryFn: async () =>
      customFetch.get(
        `/users?username=${username ? username : ''}&status=${
          status ? status : ''
        }&email=${email ? email : ''}&page=${page ? Number(page) : 1}`
      ),
  }
}
export const loader =
  (queryClient) =>
  async ({ request }) => {
    let url = request.url
    const params = Object.fromEntries(new URL(url).searchParams)
    try {
      const response = await queryClient.ensureQueryData(userQuery(params))
      return {
        users: response?.data?.users,
        params,
        meta: response?.data?.meta,
      }
    } catch (error) {
      // un-authenticated
      if (error.response.status === 401) return redirect('/login')
    }
  }
const users = () => {
  //Modal to add new user
  // user list
  //pagination
  return (
    <>
      <Search maxWidth='max-w-[65rem]' sectionPadding='pt-6 pb-8 px-8'>
        <UserSearchForm></UserSearchForm>
      </Search>
    </>
  )
}
export default users
