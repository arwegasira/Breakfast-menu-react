import { Formik, Form } from 'formik'
import FormIkInput from '../FormIk/FormIkInput'
import { customFetch, roomValidations } from '../../Utils'
import { useGLobalContext } from '../../AppContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const AddNewRoom = () => {
  const {
    modalTitle,
    roomForm: { name, phoneNumber },
    closeModal,
  } = useGLobalContext()

  const queryClient = useQueryClient()

  const { mutate: addNewRoom } = useMutation({
    mutationFn: async (values) => await customFetch.post('/rooms', values),
    onSuccess: async () => {
      closeModal()
      toast.success('Room added successfully')
      return await queryClient.invalidateQueries(['getRooms'])
    },
    onError: (err) => {
      const msg = err.response.data || 'Something went wrong'
      toast.error(msg)
    },
  })

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
            <Form className='w-[90%] mx-auto flex flex-col gap-4 pt-6'>
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
                <button type='button' className='btn grow secondary-button'>
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
}
export default AddNewRoom
