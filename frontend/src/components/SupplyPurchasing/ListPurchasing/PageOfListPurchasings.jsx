import { BiEdit, BiAt, BiPhone, BiFileBlank } from "react-icons/bi";

import { MdDeleteOutline } from "react-icons/md";
import ModalDetails from "../ModalPurchasing/ModalPurchasing";
import { BiDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
function PageOfListPurchasings({
  Purchasings,
  onEdit,
  onDelete,
  maxPurchasingsPerList,
  listPurchasingsPageSelected,
}) {
  const [showModalDetails, setshowModalDetails] = useState(false);
  const [selectedPurchasing, setSelectedPurchasing] = useState("");

  let PurchasingsToList = [];
  for (
    let i = (listPurchasingsPageSelected - 1) * maxPurchasingsPerList;
    i < listPurchasingsPageSelected * maxPurchasingsPerList;
    i++
  ) {
    if (Purchasings[i]) {
      PurchasingsToList.push(Purchasings[i]);
    }
  }

  return (
    <>
      <ModalDetails
        show={showModalDetails}
        onClose={() => setshowModalDetails(false)}
        content={selectedPurchasing}
        title="Detalhes Compra Insumos"
      ></ModalDetails>

      {PurchasingsToList.map((Purchasing) => (
        <tr key={Purchasing.id}>
          <td className="td-nOrder">{"000"}</td>
          <td className="td-produto">{"algum produto"}</td>
          <td className="td-status">{"pendente"}</td>
          <td className="td-dataPrevista">{"01-01-2025"}</td>
          <td className="td-dataEntrega">{"01-01-2026"}</td>
          <td className="td-editLine">
            <Link
              onClick={() => {
                setSelectedPurchasing(Purchasing);
                setshowModalDetails(true);
              }}
            >
              <BiDetail className="editLine" size={30} />
            </Link>
            <a href="#" onClick={() => onEdit(Purchasing)}>
              <BiEdit className="editLine" size={30} />
            </a>
            <Link onClick={() => onDelete(Purchasing)}>
              <MdDeleteOutline className="deleteLine" size={30} />
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
}
export default PageOfListPurchasings;
