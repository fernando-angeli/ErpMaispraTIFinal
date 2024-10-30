
import "./ModalYesOrNot.css"; // Para estilização do modal

function ModalYesOrNot({ show, onClose, title, children }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="close-button" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
export default ModalYesOrNot