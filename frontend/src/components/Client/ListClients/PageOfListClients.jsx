import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import ModalDetails from "../../ModalDetails/ModalDetails"
import { BiDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
function PageOfListClients({
  clients,
  onEdit,
  onDelete,
  maxClientsPerList,
  listClientsPageSelected,
}) {

const [showModalDetails,setshowModalDetails] = useState(false);
const [selectedClient, setSelectedClient] = useState('');

  let clientsToList = [];

  for (
    let i = (listClientsPageSelected - 1) * maxClientsPerList;
    i < listClientsPageSelected * maxClientsPerList;
    i++
  ) {
    if (clients[i]) {
      clientsToList.push(clients[i]);
    }
  }

  return (
    <>
     <ModalDetails
        show={showModalDetails}
        onClose={() => setshowModalDetails(false)}
        content={selectedClient}
        title ="Detalhes Cliente"> 
        </ModalDetails>
        

      {clientsToList.map((client) => (
        <tr key={client.id}>
          <td>{client.fullName}</td>
          <td>{client.email}</td>
          <td>{client.phoneNumber}</td>
          <td>{client.cpfCnpj}</td>
          <td>
          <Link onClick={() => {setSelectedClient(client)
              setshowModalDetails(true)}
            }>
            <BiDetail className="editLine" size={30}/>
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
export default PageOfListClients;
