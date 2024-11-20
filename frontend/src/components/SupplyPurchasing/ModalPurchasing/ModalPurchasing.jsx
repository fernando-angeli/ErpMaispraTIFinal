import "./ModalPurchasing.css";

function ModalDetails({ show, onClose, content, title }) {
  if (!show) return null;
  console.log(content);
  function formatDate(date) {
    return date.split("-").reverse().join("/");
  }
  const dataDeEntrega = formatDate("1990-05-15");
  const dataPrevista = formatDate("1991-06-16");
  return (
    <div className="modalDetailsOverlayPurchasing">
      <div className="modalDetailsContentPurchasing">
        <div className="modalDetailsHeader">
          <h2>{title}</h2>
        </div>
        <div className="modalDetailsBodyPurchasing">
          <div className="rowPurchasing">
            <div className="first columnPurchasing">
              <div className="label">Produto:</div>
              <div className="value">{content && content.fullName}</div>
            </div>
            <div className="second columnPurchasing">
              <div className="label">Fornecedor:</div>
              <div className="value">{content && content.fullName}</div>
            </div>
            <div className="third columnPurchasing">
              <div className="label">Responsável pelo pedido:</div>
              <div className="value">{content && content.fullName}</div>
            </div>
          </div>

          <div className="rowPurchasing">
            <div className="first columnPurchasing">
              <div className="label">Qtde:</div>
              <div className="value">{content && content.phoneNumber}</div>
            </div>
            <div className="second columnClient">
              <div className="label">Data de entrega:</div>
              <div className="value">{content && dataDeEntrega}</div>
            </div>
            <div className="third columnClient">
              <div className="label">Data de Prevista:</div>
              <div className="value">{content && dataPrevista}</div>
            </div>
          </div>
        </div>

        <div className="modalFooter">
          <button
            className="modalDetailsCloseButtonPurchasing"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDetails;
