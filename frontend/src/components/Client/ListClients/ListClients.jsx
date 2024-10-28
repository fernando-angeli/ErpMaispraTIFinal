import { BiSolidUser } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext.jsx";
import "./ListClients.css";
import FormNewClient from '../FormNewClient/FormNewClient.jsx'

const ListClients = () => {
  const { JwtToken } = useAuth();
  const [clients, setClients] = useState();
  const [clientUpdate, setClientsUpdate] = useState(null);
  const [ativos, setAtivos] = useState(true);
  const [inativos, setInativos] = useState(true);

  const handleShowClients = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/clientes`, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
        },
      });
      setClients(response.data.content);
    } catch (err) {
      console.log(err);
      alert("Erro ao puxar clientes!");
    }
  };

  useEffect(() => {
    handleShowClients();
  }, []);

  const deleteClient = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/clientes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );
      alert("Cliente id" + id + " Deletado!");
      handleShowClients();
    } catch (err) {
      console.log(err);
      alert("Erro ao deletar");
    }
  };

  const ToFormUpdateClient = (data) => {
    setClientsUpdate(data)
  };

// estou chamando form cliente dentro de list pra poder jogar os dados nele pra update!!!!
  return (
    
    <> 
    <FormNewClient dataClient={clientUpdate}/> 
    <div className="contentListClients">
      <div className="ListClients">
        <div className="headerListClients">
          <div className="title">
            <BiSolidUser className="userIcon" size={75} />
            <h3>Lista de Clientes</h3>
          </div>
          <section>
            <label className="searchClient">
              <input type="text" placeholder="Buscar cliente..." required />
              <a>
                <BiSearch size={35} />
              </a>
            </label>
            <div className="divRadios divCheckboxes">
              <label htmlFor="ativos" className="labelCheckbox">
                <input
                  type="checkbox"
                  value={0}
                  name="ativos/inativos"
                  id="ativos"
                  className="inputRadio inputCheckbox"
                  onClick={() => setAtivos(!ativos)}
                  defaultChecked
                />
                <label className="text labelRadio" htmlFor="ativos">
                  Ativos
                </label>
              </label>

              <label htmlFor="inativos" className="labelCheckbox">
                <input
                  type="checkbox"
                  value={0}
                  name="ativos/inativos"
                  id="inativos"
                  className="inputRadio inputCheckbox"
                  onClick={() => setInativos(!inativos)}
                  defaultChecked
                />
                <label className="text labelRadio" htmlFor="inativos">
                  Inativos
                </label>
              </label>
            </div>
          </section>
        </div>
        <hr />

        <div className="ListClientsTable">
          <table>
            <thead>
              <tr>
                <th className="formatH4 col1">Nome</th>
                <th className="formatH4 col2">E-mail</th>
                <th className="formatH4 col3">Telefone</th>
                <th className="formatH4 col4">CPF/CNPJ</th>
                <th className="formatH4 col5"></th>
              </tr>
            </thead>

            <tbody>
              {clients &&
                clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.fullName}</td>
                    <td>{client.email}</td>
                    <td>{client.phoneNumber}</td>
                    <td>{client.cpfCnpj}</td>
                    <td>
                      <a href="#" onClick={() => ToFormUpdateClient(client)}>
                        <BiEdit className="editLine" size={30} />
                      </a>
                      <a href="#" onClick={() => deleteClient(client.id)}>
                        <MdDeleteOutline className="deleteLine" size={30} />
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <a href="#">❮</a>
          <a href="#" className="active">
            1
          </a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">❯</a>
        </div>
      </div>
    </div>
    </>
  );
};

export default ListClients;
