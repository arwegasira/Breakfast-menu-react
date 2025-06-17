import { Formik, Form } from 'formik'
import FormIkInput from '../FormIk/FormIkInput'
import { customFetch, roomValidations } from '../../Utils'
import { useGLobalContext } from '../../AppContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useRef, forwardRef } from 'react'

const AddNewRoom = forwardRef((_, editFormRef) => {
  const {
    modalTitle,
    roomForm: { name, phoneNumber },
    closeModal,
  } = useGLobalContext()

  const formRef = useRef(null)

  const queryClient = useQueryClient()

  const { mutate: addNewRoom } = useMutation({
    mutationFn: async (values) => await customFetch.post('/rooms', values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getRooms'] })
      closeModal()
      toast.success('Room added successfully')
      // refresh window as invalidate queries is not working
      window.location.href = '/rooms'
    },
    onError: (err) => {
      const msg = err.response.data || 'Something went wrong'
      toast.error(msg)
    },
  })

  const handleCancel = () => {
    editFormRef.current.reset()
    closeModal()
  }

  return (
    <section className='bg-zinc-50 rounded-md py-10 w-[90%] max-w-[40rem] mx-auto'>
      <h4 className='text-center'> {modalTitle}</h4>
      <Formik
        initialValues={{
          name: name,
          phoneNumber: phoneNumber,
        }}
        validationSchema={roomValidations}
        onSubmit={(values) => {
          try {
            addNewRoom(values)
          } catch (error) {
            // const msg = error.message || 'Something went wrong'
            // toast.error(msg)
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form
              className='w-[90%] mx-auto flex flex-col gap-4 pt-6 edit-rom-form'
              ref={editFormRef}
            >
              <FormIkInput
                label='Name'
                name='name'
                size='input-md'
                type='text'
                id='name'
              ></FormIkInput>
              <FormIkInput
                label='Phone Number'
                name='phoneNumber'
                size='input-md'
                type='text'
                id='phoneNumber'
              ></FormIkInput>
              <div className='pt-4 flex flex-col gap-4 lg:flex-row justify-around '>
                <button
                  type='button'
                  className='btn grow secondary-button'
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='btn grow primary-button'
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </section>
  )
})
export default AddNewRoom
