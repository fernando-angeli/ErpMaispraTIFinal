import React from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';

const CardSaleRegister = ({ saleRegisters, onDelete}) => {

  const formatarReal = (valor) => {
    const formatado = (valor / 1).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return formatado;
}
let totalToShow = 0;
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
              <td className="td-quantity">{saleRegister.quant}</td>
              <td className="td-unitPrice">R$ {formatarReal(saleRegister.price)}</td>
              <td className="td-subtotal">R$ {formatarReal(saleRegister.subtotal)}</td>
              <td className="td-editLine"><span style={{display:"none"}}>{totalToShow = totalToShow+saleRegister.subtotal}</span>
                <Link onClick={() => onDelete(saleRegister.id)}>
                  <MdDeleteOutline className="deleteLine" size={30} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr/>
      <h3>Total de items: {saleRegisters.length}</h3>   <h3>Valor Total: R$ {formatarReal(totalToShow)}</h3> 
    </div>
  );
};

export default CardSaleRegister;
