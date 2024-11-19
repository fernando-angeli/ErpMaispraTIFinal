function SelectField({
  label,
  name,
  id,
  value,
  onInvalid,
  onChange,
  arrayOptions,
  required = true,
  placeholder = "Selecione...",
  classNameSelect = "",
  classnameDiv = "",
}) {
  return (
    <div className={classnameDiv}>
      <label htmlFor={id} className="inputLabel">
        <span className="inputDescription">{label}</span>
        <select
          name={name}
          id={`select ${id}`}
          value={value}
          required={required}
          onChange={onChange}
          onInvalid={onInvalid}
          className={`selectRole ${classNameSelect}`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {arrayOptions.map((option) => (
            <option id="option"
              key={option.id}
              value={JSON.stringify({ id: option.id, authority: option.label })}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
export default SelectField;
