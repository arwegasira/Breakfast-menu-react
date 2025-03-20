const FormInput = ({ label, type, name, id, placeholder }) => {
  return (
    <label className='form-control w-full max-w-xs'>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        className='input input-bordered w-full max-w-xs'
      />
    </label>
  )
}
export default FormInput
