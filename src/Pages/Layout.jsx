import { Outlet, useNavigation } from 'react-router-dom'
import { Navbar, Banner } from '../Components'
import Loading from '../Components/Util/Loading'
const Layout = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <main className='font-nunito align-elements'>
          <Outlet></Outlet>
        </main>
      )}
    </>
  )
}
export default Layout
