import { NavLink } from 'react-router-dom'
const NavLinks = ({ item, classNames }) => {
  return (
    <NavLink
      to={item.href}
      className={({ isActive }) => {
        return classNames(
          isActive
            ? 'bg-gray-900 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
          'rounded-md px-3 py-1 text-md font-medium'
        )
      }}
    >
      {item.name}
    </NavLink>
  )
}
export default NavLinks
