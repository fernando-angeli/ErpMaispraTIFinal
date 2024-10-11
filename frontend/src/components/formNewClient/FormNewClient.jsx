import { useState } from 'react'
import './formNewClient.css'
import { CgAdd } from "react-icons/cg";
import { CgRemove } from "react-icons/cg";
import axios from 'axios';
import { useAuth } from '../AuthContext';
import Viacep from '../Viacep/Viacep'
function FormNewClient() {
    const [ResponsiveCliente, setResponsiveCliente] = useState(true)
    const [CPForCNPJ, setOption] = useState("cpf")

    const [newClientName, setNewClientName] = useState("")
    const [newClientEmail, setNewClientEmail] = useState("")
    const [newClientAddress, setNewClientAddress] = useState("")
    const [newClientPhone, setNewClientPhone] = useState("")
    const [newClientCPForCNPJ, setNewClientCPForCNPJ] = useState("")
    const [newClientAddressNumber, setNewClientAddressNumber] = useState("")
    const [newClientDistrict, setNewClientDistrict] = useState("")
    const [newClientCity, setNewClientCity] = useState("")
    const [newClientCEP, setNewClientCEP] = useState("")

    let cityList = [
        {id: 1, city: newClientCity},
    ]

    const getCep = async (cep)  =>  {
        const adress = await Viacep(cep)
        setNewClientCity(adress.cidade)
        setNewClientAddress(adress.logradouro)
        setNewClientDistrict(adress.bairro)
    }

    const isInvalid = (e) => {
        e.target.className = "isInvalid inputText"
    }

    const isValid = (e) => {
        if (e.target.value && e.target.className != "inputText") {
            e.target.className = "inputText"
        }
    }
    const selectIsValid = (e) => {
        if (e.target.value && e.target.className != "selectCity") {
            e.target.className = "selectCity"
        }
    }
    const selectIsInvalid = (e) => {
        e.target.className = "isInvalid selectCity"
    }

    const handleReset = () => { 
        let form = document.getElementById("formNewClient")
        let elements = form.getElementsByClassName("isInvalid")
        
        while(elements.length > 0) {
            elements = form.getElementsByClassName("isInvalid")
            elements[0].classList.remove("isInvalid")
        }

        setNewClientName("")
        setNewClientEmail("")
        setNewClientAddress("")
        setNewClientPhone("")
        setNewClientCPForCNPJ("")
        setNewClientAddressNumber("")
        setNewClientDistrict("")
        setNewClientCity("")
        setNewClientCEP("")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(CPForCNPJ =='cpf'){
                setOption('PF')
            }else if(CPForCNPJ =='cpf'){
                setOption('PJ')
            }

        try {
            const { JwtToken } = useAuth(); 
            const newClientData = {
              fullName: newClientName,
              typePfOrPj: CPForCNPJ, 
              gender: "MASC", 
              cpfCnpj: newClientCPForCNPJ,
              rgIe: "RG12345",
              phoneNumber: newClientPhone,
              email: newClientEmail,
              address: newClientAddress,
              number: "123",
              district: "Centro",
              zipCode: "95.650-000",
              city: "Cachoeirinha",
              state: "RS",
              country: "Brasil",
              birthDate: "1990-01-01", 
              creditLimit: 10000.00, 
              notes: "Cliente VIP",
              status: "ativo",
            };
        
            const response = await axios.post(`http://localhost:8080/clientes`, newClientData, {
              headers: {
                Authorization: `Bearer ${JwtToken}`,
                'Content-Type': 'application/json',
              }
            });
            setNewClientName("")
            setNewClientEmail("")
            setNewClientAddress("")
            setNewClientPhone("")
            setNewClientCPForCNPJ("")
            setNewClientAddressNumber("")
            setNewClientDistrict("")
            setNewClientCity("")
            setNewClientCEP("")
            alert('Cliente adicionado com sucesso!');
          } catch (err) {
            console.error(err);
            alert('Erro ao adicionar cliente!');
          }
      
    } // fazendo

    const resposiveClienteShow = () => {
        setResponsiveCliente(!ResponsiveCliente);
    };

    return (
        <div className='containerForm'>
            <h2 className='tabTitle'>Adicionar Cliente 
            <a  className="hide-desktop" onClick={resposiveClienteShow}> {!ResponsiveCliente ? <CgAdd size={45}/> : <CgRemove size={45}/> }</a>
                </h2>
            <form className={ResponsiveCliente ? 'visibleformNewClient' : 'hiddenformNewClient'}  id='formNewClient' onSubmit={handleSubmit} onReset={handleReset} >

                <label htmlFor="newClientName" className='inputLabel' id='labelNewClientName'>
                    <span className='inputDescription'>Nome:</span> 
                    <input type="text" placeholder='Digite o nome do cliente' className='inputText' name='nome' id='newClientName' value={newClientName} required onInvalid={(e) => isInvalid(e)} onChange={(e) => {
                        setNewClientName(e.target.value)
                        isValid(e)
                        }}/>
                </label>

                <label htmlFor="newClientEmail" className='inputLabel' id='labelNewClientEmail'>
                    <span className='inputDescription'>E-mail:</span> 
                    <input type="email" placeholder='Digite o e-mail do cliente' className='inputText' name='email' id='newClientEmail' value={newClientEmail} required onInvalid={(e) => isInvalid(e)} onChange={(e) => {
                        setNewClientEmail(e.target.value)
                        isValid(e)
                        }}/>
                </label>

                <label htmlFor="newClientPhone" className='inputLabel' id='labelNewClientPhone'>
                    <span className='inputDescription'>Telefone:</span> 
                    <input type="tel" placeholder='Digite o telefone do cliente' className='inputText' name='telefone' id='newClientPhone' value={newClientPhone} required onInvalid={(e) => isInvalid(e)} onChange={(e) => {
                        setNewClientPhone(e.target.value)
                        isValid(e)
                        }}/>
                </label>

                <label htmlFor="newClientCPForCNPJ" className='inputLabel' id='labelNewClientCPF/CNPJ'>
                    <div className='radiosCPForCNPJ'>
                        <label htmlFor="cpf" className='labelRadiosCpfCnpj'>
                            <input type="radio" value={0}  name="cpfCnpj" id="cpf" className='inputRadioCpfCnpj'
                            onClick={() => setOption("cpf")} defaultChecked/>
                            <label className='text labelRadio' htmlFor='cpf'>CPF</label>
                        </label>
                        <label htmlFor="cnpj" className='labelRadiosCpfCnpj'>
                            <input type="radio" value={0} name="cpfCnpj" id="cnpj" className='inputRadioCpfCnpj' onClick={() => setOption("cnpj")}/>
                            <label className='text labelRadio' htmlFor='cnpj'>CNPJ</label>
                        </label>

                    </div> 
                    <input type="text" placeholder='Digite o CPF/CNPJ do cliente' className='inputText' name='cpf/cnpj' id='newClientCPForCNPJ' value={newClientCPForCNPJ} required onInvalid={(e) => isInvalid(e)} onChange={(e) => {
                        setNewClientCPForCNPJ(e.target.value)
                        isValid(e)
                        }}/>
                </label>

                <div className='line'>
                    <label htmlFor="newClientAddress" className='inputLabel' id='labelNewClientAddress'>
                        <span className='inputDescription'>Logradouro:</span> 
                        <input type="text" placeholder='Digite o endereço do cliente' className='inputText' name='logradouro' id='newClientAddress' value={newClientAddress} required onInvalid={(e) => isInvalid(e)} onChange={(e) => {
                            setNewClientAddress(e.target.value)
                            isValid(e)
                            }}/>
                    </label>

                    <label htmlFor="newClientAddressNumber" className='inputLabel' id='labelNewClientAddressNumber'>
                        <span className='inputDescription'>Número:</span> 
                        <input type="text" placeholder='0000' className='inputText' name='numero' id='newClientAddressNumber' value={newClientAddressNumber} required onInvalid={(e) => isInvalid(e)} onChange={(e) => {
                            setNewClientAddressNumber(e.target.value)
                            isValid(e)
                            }}/>
                    </label>
                </div>

                <div className='line'>
                    <label htmlFor="newClientDistrict" className='inputLabel' id='labelNewClientDistrict'>
                        <span className='inputDescription'>Bairro:</span> 
                        <input type="text" placeholder='Digite o bairro do cliente' className='inputText' name='bairro' id='newClientDistrict' value={newClientDistrict} required onInvalid={(e) => isInvalid(e)} onChange={(e) => {
                            setNewClientDistrict(e.target.value)
                            isValid(e)
                            }}/>
                    </label>

                    <label htmlFor="newClientCity" className='inputLabel' id='labelNewClientCity'>
                        <span className='inputDescription'>Cidade:</span> 
                        <select name="cidade" id="newClientCity" placeholder='Selecione a cidade' value={newClientCity} className='selectCity' onInvalid={(e) => selectIsInvalid(e)} required onChange={(e) => {
                            setNewClientCity(e.target.value)
                            selectIsValid(e)
                            }}>
                            <option value="" selected hidden>Selecione...</option>
                            {cityList.map((item, index) => (
                                <option value={item.city}>{item.city}</option>
                            ))}
                        </select>
                    </label>
                            
                    <label htmlFor="newClientCEP" className='inputLabel' id='labelNewClientCEP'>
                        <span className='inputDescription'>CEP:</span> 
                        <input type="text" placeholder='00000-000' className='inputText' name='CEP' id='newClientCEP' value={newClientCEP} required onInvalid={(e) => isInvalid(e)} onBeforeInput={getCep(newClientCEP)} onChange={(e) => {
                            setNewClientCEP(e.target.value)
                            isValid(e)
                            }}/>
                    </label>
                </div>



                <div className="divButtons">
                    <button type="submit" className='primaryNormal'>Salvar</button>
                    <button type="reset" className='primaryLight' onClick={()=>handleReset()}>Cancelar</button>
                </div>

            </form>
        </div>
    )
}
export default FormNewClient