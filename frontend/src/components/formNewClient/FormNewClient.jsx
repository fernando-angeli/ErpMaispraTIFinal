import { useState } from 'react'
import './formNewClient.css'

function FormNewClient() {
    const [CPForCNPJ, setOption] = useState("")
    

    return (
        <div className='containerForm'>
            <h2 className='tabTitle'>Adicionar Cliente</h2>
            <form className='formNewClient'>

                <label htmlFor="newClientName" className='inputLabel' id='labelNewClientName'>
                    <span className='inputDescription'>Nome:</span> 
                    <input type="text" placeholder='Digite o nome do cliente' className='inputText' name='nome' id='newClientName' required/>
                </label>

                <label htmlFor="newClientEmail" className='inputLabel' id='labelNewClientEmail'>
                    <span className='inputDescription'>E-mail:</span> 
                    <input type="text" placeholder='Digite o e-mail do cliente' className='inputText' name='email' id='newClientEmail' required/>
                </label>

                <label htmlFor="newClientAddress" className='inputLabel' id='labelNewClientAddress'>
                    <span className='inputDescription'>Endereço:</span> 
                    <input type="text" placeholder='Digite o endereço do cliente' className='inputText' name='endereco' id='newClientAddress' required/>
                </label>

                <label htmlFor="newClientPhone" className='inputLabel' id='labelNewClientPhone'>
                    <span className='inputDescription'>Telefone:</span> 
                    <input type="text" placeholder='Digite o telefone do cliente' className='inputText' name='telefone' id='newClientPhone' required/>
                </label>

                <label htmlFor="newClientCPForCNPJ" className='inputLabel' id='labelNewClientCPF/CNPJ'>
                    <div className='radiosCPForCNPJ'>
                        <label htmlFor="cpf" className='labelRadiosCpfCnpj'>
                            <input type="radio" value={0}  name="cpfCnpj" id="cpf" className='inputRadioCpfCnpj'
                            onChange={() => setOption("cpf")} checked/>
                            <label className='text labelRadio' htmlFor='cpf'>CPF</label>
                        </label>
                        <label htmlFor="cnpj" className='labelRadiosCpfCnpj'>
                            <input type="radio" value={0} name="cpfCnpj" id="cnpj" className='inputRadioCpfCnpj' onChange={() => setOption("cnpj")}/>
                            <label className='text labelRadio' htmlFor='cnpj'>CNPJ</label>
                        </label>

                    </div> 
                    <input type="text" placeholder='Digite o CPF/CNPJ do cliente' className='inputText' name='cpf/cnpj' id='newClientCPForCNPJ' required/>
                </label>
                
            </form>
        </div>
    )
}
export default FormNewClient