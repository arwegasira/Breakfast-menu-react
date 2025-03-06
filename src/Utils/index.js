import axios from 'axios'
import * as Yup from 'yup'
const environment = import.meta.env.VITE_ENVIRONMENT
const serverDev = import.meta.env.VITE_SERVER_URL_DEV
const serverPro = import.meta.env.VITE_SERVER_URL_PRO
export const serverUrl = environment === 'dev' ? serverDev : serverPro
export const customFetch = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
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
