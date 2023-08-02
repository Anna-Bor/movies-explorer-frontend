import './FormInput.css';

function FormInput({
  id,
  name,
  modifier,
  type,
  placeholder,
  ariaLabel,
  readOnly,
  autoComplete,
  value,
  onValueChange,
  additionalProps,
}) {
  return (
    <div className="form__field-holder">
      <label
        className={`form__field-label${
          modifier ? ` form__field-label_${modifier}` : ''
        }`}
        htmlFor={id}
      >
        {placeholder}
        <input
          id={id}
          name={name}
          type={type}
          aria-label={ariaLabel}
          autoComplete={autoComplete}
          readOnly={readOnly}
          value={value ?? ''}
          onChange={(e) => onValueChange(e.target.value)}
          className={`form__field${modifier ? ` form__field_${modifier}` : ''}`}
          required="required"
          {...additionalProps}
        />
      </label>
      <span
        className={`form__field-error ${id}-error${
          modifier ? ` form__field-error_${modifier}` : ''
        }`}
      />
    </div>
  );
}

export default FormInput;
