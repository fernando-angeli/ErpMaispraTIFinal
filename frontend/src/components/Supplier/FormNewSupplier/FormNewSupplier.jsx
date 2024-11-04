import { useState, useEffect } from "react";
import "./FormNewSupplier.css";
import { CgAdd, CgRemove } from "react-icons/cg";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import Viacep from "../../Viacep/Viacep";
import InputField from "../../InputField/InputField";
import RadioGroup from "../../RadioGroup/RadioGroup";
import TextareaField from "../../TextareaField/TextareaField";
import LoadingSpin from '../../LoadingSpin/LoadingSpin'

function FormNewSupplier(dataSupplier) {
  

  const [ResponsiveSupplier, setResponsiveSupplier] = useState(true);
  const [PostToUpdate, SetPostToUpdade] = useState(true)

  const [CPForCNPJ, setOption] = useState("cpf");
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSupplierEmail, setNewSupplierEmail] = useState("");
  const [newSupplierAddress, setNewSupplierAddress] = useState("");
  const [newSupplierPhone, setNewSupplierPhone] = useState("");
  const [newSupplierCPForCNPJ, setNewSupplierCPForCNPJ] = useState("");
  const [newSupplierAddressNumber, setNewSupplierAddressNumber] = useState("");
  const [newSupplierDistrict, setNewSupplierDistrict] = useState("");
  const [newSupplierCity, setNewSupplierCity] = useState("");
  const [newSupplierCEP, setNewSupplierCEP] = useState("");
  const [newSupplierState, setNewSupplierState] = useState("");
  const [newSupplierCountry, setNewSupplierCountry] = useState("");
  const [newSupplierNotes, setNewSupplierNotes] = useState("");
  const [newSupplierStatus, setNewSupplierStatus] = useState("ativo");

  const [newSupplierIE, setNewSupplierIE] = useState("");
  
  const [UpdateSupplierId, setUpdateSupplierId] = useState();
  const [Error, setError] = useState();
  const [Success, setSuccess] = useState();
  const [isLoading, setIsLoading] =  useState(false);

  const { JwtToken } = useAuth();

  const cityList = [{ id: 1, city: newSupplierCity }];
  const cityCountry = [{ id: 1, city: newSupplierCountry }];

  const cpfCnpjOptions = [
    { value: "cpf", label: "CPF" },
    { value: "cnpj", label: "CNPJ" },
  ];
  const statusOptions = [
    { value: "ativo", label: "Ativo" },
    { value: "inativo", label: "Inativo" },
  ];

  const getCep = async (cep) => {
    try {
      const adress = await Viacep(cep);
      setNewSupplierCity(adress.cidade);
      setNewSupplierAddress(adress.logradouro);
      setNewSupplierDistrict(adress.bairro);
      setNewSupplierState(adress.estado);
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      alert("CEP inválido ou não encontrado.");
    }
  };

  useEffect(() => {
    if (newSupplierCEP.length == 8) {
      getCep(newSupplierCEP);
    }
  }, [newSupplierCEP]);

  const isInvalid = (e) => {
    e.target.classList.add("isInvalid");
  };

  const isValid = (e) => {
    if (e.target.value && e.target.className.indexOf("isInvalid") != -1) {
      console.log(e.target.className)
      e.target.classList.remove("isInvalid");
    }
  };

  const CheckEmail = (email)=> {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailRegex.test(email)) {
      setError(null);
    } else {
      setError('Formato de Email Inválido!');
      return
    }
  }

  const CheckTelephone = (phone)=> {
    const phoneRegex = /^(\(?\d{2}\)?[\s-]?(\d{4,5})[\s-]?(\d{4})|\d{4,5}-\d{4})$/;
    if (phoneRegex.test(phone)) {
      setError(null);
    } else {
      setError('Formato de Telefone Inválido!');
    }
  }

  const CheckCpf = (cpf)=> {
  const cpfRegex = /^(?!.*(\d)(?:-?\1){10})\d{3}\.\d{3}\.\d{3}-\d{2}$|^(\d{11})$/;
  if (cpfRegex.test(cpf)) {
    setError(null);
  } else {
    setError('Formato de Telefone Inválido!');
    return
  }
  }

  const handleReset = () => {
    let form = document.getElementById("formNewSupplier");
    let elements = form.getElementsByClassName("isInvalid");

    while (elements.length > 0) {
      elements[0].classList.remove("isInvalid");
    }

    setNewSupplierName("");
    setNewSupplierEmail("");
    setNewSupplierAddress("");
    setNewSupplierPhone("");
    setNewSupplierCPForCNPJ("");
    setNewSupplierAddressNumber("");
    setNewSupplierDistrict("");
    setNewSupplierCity("");
    setNewSupplierCEP("");
    setNewSupplierState("");
    setNewSupplierBirthDate('');
    setNewSupplierNotes("")
    setNewSupplierIE("")
    SetPostToUpdade(true)
    setError(null)
    };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const newSupplierData = {
      fullName: newSupplierName,
      typePfOrPj: CPForCNPJ === "cpf" ? "PF" : "PJ",
      gender: "NAO INFORMADO",
      cpfCnpj: newSupplierCPForCNPJ,
      stateRegistration: newSupplierIE,
      phoneNumber: newSupplierPhone,
      email: newSupplierEmail,
      address: newSupplierAddress,
      number: newSupplierAddressNumber,
      district: newSupplierDistrict,
      zipCode: newSupplierCEP,
      city: newSupplierCity,
      state: newSupplierState,
      country: newSupplierCountry,
      creditLimit: 100.0,
      notes: newSupplierNotes,
      status: newSupplierStatus,
    };
  
    
    const cpfRegex = /^(?!.*(\d)(?:-?\1){10})\d{3}\.\d{3}\.\d{3}-\d{2}$|^(\d{11})$/;
    if(!document.getElementById("formNewSupplier").reportValidity()) {
      setError("Preencha todos os campos!")
      return 
    }
      setIsLoading(true)
      if (cpfRegex.test(newSupplierData.cpfCnpj)) {
        setError(null);
     
    if (cpfRegex.test(newSupplierData.cpfCnpj)) {
      setError(null);
    } else {
      setIsLoading(false) 
      setError('Formato de Cpf Invalido');
      return
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/fornecedores`,
        newSupplierData,
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      handleReset();
      setSuccess("Supplier adicionado com sucesso!");
      setIsLoading(false);
      window.location.reload;
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      if (err.response && err.response.data) {
        setIsLoading(false);
        setError(`${err.response.data.message}`);
      } else {
        setError('Erro desconhecido');
        setIsLoading(false) 
        return
      }
    }
      }
  }
  const handleUpdate = async (event) => {
    setIsLoading(true)

    event.preventDefault();
    const newSupplierData = {
      fullName: newSupplierName,
      typePfOrPj: CPForCNPJ === "cpf" ? "PF" : "PJ",
      gender: "NAO INFORMADO",
      cpfCnpj: newSupplierCPForCNPJ,
      stateRegistration: newSupplierIE,
      phoneNumber: newSupplierPhone,
      email: newSupplierEmail,
      address: newSupplierAddress,
      number: newSupplierAddressNumber,
      district: newSupplierDistrict,
      zipCode: newSupplierCEP,
      city: newSupplierCity,
      state: newSupplierState,
      country: newSupplierCountry,
      creditLimit: 100.0,
      notes: newSupplierNotes,
      status: newSupplierStatus,
    }
    ;

    const cpfRegex = /^(?!.*(\d)(?:-?\1){10})\d{3}\.\d{3}\.\d{3}-\d{2}$|^(\d{11})$/;
    if (cpfRegex.test(newSupplierData.cpfCnpj)) {
      setError(null);
    } else {
      setIsLoading(false)
      console.log('falso')
      setError('Formato de Cpf Invalido');
      return
    }
    try {
      const response = await axios.put(
        `http://localhost:8080/api/fornecedores/${UpdateSupplierId}`,
        newSupplierData,
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      handleReset();
      setSuccess("Suppliere Atualizado com sucesso!");
      setIsLoading(!isLoading)
      setError(null);
      SetPostToUpdade(true)
      window.location.reload()
    } catch (err) {
      setIsLoading(!isLoading);
      if (err.response && err.response.data) {
        setError(`${err.response.data.message}`);
      } else {
        setError("Erro ao atualizar fornecedor! Tente novamente.");
        setSuccess(null);
      }
    }finally {
      setIsLoading(false);
    }

  };
  const resposiveSuppliereShow = () => {
    setResponsiveSupplier(!ResponsiveSupplier);
  };
 const SetValuestoUpdate = (values) => {
   setUpdateSupplierId(values.id)
   setNewSupplierName(values.fullName);
   setNewSupplierEmail(values.email);
   setNewSupplierIE(values.stateRegistration)
   setNewSupplierAddress(values.address);
   setNewSupplierDistrict(values.district)
   setNewSupplierPhone(values.phoneNumber);
   setNewSupplierCPForCNPJ(values.cpfCnpj);
   setNewSupplierAddressNumber(values.number);
   setNewSupplierCEP(values.zipCode.replace(/\D/g, ''))
   setNewSupplierCity(values.city)
   setNewSupplierCity(values.country)
   setOption(values.typePfOrPj.toLowerCase());
   setNewSupplierState(values.state);
   setNewSupplierNotes(values.notes)
   
   setOption(values.typePfOrPj == "PF" ? "cpf" : "cnpj")
   setNewSupplierStatus(values.status)
   document.getElementById(values.typePfOrPj == "PF" ? "cpf" : "cnpj").checked = true;
   document.getElementById(values.status).checked = true;
   
  };



  useEffect(() => {
  if(dataSupplier.dataSupplier){
    SetValuestoUpdate(dataSupplier.dataSupplier);
    SetPostToUpdade(false)
  }
}, [dataSupplier]);


  return (
    <div className="containerForm">
      <h2 className="tabTitle">
        Adicionar Funcionario
        <a className="hide-desktop" onClick={resposiveSuppliereShow}>
          {" "}
          {!ResponsiveSupplier ? <CgAdd size={45} /> : <CgRemove size={45} />}
        </a>
      </h2>
      <form
        className={
          ResponsiveSupplier ? "visibleformNewSupplier" : "hiddenformNewSupplier"
        }
        id="formNewSupplier"
        onReset={handleReset}
        onSubmit={PostToUpdate ? handleSubmit :  handleUpdate}
      >
        <div className="line1 line">
          <InputField
            label={"Nome:"}
            placeholder={"Digite o nome do cliente"}
            name={"nome"}
            idInput={"newSupplierName"}
            classNameDiv="fieldName"
            value={newSupplierName}
            onChange={(e) => {
              setNewSupplierName(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
          <InputField
            label={"E-mail:"}
            placeholder={"Digite o e-mail do cliente"}
            name={"email"}
            idInput={"newSupplierEmail"}
            classNameDiv={"fieldEmail"}
            type={"email"}
            value={newSupplierEmail}
            onChange={(e) => {
              setNewSupplierEmail(e.target.value);
              isValid(e);
              CheckEmail(newSupplierEmail);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
        </div>
        <div className="line2 line">
          <InputField
            label={"Telefone:"}
            placeholder={"Digite o telefone do cliente"}
            name={"telefone"}
            idInput={"newSupplierPhone"}
            classNameDiv="fieldPhone"
            type={"tel"}
            value={newSupplierPhone}
            onChange={(e) => {
              setNewSupplierPhone(e.target.value);
              isValid(e);
              CheckTelephone(newSupplierPhone);
            }}
            onInvalid={(e) => isInvalid(e)}
          />

          <div className="divCpfOrCnpj">
            <RadioGroup
              name={"cpfCnpj"}
              options={cpfCnpjOptions}
              defaultValue={"cpf"}
              onChange={(selectedValue) => setOption(selectedValue)}
              clasnameDiv={"aaa"}
            />
      
            <InputField
              type={"text"}
              placeholder={"Digite o CPF/CNPJ do cliente"}
              name={"cpf/cnpj"}
              idInput={"newSupplierCPForCNPJ"}
              value={newSupplierCPForCNPJ}
              onInvalid={(e) => isInvalid(e)}
              onChange={(e) => {
                setNewSupplierCPForCNPJ(e.target.value);
                isValid(e);
                CheckCpf(e.target.value)
              }}
              label={""}
              classNameDiv="inputFieldNoLabel"
            />
          </div>
        </div>

        <div className="line3 line">
        <div className="divIE">
          <InputField
              type={"text"}
              placeholder={"Digite a Inscrição Estadual"}
              name={"Inscrição Estadual"}
              label={"Inscrição Estadual:"}
              idInput={"newSupplierIE"}
              value={newSupplierIE}
              onInvalid={(e) => isInvalid(e)}
              onChange={(e) => {
                setNewSupplierIE(e.target.value);
                isValid(e);
              }}
              classNameDiv="inputFieldNoLabel"
            /></div>
        <InputField
            label={"CEP:"}
            name={"CEP"}
            placeholder={"00000-000"}
            idInput={"newSupplierCEP"}
            classNameDiv={"fieldCep"}
            type={"text"}
            value={newSupplierCEP}
            onChange={(e) => {
              setNewSupplierCEP(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
          <div className="divStatusAndButtons">
            <div className="divStatus">
              <label
                htmlFor="newSupplierStatus"
                className="inputLabel"
                id="labelNewSupplierStatus"
              >
                <span className="inputDescription">Status:</span>
                <div className="divRadios">
                  <RadioGroup
                    name={"ativoInativo"}
                    options={statusOptions}
                    defaultValue={"ativo"}
                    onChange={(selectedValue) =>
                      setNewSupplierStatus(selectedValue)
                    }
                  />
                </div>
              </label>
            </div>

          </div>
          
        </div>

        <div className="line4 line">
        <InputField
            label={"Logradouro:"}
            name={"logradouro"}
            placeholder={"Digite o endereço do cliente"}
            idInput={"newSupplierAddress"}
            classNameDiv={"fieldAddress"}
            type={"text"}
            value={newSupplierAddress}
            onChange={(e) => {
              setNewSupplierAddress(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />

        <InputField
            label={"Número:"}
            name={"numero"}
            placeholder={"0000"}
            idInput={"newSupplierAddressNumber"}
            classNameDiv={"fieldAddressNumber"}
            type={"text"}
            value={newSupplierAddressNumber}
            onChange={(e) => {
              setNewSupplierAddressNumber(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
          <InputField
            label={"Bairro:"}
            name={"bairro"}
            placeholder={"Digite o bairro do cliente"}
            idInput={"newSupplierDistrict"}
            classNameDiv="fieldDistrict"
            type={"text"}
            value={newSupplierDistrict}
            onChange={(e) => {
              setNewSupplierDistrict(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />

          <InputField
            label={"Cidade:"}
            name={"cidade"}
            id={"newSupplierCity"}
            classNameDiv={"divSelectCity"}
            classNameSelect={"selectCity"}
            value={newSupplierCity}
            onInvalid={(e) => isInvalid(e)}
            onChange={(e) => {
              setNewSupplierCity(e.target.value);
              isValid(e);
            }}
            arrayOptions={cityList}
          />

<InputField
            label={"Pais:"}
            name={"pais"}
            id={"newSupplierCountry"}
            classNameDiv={"divSelectCountry"}
            classNameSelect={"selectCountry"}
            value={newSupplierCountry}
            onInvalid={(e) => isInvalid(e)}
            onChange={(e) => {
              setNewSupplierCountry(e.target.value);
              isValid(e);
            }}
            arrayOptions={cityCountry}
          />
        </div>

        <div className="line5 line">
          <TextareaField
            label={"Notas:"}
            name={"notas"}
            placeholder={"Digite notas sobre o cliente"}
            idInput={"newSupplierNotes"}
            classNameDiv={"fieldNotes"}
            value={newSupplierNotes}
            onChange={(e) => {
              setNewSupplierNotes(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
          
        </div>
      </form>
      <div className="errorsOrSuccess" style={{paddingTop:'1em'}}>
              <p style={{ color: "red" }}>{Error && Error}</p>
              <p style={{ color: "green" }}>{Success && Success}</p>
            </div>
            <div className="divButtons">
              <button
                type="submit"
                className="primaryNormal"
                onClick={PostToUpdate ? handleSubmit :  handleUpdate}
              >
                {PostToUpdate ? "Salvar" : "Atualizar"}
              </button>
              <button
                type="reset"
                className="primaryLight"
                onClick={() => handleReset()}
              >
                Cancelar
              </button>
            </div>
            
      {isLoading && <LoadingSpin/>}
    </div>
  );
}

export default FormNewSupplier
