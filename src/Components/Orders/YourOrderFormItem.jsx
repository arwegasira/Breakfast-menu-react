import { useLoaderData } from 'react-router-dom'
import { useGLobalContext } from '../../AppContext'

const YourOrderFormItem = () => {
  const { items } = useLoaderData()
  const { orderItems, manipulateOrderItems } = useGLobalContext()

  return (
    <>
      {items.map((item, idx) => {
        const { category, items } = item
        return (
          <div key={idx} className='pl-4 mb-5 w-[90%] sm:w-[80%] mx-auto'>
            <p className='text-base lg:text-xl font-semibold pb-2 border-b-2'>
              {category}
            </p>
            {items.map((item) => {
              const { itemName, _id } = item
              return (
                <label key={_id} className='mt-4 flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    value={itemName}
                    id={itemName}
                    name={itemName}
                    className='inputCheckbox'
                    onChange={(e) =>
                      manipulateOrderItems({
                        target: e.target,
                        maxItems:
                          category === 'Mixed Fresh Fruits Cut'
                            ? items.length
                            : 2,
                        category,
                      })
                    }
                  ></input>
                  <span className='lg:text-xl'>{itemName}</span>
                </label>
              )
            })}
          </div>
        )
      })}
    </>
  )
}
export default YourOrderFormItem
