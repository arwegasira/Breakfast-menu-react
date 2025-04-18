import { useLoaderData } from 'react-router-dom'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/outline'
const UsersList = () => {
  const { users, meta } = useLoaderData()
  console.log(users)
  return (
    <section className='mt-20'>
      <div className='overflow-x-auto'>
        <table className='table table-xs md:table-sm lg:table-lg'>
          {/* head */}
          <thead>
            <tr className='text-xs md:text-sm lg:text-base'>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className='flex justify-end'>
                <button className='btn btn-sm btn-ghost p-1 focus:outline-none'>
                  <PlusCircleIcon className='h-6 w-6 text-slate-950' />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const { _id, email, name, role, username, isActive } = user
              return (
                <tr key={_id} className='hover'>
                  <td>{name}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{role}</td>
                  <td>{isActive ? 'Active' : 'Inactive'}</td>
                  <td className=' flex justify-between '>
                    <button type='button' className='btn btn-sm btn-ghost p-1'>
                      <PencilSquareIcon className='h-6 w-6' />
                    </button>
                    <button type='button' className='btn btn-sm btn-ghost p-1'>
                      <XMarkIcon className='h-6 w-6 text-red-700' />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
export default UsersList
