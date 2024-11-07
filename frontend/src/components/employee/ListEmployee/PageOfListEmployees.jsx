import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

function PageOfListEmployees({
  employees,
  onEdit,
  onDelete,
  maxEmployeesPerList,
  listEmployeesPageSelected,
}) {
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
      {employeesToList.map((employee) => (
        <tr key={employee.id}>
          <td>{employee.fullName}</td>
          <td>{employee.email}</td>
          <td>{employee.phoneNumber}</td>
          <td>{employee.cpf}</td>
          <td>
            <a href="#" onClick={() => onEdit(employee)}>
              <BiEdit className="editLine" size={30} />
            </a>
            <a href="#" onClick={() => onDelete(employee)}>
              <MdDeleteOutline className="deleteLine" size={30} />
            </a>
          </td>
        </tr>
      ))}
    </>
  );
}
export default PageOfListEmployees;
