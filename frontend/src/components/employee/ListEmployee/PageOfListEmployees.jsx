import { BiEdit, BiAt, BiPhone, BiFileBlank } from "react-icons/bi";

import { MdDeleteOutline } from "react-icons/md";
import ModalDetails from "../ModalEmployee/ModalEmployee";
import { BiDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
function PageOfListEmployees({
  employees,
  onEdit,
  onDelete,
  maxEmployeesPerList,
  listEmployeesPageSelected,
  onlyView
}) {
  const [showModalDetails, setshowModalDetails] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  let employeesToList = [];
  for (
    let i = (listEmployeesPageSelected - 1) * maxEmployeesPerList;
    i < listEmployeesPageSelected * maxEmployeesPerList;
    i++
  ) {
    if (employees[i]) {
      employeesToList.push(employees[i]);
    }
  }

  return (
    <>
      <ModalDetails
        show={showModalDetails}
        onClose={() => setshowModalDetails(false)}
        content={selectedEmployee}
        title="Detalhes Usuario"
      ></ModalDetails>

      {employeesToList.map((employee) => (
        <tr key={employee.id}>
          <td className="td-fullName">{employee.fullName}</td>
          <td className="td-email">
            <BiAt className="td-icon" size={16} />
            {employee.email}
          </td>
          <td className="td-phoneNumber">
            <BiPhone className="td-icon" size={16} />
            {employee.phoneNumber}
          </td>
          <td className="td-cpf">
            <BiFileBlank className="td-icon-2" size={16} />
            {employee.cpf}
          </td>
          <td className="td-editLine">
            <Link
              onClick={() => {
                setSelectedEmployee(employee);
                setshowModalDetails(true);
              }}
            >
              <BiDetail className="editLine" size={30} />
            </Link>

            {onlyView ? "" : (
              <>
                <a href="#" onClick={() => onEdit(employee)}>
                  <BiEdit className="editLine" size={30} />
                </a>
                <Link onClick={() => onDelete(employee)}>
                  <MdDeleteOutline className="deleteLine" size={30} />
                </Link>
              </>
            )}

          </td>
        </tr>
      ))}
    </>
  );
}
export default PageOfListEmployees;
