import { useRouteError } from 'react-router-dom'
const ErrorElement = () => {
  const error = useRouteError()

  if (error.status === 403) {
    return (
      <div className='flex justify-center items-center  h-80'>
        <p className='text-md tracking-wider leading-7 font-medium md:text-xl'>
          Forbidden.....
        </p>
      </div>
    )
  } else {
    return (
      <div className='flex justify-center items-center  h-80'>
        <p className='text-md tracking-wider leading-7 font-medium md:text-xl'>
          Something Went Wrong, try again....
        </p>
      </div>
    )
  }
}
export default ErrorElement
