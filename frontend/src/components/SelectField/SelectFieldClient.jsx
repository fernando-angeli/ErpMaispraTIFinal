import { useState } from "react";

function SelectFieldClient({
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
    option.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className={classnameDiv}>
      <label htmlFor={id} className="inputLabel">
        <span className="inputDescription">{label}</span>
        
        <input 
          list="clients" 
          placeholder="Digite..." 
          onChange={(e) => setSearchTerm(e.target.value)} 
          value={searchTerm}
        />

        <datalist id="clients">
          {filteredOptions.map((option) => (
            <option
              key={option.id}
              value={option.fullName}
            />
          ))}
        </datalist>
      </label>
    </div>
  );
}

export default SelectFieldClient;
