import { BiEdit, BiAt, BiPhone, BiFileBlank } from "react-icons/bi";

import { MdDeleteOutline } from "react-icons/md";
import ModalDetails from "../ModalSupplier/ModalSupplier";
import { BiDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
function PageOfListSuppliers({
  suppliers,
  onEdit,
  onDelete,
  maxSuppliersPerList,
  listSuppliersPageSelected,
  onlyView
}) {
  const [showModalDetails, setshowModalDetails] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  let suppliersToList = [];

  for (
    let i = (listSuppliersPageSelected - 1) * maxSuppliersPerList;
    i < listSuppliersPageSelected * maxSuppliersPerList;
    i++
  ) {
    if (suppliers[i]) {
      suppliersToList.push(suppliers[i]);
    }
  }

  return (
    <>
      <ModalDetails
        show={showModalDetails}
        onClose={() => setshowModalDetails(false)}
        content={selectedSupplier}
        title="Detalhes Fornecedor"
      ></ModalDetails>

      {suppliersToList.map((supplier) => (
        <tr key={supplier.id}>
          <td className="td-fullName">{supplier.fullName}</td>
          <td className="td-email">
            <BiAt className="td-icon" size={16} />
            {supplier.email}
          </td>
          <td className="td-phoneNumber">
            <BiPhone className="td-icon" size={16} />
            {supplier.phoneNumber}
          </td>
          <td className="td-cpfCnpj">
            <BiFileBlank className="td-icon-2" size={16} />
            {supplier.cpfCnpj}
          </td>
            {onlyView ? "" : (
              
              <td className="td-editLine">
                <Link
                  onClick={() => {
                    setSelectedSupplier(supplier);
                    setshowModalDetails(true);
                  }}
                >
                  <BiDetail className="editLine" size={30} />
                </Link>
                <a href="#" onClick={() => onEdit(supplier)}>
                  <BiEdit className="editLine" size={30} />
                </a>
                <Link onClick={() => onDelete(supplier)}>
                  <MdDeleteOutline className="deleteLine" size={30} />
                </Link>
              </td>   
            )}
        </tr>
      ))}
    </>
  );
}
export default PageOfListSuppliers;
