import { useField } from 'formik'
const FormIkInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <label className='form-control '>
      <div className='label'>
        <span className='label-text capitalize'>{label}</span>
      </div>
      <input
        {...props}
        {...field}
        className={`input input-bordered ${props.size} ${props.borderRadius} ${
          meta.touched && meta.error ? 'border-red-300' : ''
        }`}
      />
      {meta.touched && meta.error && (
        <div className='text-sm text-red-300 italic py-2'>{meta.error}</div>
      )}
    </label>
  )
}
export default FormIkInput
