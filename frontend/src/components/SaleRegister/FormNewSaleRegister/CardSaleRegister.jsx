import React from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';

const CardSaleRegister = ({ saleRegisters, onDelete, onSubmitSale }) => {
  console.log(saleRegisters);
  return (
    <div className="CardSale">
      <h2>Carrinho</h2>
      <hr/>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {saleRegisters.map((saleRegister) => (
            <tr key={saleRegister.id}>
              <td className="td-fullName">{saleRegister.productName}</td>
              <td className="td-quantity">{saleRegister. quant}</td>
              <td className="td-unitPrice">{saleRegister.price}</td>
              <td className="td-subtotal">{saleRegister.subtotal}</td>
              <td className="td-editLine">
                <Link onClick={() => onDelete(saleRegister)}>
                  <MdDeleteOutline className="deleteLine" size={30} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr/>
      <h3>Total de items: 3</h3>   <h3>Valor Total: </h3> 
      <button type="submit" onClick={onSubmitSale}>Finalizar Pedido</button>
    </div>
  );
};

export default CardSaleRegister;
