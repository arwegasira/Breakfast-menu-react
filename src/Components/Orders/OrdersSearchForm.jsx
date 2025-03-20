import { Link, useLoaderData } from 'react-router-dom'
import FormInput from '../Util/FormInput'
import FormSelect from '../Util/FormSelect'
const orderStatusList = ['', 'Pending', 'Approved', 'Cancelled', 'Completed']
const OrdersSearchForm = () => {
  const {
    params: { orderStatus, orderNumber, room },
  } = useLoaderData()
  console.log(orderStatus)
  return (
    <form className='flex flex-col gap-2 lg:flex-row lg:gap-4 '>
      <FormSelect
        label='Status'
        name='orderStatus'
        list={orderStatusList}
        defaultValue={orderStatus}
        size='select-sm'
      ></FormSelect>
      <FormInput
        label='Order #'
        type='text'
        name='orderNumber'
        placeholder='Order Number'
        id='orderNumber'
        size='input-sm'
        defaultValue={orderNumber}
      ></FormInput>
      <FormInput
        label='Room Number'
        type='text'
        name='room'
        placeholder='Room Number'
        id='room'
        size='input-sm'
        defaultValue={room}
      ></FormInput>
      <div className='mt-2 flex flex-col gap-4 lg:flex-row lg:mt-8'>
        <button type='submit' className='btn btn-sm primary-button w-[100%]'>
          Search
        </button>
        <Link to='/orders' className='btn btn-sm secondary-button w-[100%]'>
          Clear Filters
        </Link>
      </div>
    </form>
  )
}
export default OrdersSearchForm
