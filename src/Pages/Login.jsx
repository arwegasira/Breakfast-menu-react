import { Formik, Form } from 'formik'
import FormIkInput from '../Components/FormIk/FormIkInput'
import { customFetch, loginValidations } from '../Utils'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify'

const Login = () => {
  return (
    <section className='flex flex-col justify-center h-screen w-[90%] max-w-[42rem] mx-auto'>
      <h2 className='text-xl md:text-2xl lg:text-3xl font-medium lg:font-semibold'>
        Welcome Back!
      </h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            const response = await customFetch.post('auth/login', values)
            if (response.status === 200) {
              const user = response.data.user
              localStorage.setItem('user', JSON.stringify(user))
              toast.success(`Welcome ${user.name}!`)
              setTimeout(() => {
                window.location.href = '/Orders'
              }, 3000)
            }
          } catch (error) {
            const message = error.response.data || 'Something went wrong'
            toast.error(message)
          }
        }}
        validationSchema={loginValidations}
      >
        {({ isSubmitting }) => {
          return (
            <Form className=''>
              <FormIkInput
                label='Email'
                name='email'
                type='email'
                id='email'
                placeholder='Email'
                size='input-md'
              ></FormIkInput>
              <FormIkInput
                label='Password'
                name='password'
                type='password'
                id='password'
                placeholder='Password'
                size='input-md'
              ></FormIkInput>
              <div className='mt-6 flex justify-center'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='btn primary-button w-full'
                >
                  {isSubmitting ? 'Submitting...' : 'Login'}
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
      <div className='mt-6'>
        <button
          type='button'
          className='flex justify-center w-full gap-4 btn'
          onClick={() => {
            // window.location.href = 'http://localhost:3000/api/v1/auth/google'
            window.open('http://localhost:3000/api/v1/auth/google', '_self')
          }}
        >
          <FcGoogle className='text-2xl md:text-3xl' />
          <span className=' text-md md:text-lg'>Sign with Google</span>
        </button>
      </div>
    </section>
  )
}
export default Login
