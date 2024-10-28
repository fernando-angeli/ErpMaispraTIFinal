import "./RadioGroup.css";
const RadioGroup = ({ label, name,clasnameDiv, options, onChange, defaultValue }) => (
  <label className="inputLabel">
    <span className="inputDescription">{label}</span>
    <div className={`divRadios ${clasnameDiv}`}>
      {options.map((option, index) => (
        <div key={index} className="labelRadiosCpfCnpj">
          <input
            type="radio"
            id={option.value}
            value={option.value}
            name={name}
            defaultChecked={option.value === defaultValue}
            className="inputRadio"
            onClick={() => onChange(option.value)}
          />
          <label htmlFor={option.value} className="text labelRadio">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </label>
);

export default RadioGroup;
