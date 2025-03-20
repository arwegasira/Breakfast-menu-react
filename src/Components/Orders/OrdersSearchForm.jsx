import { useLoaderData } from 'react-router-dom'
import FormInput from '../Util/FormInput'
import FormSelect from '../Util/FormSelect'

const orderStatusList = ['', 'Pending', 'Approved', 'Canceled', 'Completed']
const OrdersSearchForm = () => {
  const {
    params: { orderStatus, orderNumber, room },
  } = useLoaderData()
  console.log(orderStatus)
  return (
    <form className='flex flex-col gap-2 lg:flex-row lg:gap-4 lg:justify-center'>
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
        id='room'
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
      <div className='mt-4 lg:flex lg:flex-col  lg:flex-grow lg:justify-center lg:mt-8'>
        <button type='submit' className='btn btn-sm primary-button w-[100%]'>
          Search
        </button>
      </div>
    </form>
  )
}
export default OrdersSearchForm
