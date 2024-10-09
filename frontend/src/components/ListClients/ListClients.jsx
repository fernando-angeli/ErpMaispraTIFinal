import { BiSolidUser } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios'
import { useEffect, useState } from "react"; 
import { useAuth } from '../AuthContext.jsx';
import './ListClients.css'


const ListClients = () => {

const { JwtToken } = useAuth();
const [clients, setClients] = useState();

  const handleShowClients = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/clientes`, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
        }
      });
      setClients(response.data.content)

    } catch (err) {
      console.log(err)
      alert('Erro ao puxar clientes!')
    }
  };

  useEffect(()=>{
    handleShowClients();
  },[clients])

      const deleteClient = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:8080/clientes/${id}`, {
            headers: {
              Authorization: `Bearer ${JwtToken}`,
            }
          });
          alert('Cliente id'+id+' Deletado!')

        } catch (err) {
          console.log(err)
          alert('Erro ao deletar')
        }
      };
  
  return (
    <div className='contentListClients'>
       <div className='ListClients'>
        <div className='header'>
          <h3><BiSolidUser size={75}/>Lista de Clientes</h3>
            <section>
                <label className="searchClient">
                    <input type='text' placeholder='Buscar cliente...' required />
                    <a><BiSearch size={35}/></a>
                </label>
                    <label className="checkbox">
                        <input type='checkbox' name='active' /> Ativo
                        <input type='checkbox' name='inactive' /> Inativo
                    </label>
            </section>
        </div>
        <hr />

        <div className='ListClientsTable'>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>CPF/CNPJ</th>
                </tr>
            </thead>

           <tbody>
            {clients && clients.map((client) => (
              <tr key={client.id}>
                <td>{client.fullName}</td>
                <td>{client.email}</td>
                <td>{client.phoneNumber}</td>
                <td>
                  {client.cpfCnpj}
                  <a href="#">
                    <BiEdit size={30} />
                  </a>
                  <a href="#" onClick={()=>deleteClient(client.id)}>
                    <MdDeleteOutline size={30} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
                <div className="pagination">
                        <a href="#">❮</a>
                        <a href="#" class="active">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">❯</a>
                  </div>
      </div>
    </div>
  );
};

export default ListClients;

