import { useState, useEffect } from "react";

function SelectFieldProduct({
  label,
  name,
  id,
  value,
  onInvalid,
  onChange,
  onChangeValue,
  arrayOptions,
  required = true,
  placeholder = "Selecione...",
  classNameSelect = "",
  classNameDiv = "",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOptions = (arrayOptions || []).filter((option) =>
    option.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    onChangeValue(filteredOptions);
  }, [searchTerm]);

  return (
    <div className={classNameDiv}>
      <label htmlFor={id} className="inputLabel">
        <span className="inputDescription">{label}</span>
        
        <input 
          list="products" 
          placeholder="Digite..." 
          onChange={(e) => setSearchTerm(e.target.value)} 
          value={searchTerm}
          
        />

        <datalist id="products">
          {filteredOptions.map((option) => (
            <option
              key={option.id}
              value={option.name} 
              label={`Disponivel: ${option.availableForSale} -Reservado: ${option.reservedStock} - R$ ${option.productPrice.toFixed(2)}`} 
            />
          ))}
        </datalist>
      </label>
    </div>
  );
}

export default SelectFieldProduct;
