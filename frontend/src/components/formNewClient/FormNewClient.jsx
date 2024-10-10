import { useState } from 'react'
import './formNewClient.css'
import { CgAdd } from "react-icons/cg";
import { CgRemove } from "react-icons/cg";
function FormNewClient() {
    const [ResponsiveCliente, setResponsiveCliente] = useState(true)
    const [CPForCNPJ, setOption] = useState("cpf")
    const [newClientName, setNewClientName] = useState("")
    const [newClientEmail, setNewClientEmail] = useState("")
    const [newClientAddress, setNewClientAddress] = useState("")
    const [newClientPhone, setNewClientPhone] = useState("")
    const [newClientCPForCNPJ, setNewClientCPForCNPJ] = useState("")

    const isInvalid = (e) => {
        e.target.className = "isInvalid inputText"
    }

    const isValid = (e) => {
        if (e.target.value && e.target.className != "inputText") {
            e.target.className = "inputText"
        }
    }

    const handleReset = () => { // TALVEZ DE PARA OTIMIZAR
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
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log(newClientName)
        console.log(newClientEmail)
        console.log(newClientAddress)
        console.log(newClientPhone)
        console.log(CPForCNPJ)
        console.log(newClientCPForCNPJ)

        setNewClientName("")
        setNewClientEmail("")
        setNewClientAddress("")
        setNewClientPhone("")
        setNewClientCPForCNPJ("")
    }

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

                <label htmlFor="newClientAddress" className='inputLabel' id='labelNewClientAddress'>
                    <span className='inputDescription'>Endereço:</span> 
                    <input type="text" placeholder='Digite o endereço do cliente' className='inputText' name='endereco' id='newClientAddress' value={newClientAddress} required onInvalid={(e) => isInvalid(e)} onChange={(e) => {
                        setNewClientAddress(e.target.value)
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

                <div className="divButtons">
                    <button type="submit" className='primaryNormal'>Salvar</button>
                    <button type="reset" className='primaryLight'>Cancelar</button>
                </div>

            </form>
        </div>
    )
}
export default FormNewClient