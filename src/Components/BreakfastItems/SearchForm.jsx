import { useLoaderData } from 'react-router-dom'
import FormSearchInput from '../Util/FormSearchInput'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const SearchForm = () => {
  const {
    params: { search },
  } = useLoaderData()
  return (
    <form className='flex flex-col gap-3 lg:flex-row lg:justify-start'>
      <FormSearchInput
        type='search'
        size='input-md'
        placeholder='Search'
        name='search'
        defaultValue={search}
      ></FormSearchInput>
      <button className='btn bg-white'>
        <MagnifyingGlassIcon className='h-6 w-6 text-gray-500' />
        Search
      </button>
    </form>
  )
}
export default SearchForm
