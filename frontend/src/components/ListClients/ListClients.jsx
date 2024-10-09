import { BiSolidUser } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios'

import './ListClients.css'
import { useEffect } from "react";
const ListClients = () => {

  const handleShowClients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/clientes');      
      console.log(response.data)
    } catch (err) {
      console.log(response.data)
    }
  };
  useEffect(()=>{
    handleShowClients();
  })

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
                <tr>
                    <td>Fulano Blablabla blablabla</td>
                    <td>loremIpsum@email.com</td>
                    <td>00 0000-0000</td>
                    <td>00000000000-00<a>
                      <BiEdit size={30}/></a>
                      <a><MdDeleteOutline size={30}/></a>
                      </td> 
                </tr>
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

