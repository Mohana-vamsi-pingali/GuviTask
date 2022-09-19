import '../../index.css'

const FormRow = ({ type, name, value, handleChange, labelText, className='form-input'}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className={className}
      />
    </div>
  )
}

export default FormRow
