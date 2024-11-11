import { useNavigate } from "react-router-dom";
import "./NavigationMenu.css";
import { useState } from "react";
import arrayOptions from "./OptionNavigationMenu/OptionsNavigationMenu";
function NavigationMenu() {
  const [selected, setSelected] = useState(-1);
  const navigate = useNavigate();
  return (
    <div
      className={`navigationMenu ${
        arrayOptions().length == 6 ? "navigationMenuAdmin" : ""
      }`}
    >
      {arrayOptions().map((option, index) => (
        <div
          key={index}
          className={`option option${index} 
          ${selected == index ? "selected" : ""}`}
          onClick={() =>{ setSelected(index)
            navigate(option.url)}
          }
        >
            <div className="optionResposive">
              <img
                src={option.icon}
                alt={option.description}
                className="optionIcon"
              />
              <label className="optionDescription">{option.description}</label>
            </div>
        </div> 
       
      ))}
    </div>
  );
}

export default NavigationMenu;
