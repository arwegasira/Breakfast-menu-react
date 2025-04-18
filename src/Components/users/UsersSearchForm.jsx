import { useLoaderData, Link } from 'react-router-dom'
import FormInput from '../Util/FormInput'
import FormSelect from '../Util/FormSelect'

const userStatus = ['', 'Active', 'Inactive']
const UsersSearchForm = () => {
  const {
    params: { username, email, status },
  } = useLoaderData()
  return (
    <form className='flex flex-col gap-2 lg:flex-row lg:gap-4'>
      <FormInput
        label='Username'
        name='username'
        id='username'
        type='text'
        size='input-sm'
        defaultValue={username}
        placeholder='username'
      ></FormInput>
      <FormInput
        label='email'
        name='email'
        id='email'
        type='email'
        size='input-sm'
        defaultValue={email}
        placeholder='email'
      ></FormInput>
      <FormSelect
        label='Status'
        name='status'
        list={userStatus}
        defaultValue={status}
        size='select-sm'
      ></FormSelect>
      <button className='btn btn-sm primary-button mt-4 lg:mt-8 flex-grow'>
        Search
      </button>
      <Link className='btn btn-sm secondary-button mt-4 lg:mt-8 flex-grow'>
        Clear Filter
      </Link>
      {/* <div className='flex flex-col gap-4 lg:flex-row bg-red-100 lg:items-center lg:mt-6'>
        <button
          type='submit'
          className='btn btn-sm primary-button w-full lg:w-[90%]'
        >
          Search
        </button>
        <Link className='btn btn-sm secondary-button w-full lg:w-[90%]'>
          Clear Filter
        </Link>
      </div> */}
    </form>
  )
}
export default UsersSearchForm
//username filter
//email filter
//status filter
