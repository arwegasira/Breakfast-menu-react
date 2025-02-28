import { useRouteError, Link } from 'react-router-dom'
const Error = () => {
  const error = useRouteError()
  if (error.status === 404) {
    return (
      <section className='flex flex-col gap-2 justify-center items-center h-80'>
        <p className='text-xl md:text-2xl tracking-wide font-medium leading-7'>
          404 Page Not Found
        </p>
        <Link to='/' className='btn  secondary-button'>
          Back Home
        </Link>
      </section>
    )
  } else return <h2>Something Went Wrong, try again... </h2>
}
export default Error
