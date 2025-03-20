import FormInput from '../Util/FormInput'
import FormSelect from '../Util/FormSelect'

const orderStatus = ['', 'Pending', 'Approved', 'Canceled', 'Completed']
const OrdersSearchForm = () => {
  return (
    <form className=''>
      <FormSelect
        label='Status'
        name='orderStatus'
        list={orderStatus}
      ></FormSelect>
      <FormInput
        label='Order #'
        type='text'
        name='orderNumber'
        placeholder='Order Number'
        id='room'
      ></FormInput>
      <FormInput
        label='room'
        type='text'
        name='room'
        placeholder='room'
        id='room'
      ></FormInput>
      <button type='submit'>Search</button>
    </form>
  )
}
export default OrdersSearchForm
