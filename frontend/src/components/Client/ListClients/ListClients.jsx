import { BiSolidUser } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { CgAdd, CgRemove } from "react-icons/cg";
import ModalYesOrNot from "../../ModalYesOrNot/ModalYesOrNot.jsx"
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext.jsx";
import "./ListClients.css";
import FormNewClient from '../FormNewClient/FormNewClient.jsx'
import NavigationListClients from "./navigationListClients.jsx";
import PageOfListClients from "./PageOfListClients.jsx";
import LoadingSpin from "../../LoadingSpin/LoadingSpin.jsx";


const ListClients = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { JwtToken } = useAuth();
  const [clients, setClients] = useState();
  const [clientUpdate, setClientsUpdate] = useState(null);
  const [showAtivos, setShowAtivos] = useState(true);
  const [showInativos, setShowInativos] = useState(true);
  const [searchClients, setsearchClients] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ClienteNameShow, setClienteNameShow] = useState();
  const [ResponsiveCliente, setResponsiveCliente] = useState(true);
  const [listClientsPageSelected, setListClientsPage] = useState(1)
  const resposiveClienteShow = () => {
    setResponsiveCliente(!ResponsiveCliente);
  };

  const handleShowClients = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/clientes`, {
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
  
  const deleteClient = async (client) => {
    
    setClienteNameShow(client.fullName);
    const confirmDelete = await new Promise((resolve) => {
      setShowModal(true);
      const handleConfirm = (choice) => {
        setShowModal(false);
        resolve(choice);
      };
      window.handleModalConfirm = handleConfirm;
    });
    if (!confirmDelete) {
      return;
    }
    setIsLoading(true)
    try {
      await axios.delete(`${apiUrl}/api/clientes/${client.id}`, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
        },
      });
      setIsLoading(false)
      handleShowClients();
    } catch (err) {
      setIsLoading(false)
      alert("Erro ao deletar");
    }
  };
  
  
  const ToFormUpdateClient = (data) => {
    setClientsUpdate(data)
  };
  
  const filteredClients = clients?.filter((client) => {
    const matchesStatus = (showAtivos && client.status === "ativo")
    || (showInativos && client.status === "inativo"); // se ambos forem true e ativo ou inativo, ele filtra de acorco com o check
    const matchesSearch = client.fullName.toLowerCase().includes(searchClients.toLowerCase()); // Filtro por nome, ele busca por nome e acresenta o filtro
    return matchesStatus && matchesSearch;
  }) || [];
  
  const maxClientsPerList = 6
  let contClientPages = Math.ceil(filteredClients.length / maxClientsPerList)
  
  
  
  
  // estou chamando form cliente dentro de list pra poder jogar os dados nele pra update!!!!
  return (
    
    <>
      {isLoading && <LoadingSpin />}
      <FormNewClient dataClient={clientUpdate} />
      <div className="contentListClients">
        <div className="ListClients">
          <div className="headerListClients">
            <div className="title">
              <BiSolidUser className="userIcon" size={75} />
              <h3>Lista de Clientes  </h3>
            </div >
            <section >
              <label className="searchClient">
                <input type="text" placeholder="Buscar cliente..." required onChange={(e) => setsearchClients(e.target.value)} />
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
                    onClick={() => setShowAtivos(!showAtivos)}
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
                    onClick={() => setShowInativos(!showInativos)}
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
                  <th className="formatH4">Nome</th>
                  <th className="formatH4">E-mail</th>
                  <th className="formatH4">Telefone</th>
                  <th className="formatH4">CPF/CNPJ</th>
                  <th className="formatH4"></th>
                </tr>
              </thead>

              <tbody>

                <ModalYesOrNot
                  show={showModal}
                  onClose={() => setShowModal(false)}
                  title="Deletar Cliente?">
                  <h6>Confirma Exclusão de {ClienteNameShow && ClienteNameShow}?</h6>
                  <button onClick={() => window.handleModalConfirm(true)}>Sim</button>
                  <button onClick={() => window.handleModalConfirm(false)}>Não</button>
                </ModalYesOrNot>

                <PageOfListClients 
                clients={filteredClients} 
                onEdit={ToFormUpdateClient} 
                onDelete={deleteClient} 
                maxClientsPerList={maxClientsPerList} 
                listClientsPageSelected={listClientsPageSelected}/>

              </tbody>

            </table>
          </div>
          <div className="pagination">
            <NavigationListClients contClientPages={contClientPages} setListClientsPage={setListClientsPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListClients;
