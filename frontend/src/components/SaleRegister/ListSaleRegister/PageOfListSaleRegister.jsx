import { BiEdit } from "react-icons/bi";

import { MdDeleteOutline } from "react-icons/md";
import ModalDetails from "../../ModalDetails/ModalDetails"
import { BiDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
function PageOfListSaleRegisters({
  SaleRegisters,
  onEdit,
  onDelete,
  maxSaleRegistersPerList,
  listSaleRegistersPageSelected,
}) {

  const [showModalDetails, setshowModalDetails] = useState(false);
  const [selectedsaleRegister, setSelectedsaleRegister] = useState('');

  let SaleRegistersToList = ["2"];

  // for (
  //   let i = (listSaleRegistersPageSelected - 1) * maxSaleRegistersPerList;
  //   i < listSaleRegistersPageSelected * maxSaleRegistersPerList;
  //   i++
  // ) {
  //   if (SaleRegisters[i]) {
  //     SaleRegistersToList.push(SaleRegisters[i]);
  //   }
  // }

  return (
    <>
      <ModalDetails
        show={showModalDetails}
        onClose={() => setshowModalDetails(false)}
        content={selectedsaleRegister}
        title="Detalhes saleRegistere">
      </ModalDetails>


      {SaleRegistersToList.map((saleRegister) => (
        <tr key={saleRegister.id}>
          <td className="td-fullName">{saleRegister.fullName}</td>
          <td className="td-email">{saleRegister.email}</td>
          <td className="td-phoneNumber">{saleRegister.phoneNumber}</td>
          <td className="td-cpfCnpj">{saleRegister.cpfCnpj}</td>
          <td className="td-cpfCnpj">{saleRegister.date}</td>
          <td className="td-editLine">
            <Link onClick={() => {
              setSelectedsaleRegister(saleRegister)
              setshowModalDetails(true)
            }
            }>
              <BiDetail className="editLine" size={30} />
            </Link>
            <a href="#" onClick={() => onEdit(saleRegister)}>
              <BiEdit className="editLine" size={30} />
            </a>
            <Link onClick={() => onDelete(saleRegister)}>
              <MdDeleteOutline className="deleteLine" size={30} />
            </Link>

          </td>
        </tr>
      ))}
    </>
  );
}
export default PageOfListSaleRegisters;
