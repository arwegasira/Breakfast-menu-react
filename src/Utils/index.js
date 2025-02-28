import axios from 'axios'
import * as Yup from 'yup'
const environment = import.meta.env.VITE_ENVIRONMENT
export const customFetch = axios.create({
  // baseURL: environment === 'dev' ? 'http://localhost:3000' : '',
  baseURL: 'http://localhost:3000/api/v1',
})

export const roomValidations = Yup.object({
  name: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
})

const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
export const loginValidations = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string()
    .required('password is Required')
    .matches(passwordRule, {
      message:
        'Password must be at least 8 char long, contains at least one uppercase, at least one lowercase, and at least one digit',
    }),
})
export const flattenPolyFill = (arr, dep = 1) => {
  return dep > 0
    ? arr.reduce((acc, curr) => {
        acc = acc.concat(
          Array.isArray(curr) ? flattenPolyFill(curr, dep - 1) : curr
        )
        return acc
      }, [])
    : arr.slice()
}
