import { useState, useEffect } from "react";
import "./FormNewEmployee.css";
import { CgAdd, CgRemove } from "react-icons/cg";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import Viacep from "../../Viacep/Viacep";
import InputField from "../../InputField/InputField";
import SelectField from "../../SelectField/SelectField";
import RadioGroup from "../../RadioGroup/RadioGroup";

function FormNewEmployee() {
  const [ResponsiveEmployee, setResponsiveEmployee] = useState(true);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeEmail, setNewEmployeeEmail] = useState("");
  const [newEmployeeAddress, setNewEmployeeAddress] = useState("");
  const [newEmployeePhone, setNewEmployeePhone] = useState("");
  const [newEmployeeCPF, setNewEmployeeCPF] = useState("");
  const [newEmployeeAddressNumber, setNewEmployeeAddressNumber] = useState("");
  const [newEmployeeDistrict, setNewEmployeeDistrict] = useState("");
  const [newEmployeeCity, setNewEmployeeCity] = useState("");
  const [newEmployeeCEP, setNewEmployeeCEP] = useState("");
  const [newEmployeeRole, setNewEmployeeRole] = useState("");
  const [newEmployeeState, setNewEmployeeState] = useState("");
  const [newEmployeeBirthDate, setNewEmployeeBirthDate] = useState("");
  const [newEmployeeStatus, setNewEmployeeStatus] = useState("");

  const [Error, setError] = useState();
  const [Success, setSuccess] = useState();

  const { JwtToken } = useAuth();

  const cityList = [{ id: 1, city: newEmployeeCity }];
  const roleList = [{ id: 1, city: "teste" }];

  const statusOptions = [
    { value: "ativo", label: "Ativo" },
    { value: "inativo", label: "Inativo" },
  ];

  const getCep = async (cep) => {
    try {
      const adress = await Viacep(cep);
      setNewEmployeeCity(adress.cidade);
      setNewEmployeeAddress(adress.logradouro);
      setNewEmployeeDistrict(adress.bairro);
      setNewEmployeeState(adress.estado);
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      alert("CEP inválido ou não encontrado.");
    }
  };

  useEffect(() => {
    if (newEmployeeCEP.length == 8) {
      getCep(newEmployeeCEP);
    }
  }, [newEmployeeCEP]);

  const isInvalid = (e) => {
    e.target.className = "isInvalid inputText";
  };

  const isValid = (e) => {
    if (e.target.value && e.target.className !== "inputText") {
      e.target.className = "inputText";
    }
  };

  const selectIsValid = (e) => {
    if (e.target.value && e.target.className !== "selectCity") {
      e.target.className = "selectCity";
    }
  };

  const selectIsInvalid = (e) => {
    e.target.className = "isInvalid selectCity";
  };

  const handleReset = () => {
    let form = document.getElementById("formNewEmployee");
    let elements = form.getElementsByClassName("isInvalid");

    while (elements.length > 0) {
      elements[0].classList.remove("isInvalid");
    }

    setNewEmployeeName("");
    setNewEmployeeEmail("");
    setNewEmployeeAddress("");
    setNewEmployeePhone("");
    setNewEmployeeCPF("");
    setNewEmployeeAddressNumber("");
    setNewEmployeeDistrict("");
    setNewEmployeeCity("");
    setNewEmployeeCEP("");
    setNewEmployeeState("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newEmployeeData = {
      fullName: newEmployeeName,
      gender: "NAO INFORMADO",
      cpf: newEmployeeCPF,
      rgIe: "RG12345",
      phoneNumber: newEmployeePhone,
      email: newEmployeeEmail,
      address: newEmployeeAddress,
      number: newEmployeeAddressNumber,
      district: newEmployeeDistrict,
      zipCode: newEmployeeCEP,
      city: newEmployeeCity,
      role: newEmployeeRole,
      state: newEmployeeState,
      country: "Brasil",
      birthDate: newEmployeeBirthDate,
      creditLimit: 100.0,
      status: "ativo",
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/employees`,
        newEmployeeData,
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      handleReset();
      setSuccess("Usuário adicionado com sucesso!");
      setError(null);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(`${err.response.data.message}`);
      } else {
        setError("Erro ao adicionar Usuário! Tente novamente.");
        setSuccess(null);
      }
    }
  };

  const resposiveEmployeeShow = () => {
    setResponsiveEmployee(!ResponsiveEmployee);
  };

  return (
    <div className="containerForm">
      <h2 className="tabTitle">
        Adicionar Usuario
        <a className="hide-desktop" onClick={resposiveEmployeeShow}>
          {" "}
          {!ResponsiveEmployee ? <CgAdd size={45} /> : <CgRemove size={45} />}
        </a>
      </h2>
      <form
        className={
          ResponsiveEmployee
            ? "visibleformNewEmployee"
            : "hiddenformNewEmployee"
        }
        id="formNewEmployee"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className="line1 line">
          <InputField
            label={"Nome:"}
            placeholder={"Digite o nome do usuário"}
            name={"nome"}
            idInput={"newEmployeeName"}
            classNameDiv={"fieldName"}
            value={newEmployeeName}
            onChange={(e) => {
              setNewEmployeeName(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
          <InputField
            label={"E-mail:"}
            placeholder={"Digite o e-mail do usuário"}
            name={"email"}
            idInput={"newEmployeeEmail"}
            classNameDiv="fieldEmail"
            type={"email"}
            value={newEmployeeEmail}
            onChange={(e) => {
              setNewEmployeeEmail(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
        </div>
        <div className="line2 line">
          <InputField
            label={"Data de Nascimento:"}
            name={"dataNascimento"}
            idInput={"newEmployeeBirthDate"}
            classNameDiv="fieldDate"
            type={"date"}
            value={newEmployeeBirthDate}
            onChange={(e) => {
              setNewEmployeeBirthDate(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />

          <InputField
            label={"Telefone:"}
            placeholder={"Digite o telefone do usuário"}
            name={"telefone"}
            idInput={"newEmployeePhone"}
            classNameDiv="fieldPhone"
            type={"tel"}
            value={newEmployeePhone}
            onChange={(e) => {
              setNewEmployeePhone(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
          <InputField
            label={"CPF:"}
            placeholder={"Digite o CPF do usuário"}
            name={"cpf"}
            idInput={"newEmployeeCPF"}
            classNameDiv="fieldCpf"
            type={"text"}
            value={newEmployeeCPF}
            onChange={(e) => {
              setNewEmployeeCPF(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
        </div>

        <div className="line3 line">
          <InputField
            label={"Logradouro:"}
            name={"logradouro"}
            placeholder={"Digite o endereço do usuário"}
            idInput={"newEmployeeAddress"}
            classNameDiv={"fieldAddress"}
            type={"text"}
            value={newEmployeeAddress}
            onChange={(e) => {
              setNewEmployeeAddress(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
          <InputField
            label={"Número:"}
            name={"numero"}
            placeholder={"0000"}
            idInput={"newEmployeeAddressNumber"}
            classNameDiv={"fieldAddressNumber"}
            type={"text"}
            value={newEmployeeAddress}
            onChange={(e) => {
              setNewEmployeeAddressNumber(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
        </div>

        <div className="line4 line">
          <InputField
            label={"Bairro:"}
            name={"bairro"}
            placeholder={"Digite o bairro do usuário"}
            idInput={"newEmployeeDistrict"}
            classNameDiv="fieldDistrict"
            type={"text"}
            value={newEmployeeDistrict}
            onChange={(e) => {
              setNewEmployeeDistrict(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />

          <SelectField
            label={"Cidade:"}
            name={"cidade"}
            id={"newEmployeeCity"}
            classnameDiv={"divSelectCity"}
            classNameSelect={"selectCity"}
            value={newEmployeeCity}
            onInvalid={(e) => selectIsInvalid(e)}
            onChange={(e) => {
              setNewEmployeeCity(e.target.value);
              selectIsValid(e);
            }}
            arrayOptions={cityList}
          />

          <InputField
            label={"CEP:"}
            name={"CEP"}
            placeholder={"00000-000"}
            idInput={"newEmployeeCEP"}
            classNameDiv={"fieldCep"}
            type={"text"}
            value={newEmployeeCEP}
            onChange={(e) => {
              setNewEmployeeCEP(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
        </div>

        <div className="line5 line">
          <div className="roleAndStatus">
            <SelectField
              label={"Cargo:"}
              name={"cargo"}
              id={"newEmployeeRole"}
              classnameDiv={"divSelectRole"}
              classNameSelect={"selectRole"}
              value={newEmployeeRole}
              onInvalid={(e) => selectIsInvalid(e)}
              onChange={(e) => {
                setNewEmployeeRole(e.target.value);
                selectIsValid(e);
              }}
              arrayOptions={roleList}
            />

            <div className="divStatus">
              <label
                htmlFor="newEmployeeStatus"
                className="inputLabel"
                id="labelNewEmployeeStatus"
              >
                <span className="inputDescription">Status:</span>
                <div className="divRadios">
                  <RadioGroup
                    name={"ativoInativo"}
                    options={statusOptions}
                    defaultValue={"ativo"}
                    onChange={(selectedValue) =>
                      setNewEmployeeStatus(selectedValue)
                    }
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="errorsOrSuccess">
            <p style={{ color: "red" }}>{Error && Error}</p>
            <p style={{ color: "green" }}>{Success && Success}</p>
          </div>
          <div className="divButtons">
            <button
              type="submit"
              className="primaryNormal"
              onClick={handleSubmit}
            >
              Salvar
            </button>
            <button
              type="reset"
              className="primaryLight"
              onClick={() => handleReset()}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormNewEmployee;
