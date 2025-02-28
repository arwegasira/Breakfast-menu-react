import { useLoaderData, redirect } from 'react-router-dom'
import { customFetch } from '../Utils'
import { toast } from 'react-toastify'
import { YourOrderFormItem } from '../Components'
import { useGLobalContext } from '../AppContext'
import { flattenPolyFill } from '../Utils'
import { useState } from 'react'

const getOrderItemsQuery = () => {
  return {
    queryKey: ['orderItems'],
    queryFn: async () => customFetch.get(`/breakfastItems/availableItems`),
  }
}
export const loader = (queryClient) => async () => {
  const clientRoom = localStorage.getItem('clientRoomChoice')
  if (!clientRoom) {
    toast.error('Please select your room')
    return redirect('/home')
  }
  const response = await queryClient.ensureQueryData(getOrderItemsQuery())
  return {
    items: response.data.items,
    clientRoom,
  }
}

const YourOrder = () => {
  const { clientRoom } = useLoaderData()
  const { orderItems } = useGLobalContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (Object.keys(orderItems).length === 0) {
      toast.warn('Choose items first')
      return
    }
    setIsSubmitting(true)
    let items = Object.values(orderItems)
    items = !Array.prototype.flat ? flattenPolyFill(items) : items.flat()
    try {
      await customFetch.post('/order', {
        room: clientRoom,
        items: items,
      })
      toast.success('Order Sent successfully!')
      localStorage.removeItem('clientRoomChoice')
      setTimeout(() => {
        window.location.href = '/home'
      }, 5000)
    } catch (error) {
      setIsSubmitting(false)
      toast.error('Order Failed, Please try again')
    }
  }

  return (
    <>
      <header className='bg-yellowBg h-10 md:h-16 '>
        <p className='text-center md:text-right italic font-semibold text-lg p-2 md:p-4 lg:px-16'>
          Your Room is : {clientRoom}
        </p>
      </header>
      <section className='my-4 md:my-6 px-2 text-sm sm:text-base md:text-xl xlg:text-2xl italic'>
        <p className='text-center'>Please tick to indicate your preference</p>
        <p className='text-center'>
          (Not more than 2 on each section, except fruits)
        </p>
      </section>
      <form className='w-[90%] max-w-[42rem] mx-auto '>
        <YourOrderFormItem></YourOrderFormItem>
        <div className='flex justify-center pl-4  w-[90%] sm:w-[80%] mx-auto mt-8'>
          <button
            type='submit'
            className='btn primary-button w-[50%]'
            onClick={(e) => handleSubmit(e)}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting' : 'Place Order'}
          </button>
        </div>
      </form>
    </>
  )
}
export default YourOrder
