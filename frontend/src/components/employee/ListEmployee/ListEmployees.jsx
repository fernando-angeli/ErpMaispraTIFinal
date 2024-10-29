import { BiSolidUser } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext.jsx";
import "./ListEmployees.css";

const ListEmployees = () => {
  const { JwtToken } = useAuth();
  const [employees, setEmployees] = useState();
  const [ativos, setAtivos] = useState(true);
  const [inativos, setInativos] = useState(true);

  const handleShowEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/usuarios`, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
        },
      });
      setEmployees(response.data.content);
      console.log(employees)
    } catch (err) {
      console.log(err);
      alert("Erro ao puxar usuário!");
    }
  };

  useEffect(() => {
    handleShowEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
          },
        }
      );
      alert("Usuário id" + id + " Deletado!");
    } catch (err) {
      console.log(err);
      alert("Erro ao deletar");
    }
  };

  return (
    <div className="contentListEmployees">
      <div className="ListEmployees">
        <div className="headerListEmployees">
          <div className="title">
            <BiSolidUser className="userIcon" size={75} />
            <h3>Lista de Usuário</h3>
          </div>
          <section>
            <label className="searchEmployee">
              <input type="text" placeholder="Buscar usuário..." required />
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

        <div className="ListEmployeesTable">
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
              {employees &&
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.firstName+" "+employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.cpfCnpj}</td>
                    <td>
                      <a href="#">
                        <BiEdit className="editLine" size={30} />
                      </a>
                      <a href="#" onClick={() => deleteEmployee(employee.id)}>
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
  );
};

export default ListEmployees;
