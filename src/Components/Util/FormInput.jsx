const FormInput = ({ label, type, name, id, placeholder, size }) => {
  return (
    <label className='form-control'>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        className={`input ${size} input-bordered`}
      />
    </label>
  )
}
export default FormInput
