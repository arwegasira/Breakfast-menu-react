import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { customFetch } from '../Utils'
import { useState } from 'react'
import { toast } from 'react-toastify'
const roomQuery = () => {
  return {
    queryKey: ['rooms'],
    queryFn: () => customFetch.get('/home/homeRoom-selection'),
  }
}
export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(roomQuery())
  return {
    rooms: response.data.rooms,
  }
}

const Home = () => {
  const { rooms } = useLoaderData()
  const options = rooms.map((room) => room.name)
  const clientRoomChoice = localStorage.getItem('clientRoomChoice')
  const [roomChoice, setRoomChoice] = useState(
    clientRoomChoice || 'Choose Room'
  )
  const navigate = useNavigate()

  const handleContinue = () => {
    if (!roomChoice || roomChoice === 'Choose Room') {
      toast.error('Please select your room')
    } else {
      localStorage.setItem('clientRoomChoice', roomChoice)
      navigate('/your-order')
    }
  }
  return (
    <>
      <header className='h-12 flex justify-end items-center p-4 lg:p-10 bg-yellowBg italic'>
        <p className='text-sm md:text-base lg:text-lg'>
          Are you a staff ?
          <Link to='/login' className='pl-1 text-blue-700'>
            Login Here
          </Link>
        </p>
      </header>
      <section className=' w-[60rem] max-w-[90%] mx-auto mt-10 py-16'>
        <h1 className='text-center pb-1 text-lg md:text-2xl lg:text-4xl font-medium text-redBg'>
          Welcome to Our Breakfast Menu
        </h1>
        <p className='text-center text-sm md:text-base lg:text-xl tracking-wider'>
          Choose Your Room and Place Order
        </p>

        <select
          onChange={(e) => setRoomChoice(e.target.value)}
          value={roomChoice}
          className={`select select-bordered select-align-center text-sm md:text-base lg:text-xl select-md w-full my-4`}
          name='roomSelection'
        >
          <option disabled>Choose Room</option>
          {options.map((option, idx) => {
            return (
              <option key={idx} value={option}>
                {option}
              </option>
            )
          })}
        </select>
        <div className='mt-2 flex justify-center'>
          <button
            className='btn primary-button w-56 md:w-[50%] text-base text-white'
            onClick={() => handleContinue()}
          >
            Continue
          </button>
        </div>
      </section>
    </>
  )
}
export default Home
