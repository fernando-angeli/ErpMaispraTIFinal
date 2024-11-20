import { useState, useEffect } from "react";

function SelectFieldClient({
  label,
  name,
  id,
  value,
  onInvalid,
  onUpdate,
  arrayOptions,
  onChangeValue,
  required = true,
  placeholder = "Selecione...",
  classNameSelect = "",
  classNameDiv = "",
}) {  
 const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = arrayOptions.filter((option) =>
    option.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    onChangeValue(filteredOptions);
  }, [searchTerm]);

  useEffect(() => {
    if(value){
      setSearchTerm(value)
    }
  }, [value]);

  return (
    <div className={classNameDiv}>
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
