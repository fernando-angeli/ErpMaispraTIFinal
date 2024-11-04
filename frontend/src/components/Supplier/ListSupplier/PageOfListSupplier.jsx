import { BiEdit, BiAt, BiPhone, BiFileBlank  } from "react-icons/bi";

import { MdDeleteOutline } from "react-icons/md";
import ModalDetails from "../../ModalDetails/ModalDetails"
import { BiDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
function PageOfListSuppliers({
  suppliers,
  onEdit,
  onDelete,
  maxSuppliersPerList,
  listSuppliersPageSelected,
}) {

  const [showModalDetails, setshowModalDetails] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState('');

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
        title="Detalhes Suppliere">
      </ModalDetails>


      {suppliersToList.map((client) => (
        <tr key={client.id}>
          <td className="td-fullName">{client.fullName}</td>
          <td className="td-email"><BiAt className="td-icon" size={16}/>{client.email}</td>
          <td className="td-phoneNumber"><BiPhone className="td-icon" size={16}/>{client.phoneNumber}</td>
          <td className="td-cpfCnpj"><BiFileBlank className="td-icon-2" size={16}/>{client.cpfCnpj}</td>
          <td className="td-editLine">
            <Link onClick={() => {
              setSelectedSupplier(client)
              setshowModalDetails(true)
            }
            }>
              <BiDetail className="editLine" size={30} />
            </Link>
            <Link onClick={() => onEdit(client)}>
              <BiEdit className="editLine" size={30} />
            </Link>
            <Link onClick={() => onDelete(client)}>
              <MdDeleteOutline className="deleteLine" size={30} />
            </Link>

          </td>
        </tr>
      ))}
    </>
  );
}
export default PageOfListSuppliers;
