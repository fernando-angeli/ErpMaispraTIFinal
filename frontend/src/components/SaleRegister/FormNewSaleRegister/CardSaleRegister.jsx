import React from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import "./CardSaleRegister.css"

const CardSaleRegister = ({ saleRegisters, onDelete, PostToUpdate, handleSubmit, handleUpdate }) => {

  const formatarReal = (valor) => {
    const formatado = (valor / 1).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return formatado;
  }
  let totalToShow = 0;

  return (
    <div className="cardSale">
      <h2>Carrinho</h2>
      <hr />


      {saleRegisters.length == 0 ? <p className='emptyCard'>Seu carrinho está vazio!</p> : (
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
            {
              saleRegisters.map((saleRegister) => (
                <tr key={saleRegister.id}>
                  <td className="td-fullName">{saleRegister.productName}</td>
                  <td className="td-quantity">{saleRegister.quant}</td>
                  <td className="td-unitPrice">R$ {formatarReal(saleRegister.price)}</td>
                  <td className="td-subtotal">R$ {formatarReal(saleRegister.subtotal)}</td>
                  <td className="td-editLine"><span style={{ display: "none" }}>{totalToShow = totalToShow + saleRegister.subtotal}</span>
                    <Link onClick={() => onDelete(saleRegister.id)}>
                      <MdDeleteOutline className="deleteLine" size={30} />
                    </Link>
                  </td>
                </tr>
              ))

            }

          </tbody>
        </table>
      )}

      <hr />
      <div className='div-totals'>
        <p className='totals'>Total de items: <span>{saleRegisters.length}</span></p>
        <p className='totals'>Valor Total: <span>R$ {formatarReal(totalToShow)}</span></p>
        <button type="submit" onClick={PostToUpdate ? handleSubmit : handleUpdate} className='buttonSubmitSale' >
          {PostToUpdate ? "Finalizar Pedido" : "Atualizar Pedido"}
        </button>
      </div>
    </div>
  );
};

export default CardSaleRegister;
