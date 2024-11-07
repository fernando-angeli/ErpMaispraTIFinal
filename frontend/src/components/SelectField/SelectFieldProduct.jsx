import { useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
const filteredOptions = arrayOptions.filter((option) =>
  option.fullName.toLowerCase().includes(searchTerm.toLowerCase())
);

const handleSelectChange = (e) => {
  const selectedValue = e.target.value;
  const parsedValue = JSON.parse(selectedValue); 
  onChange(parsedValue);
};

return (
  <div className={classnameDiv}>
    <label htmlFor={id} className="inputLabel">
      <span className="inputDescription">{label}</span>

      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
      />

      <select
        name={name}
        id={id}
        value={JSON.stringify(value)} 
        required={required}
        onChange={handleSelectChange}
        onInvalid={onInvalid}
        className={`selectRole ${classNameSelect}`}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {filteredOptions.map((option) => (
          <option
            key={option.id}
            value={JSON.stringify({ id: option.id, authority: option.fullName, price: option.price})} 
          >
            {option.fullName}
          </option>
        ))}
      </select>
    </label>
  </div>
);
}

export default SelectField;
