import { useLoaderData } from 'react-router-dom'
import SingleItem from './SingleItem'
const ItemList = () => {
  const { breakfastItems } = useLoaderData()

  return (
    <div className='overflow-x-auto mt-16'>
      <table className='table table-pin-rows table-sm md:table-md xl:table-lg'>
        {breakfastItems.map((item, idx) => {
          const { category, items } = item
          return (
            <SingleItem
              key={idx}
              category={category}
              items={items}
              idx={idx}
            ></SingleItem>
          )
        })}
      </table>
    </div>
  )
}
export default ItemList
