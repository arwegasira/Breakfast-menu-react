import { Formik, Form } from 'formik'
import FormIkInput from '../Components/FormIk/FormIkInput'
import { loginValidations } from '../Utils'
import { FcGoogle } from 'react-icons/fc'
const Login = () => {
  return (
    <section>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          console.log(values)
        }}
        validationSchema={loginValidations}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <FormIkInput
                label='Email'
                name='email'
                type='email'
                id='email'
              ></FormIkInput>
              <FormIkInput
                label='Password'
                name='password'
                type='password'
                id='password'
              ></FormIkInput>
              <div>
                <button type='submit' disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
      <div>
        <button type='button'>
          <FcGoogle />
          <span>Sign with Google</span>
        </button>
      </div>
    </section>
  )
}
export default Login
