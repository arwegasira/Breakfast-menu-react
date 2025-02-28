import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
const addButton = () => {
  return (
    <button className='btn btn-sm btn-ghost p-1 focus:outline-none'>
      <PlusCircleIcon className='h-6 w-6 text-slate-950' />
    </button>
  )
}
const deleteAndEditButton = ({ id }) => {
  return (
    <>
      <button
        type='button'
        className='btn btn-sm btn-ghost p-1'
        onClick={() => console.log(id)}
      >
        <PencilSquareIcon className='h-6 w-6' />
      </button>
      <button
        type='button'
        className='btn btn-sm btn-ghost p-1'
        onClick={() => console.log(id)}
      >
        <XMarkIcon className='h-6 w-6 text-red-700' />
      </button>
    </>
  )
}
const SingleItem = ({ category, items, idx }) => {
  return (
    <>
      <thead className='text-lg md:text-xl'>
        <tr>
          <th>{category}</th>
          <th>{null}</th>
          <th className='flex justify-end outline-none focus:outline-none'>
            {idx === 0 ? addButton() : null}
          </th>
        </tr>
      </thead>
      <tbody className=''>
        {items.map((item, idx) => {
          const { itemName, _id, isAvailable } = item
          return (
            <tr key={idx} className=' hover text-xs md:text-base'>
              <td>{itemName}</td>
              <td
                className={`${
                  isAvailable
                    ? 'text-green-700 text-left'
                    : 'text-red-700 text-left'
                }`}
              >
                {isAvailable ? 'Available' : 'Not Available'}
              </td>
              <td className=' flex justify-between '>
                {deleteAndEditButton({ id: _id })}
              </td>
            </tr>
          )
        })}
      </tbody>
    </>
  )
}
export default SingleItem
