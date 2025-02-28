const FormSearchInput = ({
  size,
  type,
  placeholder,
  name,
  defaultValue,
  borderRadius,
  disabled,
  flexGrow,
}) => {
  return (
    <label className='form-control grow'>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        className={`input input-bordered ${size} ${borderRadius}`}
        disabled={disabled}
      />
    </label>
  )
}
export default FormSearchInput
