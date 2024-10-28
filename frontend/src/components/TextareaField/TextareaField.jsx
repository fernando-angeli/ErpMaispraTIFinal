import "./TextareaField.css";

function TextareaField({
  label,
  placeholder,
  name,
  value,
  onChange,
  required = true,
  onInvalid,
  idInput,
  classNameDiv = "",
  rows = 4, // Adicionando uma propriedade para definir o número de linhas
}) {
  return (
    <div className={`${classNameDiv}`}>
      <label htmlFor={idInput} className="inputLabelTextarea">
        <span className="inputDescriptionTextarea">{label}</span>
        <textarea
          placeholder={placeholder}
          className="inputTextarea"
          name={name}
          id={idInput}
          value={value}
          required={required}
          onInvalid={onInvalid}
          onChange={onChange}
          rows={rows} 
        />
      </label>
    </div>
  );
}

export default TextareaField;
