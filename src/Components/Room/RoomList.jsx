import { useLoaderData } from 'react-router-dom'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customFetch } from '../../Utils'
import { useGLobalContext } from '../../AppContext'
import { toast } from 'react-toastify'
import { memo } from 'react'
const deleteRoom = async (id) => {
  return await customFetch.delete(`/rooms/${id}`)
}

const tHead = ({ openModal, populateFormFields }) => {
  return (
    <>
      <thead>
        <tr className='text-sm lg:text-base'>
          <th>Name</th>
          <th>Contact</th>
          <th className='flex justify-end'>
            <button
              className='btn btn-sm btn-ghost p-1 focus:outline-none'
              onClick={() => {
                populateFormFields({
                  fieldValues: { name: '', phoneNumber: '' },
                  modalTitle: 'Add Room',
                  formName: 'room',
                })
                openModal()
              }}
            >
              <PlusCircleIcon className='h-6 w-6 text-slate-950' />
            </button>
          </th>
        </tr>
      </thead>
    </>
  )
}
const RoomList = () => {
  const {
    rooms,
    params: { search, page },
  } = useLoaderData()
  const queryClient = useQueryClient()
  const { openModal, populateFormFields } = useGLobalContext()
  const { mutateAsync: deleteRoomMutation } = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      queryClient.invalidateQueries()
      window.location.reload()
    },
  })

  return (
    <section className='mt-24'>
      <div className='overflow-x-auto'>
        <table className='table table-sm '>
          {tHead({ openModal, populateFormFields })}

          <tbody>
            {/* rows */}
            {rooms.map((room) => {
              const { _id, name, phoneNumber } = room
              return (
                <tr key={_id} className='hover'>
                  <td>{name}</td>
                  <td>{phoneNumber}</td>
                  <td className=' flex justify-between '>
                    <button
                      type='button'
                      className='btn btn-sm btn-ghost p-1 focus:outline-none'
                      onClick={() => {
                        openModal()
                        populateFormFields({
                          fieldValues: { name: name, phoneNumber: phoneNumber },
                          formName: 'room',
                          modalTitle: 'Edit Room',
                        })
                      }}
                    >
                      <PencilSquareIcon className='h-6 w-6' />
                    </button>
                    <button
                      type='button'
                      className='btn btn-sm btn-ghost p-1'
                      onClick={async () => {
                        try {
                          await deleteRoomMutation(_id)
                        } catch (error) {
                          const msg = error.message || 'Something went wrong'
                          toast.error(msg)
                        }
                      }}
                    >
                      <XMarkIcon className='h-6 w-6 text-red-700' />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
export default memo(RoomList)
