import { redirect } from 'react-router-dom'

export const loader = async ({ request }) => {
  const url = new URL(request.url)
  const params = Object.fromEntries(url.searchParams)
  if (params.googleSignRedirect) {
    const userData = JSON.parse(params.user)
    localStorage.setItem('user', JSON.stringify(userData))
  }
  let user = localStorage.getItem('user')
  user = JSON.parse(user)
  if (!user) {
    return redirect('/home')
  } else {
    return redirect('/Orders')
  }
}
const Landing = () => {
  return <></>
}
export default Landing
