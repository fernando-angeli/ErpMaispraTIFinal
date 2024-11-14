import "./ModalSale.css";

function ModalDetails({ show, onClose, content, title }) {
  if (!show) return null;
  console.log(content);

  const classes = ["first", "second", "third"];

  function formatDate(date) {
    if (date) {
      if (date.includes("T") || date.includes(":")) {
        if (date.includes("T")) {
          const [datePart, timePart] = date.split("T");
          const [year, month, day] = datePart.split("-");
          const [hour, minute] = timePart.split(":");
          return `${day.padStart(2, "0")}/${month.padStart(
            2,
            "0"
          )}/${year} ${hour}:${minute}`;
        }
      }
      return date.split("-").reverse().join("/");
    }
    return "00/00/0000";
  }

  const formatarReal = (valor) => {
    const formatado = (valor / 1).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return formatado;
}

  const saleDate = formatDate(content.saleDate);
  const saleDeliveryDate = formatDate(content.saleDeliveryDate);
  return (
    <div className="modalDetailsOverlaySale">
      <div className="modalDetailsContentSale">
        <div className="modalDetailsHeader">
          <h2>{title}</h2>
        </div>
        <div className="modalDetailsBodySale">
          <div className="rowSale">
            {content?.saleItems?.map((item, index) => (
              <div
                key={item.id || index}
                className={`${classes[index % 3]} columnSale`}
              >
                <div className="label">Produto:</div>
                <div className="value">{item.product.name}</div>
                <div className="label">Preço:</div>
                <div className="value">{`R$ ${formatarReal(item.salePrice)}`}</div>
                <div className="label">Quantidade:</div>
                <div className="value">{item.quantitySold}</div>
              </div>
            ))}
          </div>

          <div className="rowSale">
            <div className="first columnSale">
              <div className="label">Cliente:</div>
              <div className="value">{content && content.client.fullName}</div>
            </div>
            <div className="second columnSale">
              <div className="label">Vendedor:</div>
              <div className="value">{content && content.fullName}</div>
            </div>
          </div>

          <div className="rowSale">
            <div className="first columnSale">
              <div className="label">Data de entrega:</div>
              <div className="value">{content && saleDate}</div>
            </div>
            <div className="second columnSale">
              <div className="label">Data de Prevista:</div>
              <div className="value">{content && saleDeliveryDate}</div>
            </div>
            <div className="third columnSale">
              <div className="label">Valor Total:</div>
              <div className="value">
                {content && `R$ ${formatarReal(content.totalSaleValue)}`}
              </div>
            </div>
          </div>
        </div>

        <div className="modalFooter">
          <button className="modalDetailsCloseButtonSale" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDetails;
