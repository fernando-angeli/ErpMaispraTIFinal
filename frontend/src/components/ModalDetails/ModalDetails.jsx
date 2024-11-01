
import "./ModalDetails.css"; 

function ModalDetails({ show, onClose, content,title }) {
  if (!show) return null;
  console.log(content)
  return (
    <div className="modalDetails-overlay">
      <div className="modalDetails-content">
        <div className="modalDetails-header">
          <h2>{title}</h2>
        </div>
        <div className="modalDetails-body">

    <div class="row">
      <div>
        <div class="label">Nome:</div>
        <div class="value">{content && content.fullName}</div>
      </div>
      <div>
        <div class="label">E-mail:</div>
        <div class="value">{content && content.email}</div>
      </div>
    </div>

    <div class="row">
      <div>
        <div class="label">Data de nascimento:</div>
        <div class="value">{content && content.birthDate}</div>
      </div>
      <div>
        <div class="label">Telefone:</div>
        <div class="value">{content && content.phoneNumber}</div>
      </div>
      <div>
        <div class="label">{content&& content.typePfOrPj === 'PF' ? 'CPF:' : 'CNPJ:'}</div>
        <div class="value">{content && content.cpfCnpj}</div>
      </div>

    </div>
    <div class="row">
      <div>
        <div class="label">CEP:</div>
        <div class="value">{content && content.zipCode}</div>
      </div>
      <div>
        <div class="label">Cidade:</div>
        <div class="value">{content && content.city}</div>
      </div>
      <div>
        <div class="label">Estado:</div>
        <div class="value">{content && content.state}</div>
      </div>

    </div>

    <div class="row">
      <div>
        <div class="label">Logradouro:</div>
        <div class="value">{content && content.address}</div>
      </div>
      <div>
        <div class="label">Bairro:</div>
        <div class="value">{content && content.district}</div>
      </div>

      <div>
        <div class="label">Número:</div>
        <div class="value">{content && content.number}</div>
      </div>
    </div>

  <div class="row">
      <div>
        <div class="label">Notas:</div>
        <div class="value">{content && content.notes}</div>
      </div>
      <div>

        <div class="label">Status:</div>
        <div class="status">{content && (content.status).toUpperCase()}</div>
      </div> 
    </div>
<button className="modalDetailsclose-button" onClick={onClose}>
            Fechar
          </button>
  </div>

          
        </div>
      </div>
  );
}
export default ModalDetails