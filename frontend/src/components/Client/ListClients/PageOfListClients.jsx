import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

function PageOfListClients({clients, onEdit, onDelete, maxClientsPerList, listClientsPageSelected}) {
    let clientsToList = []

    for (let i = (listClientsPageSelected-1)*maxClientsPerList; i < listClientsPageSelected*maxClientsPerList; i++) {
        if(clients[i]) {
            clientsToList.push(clients[i])
        }
    }


    return(
        <>
            {clientsToList.map((client) => (
                <tr key={client.id}>
                    <td>{client.fullName}</td>
                    <td>{client.email}</td>
                    <td>{client.phoneNumber}</td>
                    <td>{client.cpfCnpj}</td>
                    <td>
                        <a href="#" onClick={() => onEdit(client)}>
                          <BiEdit className="editLine" size={30} />
                        </a>
                        <a href="#" onClick={() => onDelete(client.id)}>
                          <MdDeleteOutline className="deleteLine" size={30} />
                        </a>
                      </td>
                </tr>
            ))}
        </>
    )
}
export default PageOfListClients