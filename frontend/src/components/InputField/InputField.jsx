import "./InputField.css";

function InputField({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  required = true,
  onInvalid,
  idInput,
  classNameDiv = "",
  disabled = false,
  readOnly = false,
}) {
  return (
    <div className={classNameDiv}>
      <label htmlFor={idInput} className="inputLabel">
        <span
          className={`inputDescription ${
            classNameDiv == "inputFieldNoLabel" ? "inputFieldNoLabel" : ""
          }`}
        >
          {label}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className="inputText"
          name={name}
          id={idInput}
          value={value}
          required={required}
          onInvalid={onInvalid}
          onChange={onChange}
          disabled={disabled}
        />
      </label>
    </div>
  );
}

export default InputField;
