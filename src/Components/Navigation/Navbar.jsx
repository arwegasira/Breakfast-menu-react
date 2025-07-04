import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../../assets/rohiLogo.png'
import NavLinks from './NavLinks'
import { useNavigate } from 'react-router-dom'
import { customFetch } from '../../Utils'

const navigation = [
  { name: 'Dashboard', href: '/Dashboard' },
  { name: 'Orders', href: 'orders' },
  { name: 'Menu Items', href: 'breakfastItems' },
  { name: 'Rooms', href: 'rooms' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const handleLogout = async () => {
  localStorage.removeItem('user')
  await customFetch.post('/auth/logout')
}
let user = JSON.parse(localStorage.getItem('user'))
let username = user?.name[0]
let role = user?.role

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <Disclosure as='nav' className='bg-redBg font-nunitos w-full'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            {/* Mobile menu button*/}
            <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
              <span className='absolute -inset-0.5' />
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon
                aria-hidden='true'
                className='block h-6 w-6 group-data-[open]:hidden'
              />
              <XMarkIcon
                aria-hidden='true'
                className='hidden h-6 w-6 group-data-[open]:block'
              />
            </DisclosureButton>
          </div>
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-around'>
            <div className='flex flex-shrink-0 items-center '>
              <img
                alt='Rohi Apartments'
                src={logo}
                className='h-8 w-auto cursor-pointer'
                onClick={() => navigate('/')}
              />
            </div>
            <div className='hidden sm:ml-6 sm:block'>
              <div className='flex space-x-4'>
                {navigation.map((item) => (
                  <NavLinks
                    item={item}
                    key={item.name}
                    classNames={classNames}
                  ></NavLinks>
                ))}
              </div>
            </div>
          </div>
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            {/* Add New orders notification later */}
            {/* <button
              type='button'
              className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
            >
              <span className='absolute -inset-1.5' />
              <span className='sr-only'>View notifications</span>
              <BellIcon aria-hidden='true' className='h-6 w-6' />
            </button> */}

            {/* Profile dropdown */}
            <Menu as='div' className='relative ml-3'>
              <div>
                <MenuButton className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                  <span className='absolute -inset-1.5' />
                  <span className='sr-only'>Open user menu</span>
                  {/* <img
                    alt=''
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    className='h-8 w-8 rounded-full'
                  /> */}
                  <span className='h-8 w-8 rounded-full flex items-center justify-center text-white text-center'>
                    {username}
                  </span>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
              >
                <MenuItem>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100'
                  >
                    Your Profile
                  </a>
                </MenuItem>
                {role === 'admin' ? (
                  <MenuItem>
                    <a
                      href='/users'
                      className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100'
                    >
                      Users
                    </a>
                  </MenuItem>
                ) : null}

                <MenuItem>
                  <a
                    href='login'
                    className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100'
                    onClick={handleLogout}
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className='sm:hidden'>
        <div className='space-y-1 px-2 pb-3 pt-2'>
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as='a'
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
