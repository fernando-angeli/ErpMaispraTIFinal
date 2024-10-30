import { useState, useEffect } from "react";
import "./FormNewEmployee.css";
import { CgAdd, CgRemove } from "react-icons/cg";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import Viacep from "../../Viacep/Viacep";
import InputField from "../../InputField/InputField";
import SelectField from "../../SelectField/SelectField";
import RadioGroup from "../../RadioGroup/RadioGroup";

function FormNewEmployee(dataEmployee) {
  const [ResponsiveEmployee, setResponsiveEmployee] = useState(true);
  const [PostToUpdate, SetPostToUpdade] = useState(true);

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
  const [newEmployeeStatus, setNewEmployeeStatus] = useState("active");

  const [newEmployeeIE, setNewEmployeeIE] = useState("134");
  const [UpdateEmployeeId, setUpdateEmployeeId] = useState();

  const [Error, setError] = useState();
  const [Success, setSuccess] = useState();

  const { JwtToken } = useAuth();

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
    e.target.className = "isInvalid";
  };

  const isValid = (e) => {
    if (e.target.value && e.target.className.indexOf("isInvalid") != -1) {
      console.log(e.target.className);
      e.target.classList.remove("isInvalid");
    }
  };

  const CheckEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailRegex.test(email)) {
      setError(null);
    } else {
      setError("Formato de Email Inválido!");
      return;
    }
  };

  const CheckTelephone = (phone) => {
    const phoneRegex =
      /^\(?\+?(\d{1,3})?\)?[-.\s]?(\d{2})[-.\s]?(\d{4,5})[-.\s]?(\d{4})$/;
    if (phoneRegex.test(phone)) {
      setError(null);
    } else {
      setError("Formato de Telefone Inválido!");
      return;
    }
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
    setNewEmployeeBirthDate("");
    setNewEmployeeRole("");
    setNewEmployeeIE("");
    SetPostToUpdade(true);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newEmployeeData = {
      fullName: newEmployeeName,
      gender: "NAO INFORMADO",
      cpf: newEmployeeCPF,
      rgIe: newEmployeeIE,
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

  const SetValuestoUpdate = (values) => {
    setUpdateEmployeeId(values.id);
    setNewEmployeeName(values.fullName);
    setNewEmployeeEmail(values.email);
    setNewEmployeeIE(values.rgIe);
    setNewEmployeeAddress(values.address);
    setNewEmployeeDistrict(values.district);
    setNewEmployeePhone(values.phoneNumber);
    setNewEmployeeCPF(values.cpfCnpj);
    setNewEmployeeAddressNumber(values.number);
    setNewEmployeeCEP(values.zipCode.replace(/\D/g, ""));
    setNewEmployeeCity(values.city);
    setNewEmployeeBirthDate(values.birthDate);
    setNewEmployeeState(values.state);

    setNewEmployeeStatus(values.status);
    document.getElementById(values.status).checked = true;
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const newEmployeeData = {
      fullName: newEmployeeName,
      gender: "NAO INFORMADO",
      cpf: newEmployeeCPF,
      stateRegistration: newEmployeeIE,
      phoneNumber: newEmployeePhone,
      email: newEmployeeEmail,
      address: newEmployeeAddress,
      number: newEmployeeAddressNumber,
      district: newEmployeeDistrict,
      zipCode: newEmployeeCEP,
      city: newEmployeeCity,
      state: newEmployeeState,
      country: "Brasil",
      birthDate: newEmployeeBirthDate,
      creditLimit: 100.0,
      status: newEmployeeStatus,
    };
    const TelephoneRegex =
      /^\(?\+?(\d{1,3})?\)?[-.\s]?(\d{2})[-.\s]?(\d{4,5})[-.\s]?(\d{4})$/;
    if (TelephoneRegex.test(newEmployeeData.phoneNumber)) {
      setError(null);
    } else {
      setError("Formato de Telefone Inválido!");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/usuarios/${UpdateEmployeeId}`,
        newEmployeeData,
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      handleReset();
      setSuccess("Usuario Atualizado com sucesso!");
      window.location.reload();
      setError(null);
      SetPostToUpdade(true);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(`${err.response.data.message}`);
      } else {
        setError("Erro ao atualizar usuário! Tente novamente.");
        setSuccess(null);
      }
    }
  };

  useEffect(() => {
    if (dataEmployee.dataEmployee) {
      SetValuestoUpdate(dataEmployee.dataEmployee);
      SetPostToUpdade(false);
    }
  }, [dataEmployee]);

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
              CheckEmail(newClientEmail);
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
              CheckTelephone(newEmployeePhone);
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
            value={newEmployeeAddressNumber}
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

          <InputField
            label={"Cidade:"}
            name={"cidade"}
            placeholder={"Digite a cidade do usuário"}
            idInput={"newEmployeeCity"}
            classNameDiv={"divSelectCity"}
            value={newEmployeeCity}
            onInvalid={(e) => isInvalid(e)}
            onChange={(e) => {
              setNewEmployeeCity(e.target.value);
              selectIsValid(e);
            }}
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
