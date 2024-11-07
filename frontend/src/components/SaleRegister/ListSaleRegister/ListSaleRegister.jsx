import { BiSolidUser } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { CgAdd, CgRemove } from "react-icons/cg";
import ModalYesOrNot from "../../ModalYesOrNot/ModalYesOrNot.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext.jsx";
import "./ListSaleRegister.css";
import FormNewSaleRegister from "../FormNewSaleRegister/FormNewSaleRegister.jsx";
import NavigationListSaleRegister from "./NavigationListSaleRegister.jsx";
import PageOfListSaleRegister from "./PageOfListSaleRegister.jsx";
import LoadingSpin from "../../LoadingSpin/LoadingSpin.jsx";
const ListSaleRegisters = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { JwtToken } = useAuth();
  const [saleRegisters, setSaleRegisters] = useState([]);
  const [saleRegisterUpdate, setSaleRegisterUpdate] = useState(null);
  const [showActive, setShowActive] = useState(true);
  const [showInactive, setShowInactive] = useState(true);
  const [searchSaleRegister, setSearchSaleRegister] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saleRegisterNameShow, setSaleRegisterNameShow] = useState("");
  
  const [listSaleRegistersPageSelected, setListSaleRegistersPage] = useState(1);

  const handleShowSaleRegisters = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/saleRegisters`, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
        },
      });
      setSaleRegisters(response.data.content);
    } catch (err) {
      console.log(err);
      alert("Erro ao puxar registros de venda!");
    }
  };

  useEffect(() => {
    handleShowSaleRegisters();
  }, []);

  const deleteSaleRegister = async (saleRegister) => {
    setSaleRegisterNameShow(saleRegister.fullName);
    const confirmDelete = await new Promise((resolve) => {
      setShowModal(true);
      const handleConfirm = (choice) => {
        setShowModal(false);
        resolve(choice);
      };
      window.handleModalConfirm = handleConfirm;
    });
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      await axios.delete(`${apiUrl}/api/saleRegisters/${saleRegister.id}`, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
        },
      });
      setIsLoading(false);
      handleShowSaleRegisters();
    } catch (err) {
      setIsLoading(false);
      alert("Erro ao deletar registro de venda");
    }
  };

  const ToFormUpdateSaleRegister = (data) => {
    setSaleRegisterUpdate(data);
  };

  const filteredSaleRegisters = saleRegisters.filter((saleRegister) => {
    const matchesStatus = 
      (showActive && saleRegister.status === "ativo") ||
      (showInactive && saleRegister.status === "inativo");
    const matchesSearch = saleRegister.fullName.toLowerCase().includes(searchSaleRegister.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const maxSaleRegistersPerList = 6;
  const totalPages = Math.ceil(filteredSaleRegisters.length / maxSaleRegistersPerList);

  return (
    <>
    
      {isLoading && <LoadingSpin />}
      <FormNewSaleRegister dataSaleRegister={saleRegisterUpdate} /> 
    
      <div className="contentListSaleRegisters">
        <div className="ListSaleRegisters">
          <div className="headerListSaleRegisters">
            <div className="title">
              <BiSolidUser className="userIcon" size={75} />
              <h3>Lista de Registros de Venda</h3>
            </div>
            <section>
              <label className="searchSaleRegister">
                <input 
                  type="text" 
                  placeholder="Buscar registro de venda..." 
                  required 
                  onChange={(e) => setSearchSaleRegister(e.target.value)} 
                />
                <a>
                  <BiSearch size={35} />
                </a>
              </label>
              <div className="divCheckboxes">
                <label htmlFor="active" className="labelCheckbox">
                  <input
                    type="checkbox"
                    name="active/inactive"
                    id="active"
                    className="inputCheckbox"
                    onClick={() => setShowActive(!showActive)}
                    defaultChecked
                  />
                  <label className="text" htmlFor="active">
                    Ativos
                  </label>
                </label>
                <label htmlFor="inactive" className="labelCheckbox">
                  <input
                    type="checkbox"
                    name="active/inactive"
                    id="inactive"
                    className="inputCheckbox"
                    onClick={() => setShowInactive(!showInactive)}
                    defaultChecked
                  />
                  <label className="text" htmlFor="inactive">
                    Inativos
                  </label>
                </label>
              </div>
            </section>
          </div>
          <hr />
          <div className="ListSaleRegistersTable">
            <table>
              <thead>
                <tr>
                  <th>N. Venda</th>
                  <th>Cliente</th>
                  <th>Status</th>
                  <th>Data/Prevista</th>
                  <th>Data/Entrega</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <ModalYesOrNot
                  show={showModal}
                  onClose={() => setShowModal(false)}
                  title="Deletar Registro de Venda?"
                >
                  <h6>Confirma Exclusão de {saleRegisterNameShow}?</h6>
                  <button onClick={() => window.handleModalConfirm(true)}>Sim</button>
                  <button onClick={() => window.handleModalConfirm(false)}>Não</button>
                </ModalYesOrNot>
                <PageOfListSaleRegister 
                  saleRegisters={filteredSaleRegisters} 
                  onEdit={ToFormUpdateSaleRegister} 
                  onDelete={deleteSaleRegister} 
                  maxSaleRegistersPerList={maxSaleRegistersPerList} 
                  listSaleRegistersPageSelected={listSaleRegistersPageSelected}
                />
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <NavigationListSaleRegister 
              totalPages={totalPages} 
              setListSaleRegistersPage={setListSaleRegistersPage} 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListSaleRegisters;
