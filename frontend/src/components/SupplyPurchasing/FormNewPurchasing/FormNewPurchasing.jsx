import { useState, useEffect } from "react";
import "./FormNewPurchasing.css";
import { CgAdd, CgRemove } from "react-icons/cg";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import Viacep from "../../Viacep/Viacep";
import InputField from "../../InputField/InputField";
import RadioGroup from "../../RadioGroup/RadioGroup";
import TextareaField from "../../TextareaField/TextareaField";
import LoadingSpin from "../../LoadingSpin/LoadingSpin";
import SelectField from "../../SelectField/SelectField";

function FormNewPurchasing(dataPurchasing) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [ResponsivePurchasinge, setResponsivePurchasinge] = useState(true);
  const [PostToUpdate, SetPostToUpdade] = useState(true);

  const [product, setProduct] = useState("");
  const [qte, setQte] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [supplierSelect, setSupplierSelect] = useState("");
  const [employeeSelect, setEmployeeSelect] = useState("");

  const [UpdatePurchasingId, setUpdatePurchasingId] = useState();
  const [Error, setError] = useState();
  const [Success, setSuccess] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { JwtToken } = useAuth();

  const supplierList = [];
  const employeeList = [];

  const isInvalid = (e) => {
    e.target.classList.add("isInvalid");
  };

  const isValid = (e) => {
    if (e.target.value && e.target.className.indexOf("isInvalid") != -1) {
      console.log(e.target.className);
      e.target.classList.remove("isInvalid");
    }
  };

  const handleReset = () => {
    let form = document.getElementById("formNewPurchasing");
    let elements = form.getElementsByClassName("isInvalid");

    while (elements.length > 0) {
      elements[0].classList.remove("isInvalid");
    }

    setProduct("");
    setQte("");
    setDeliveryDate("");
    setExpectedDate("");
    setSupplierSelect("");
    setEmployeeSelect("");
    SetPostToUpdade(true);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPurchasingData = {
      product: product,
      qte: qte,
      deliveryDate: deliveryDate,
      expectedDate: expectedDate,
      supplierSelect: supplierSelect,
      employeeSelect: employeeSelect,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/api/purchasinges`,
        newPurchasingData,
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      handleReset();
      setSuccess("Compra adicionado com sucesso!");
      setIsLoading(false);
      window.location.reload;
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      if (err.response && err.response.data) {
        setIsLoading(false);
        setError(`${err.response.data.message}`);
      } else {
        setError("Formato de Cpf Invalido");
        setIsLoading(false);
        return;
      }
    }
  };
  const handleUpdate = async (event) => {
    setIsLoading(true);

    event.preventDefault();
    const newPurchasingData = {
      product: product,
      qte: qte,
      deliveryDate: deliveryDate,
      expectedDate: expectedDate,
      supplierSelect: supplierSelect,
      employeeSelect: employeeSelect,
    };

    try {
      const response = await axios.put(
        `${apiUrl}/api/purchasinges/${UpdatePurchasingId}`,
        newPurchasingData,
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      handleReset();
      setSuccess("Purchasinge Atualizado com sucesso!");
      setIsLoading(!isLoading);
      setError(null);
      SetPostToUpdade(true);
      window.location.reload();
    } catch (err) {
      setIsLoading(!isLoading);
      if (err.response && err.response.data) {
        setError(`${err.response.data.message}`);
      } else {
        setError("Erro ao atualizar compra! Tente novamente.");
        setSuccess(null);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const resposivePurchasingeShow = () => {
    setResponsivePurchasinge(!ResponsivePurchasinge);
  };
  const SetValuestoUpdate = (values) => {
    setQte(values.Qte);
    setProduct(values.product);
    setDeliveryDate(values.deliveryDate);
    setExpectedDate(values.expectedDate);
    setSupplierSelect(values.supplierSelect);
    setEmployeeSelect(values.employeeSelect);
  };

  useEffect(() => {
    if (dataPurchasing.dataPurchasing) {
      SetValuestoUpdate(dataPurchasing.dataPurchasing);
      SetPostToUpdade(false);
    }
  }, [dataPurchasing]);

  return (
    <div className="containerForm">
      <h2 className="tabTitle">
        Pedido de compra de insumos
        <a className="hide-desktop" onClick={resposivePurchasingeShow}>
          {!ResponsivePurchasinge ? (
            <CgAdd size={45} />
          ) : (
            <CgRemove size={45} />
          )}
        </a>
      </h2>
      <form
        className={
          ResponsivePurchasinge
            ? "visibleformNewPurchasing"
            : "hiddenformNewPurchasing"
        }
        id="formNewPurchasing"
        onReset={handleReset}
        onSubmit={PostToUpdate ? handleSubmit : handleUpdate}
      >
        <div className="line1 line">
          <InputField
            label={"Produto:"}
            placeholder={"Digite o nome do produto"}
            name={"produtct"}
            idInput={"product"}
            classNameDiv="fieldProduct"
            value={product}
            onChange={(e) => {
              setProduct(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
          <InputField
            label={"Qtde:"}
            placeholder={"0"}
            name={"qte"}
            idInput={"qte"}
            classNameDiv={"fieldQte"}
            type={"number"}
            value={qte}
            onChange={(e) => {
              setQte(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
          <InputField
            label={"Data de Entrega:"}
            name={"deliveryDate"}
            idInput={"deliveryDate"}
            classNameDiv="fieldDeliveryDate"
            type={"date"}
            value={deliveryDate}
            onChange={(e) => {
              setDeliveryDate(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
          <InputField
            label={"Data prevista:"}
            name={"ExpectedDate"}
            idInput={"ExpectedDate"}
            classNameDiv="fieldExpectedDate"
            type={"date"}
            value={expectedDate}
            onChange={(e) => {
              setExpectedDate(e.target.value);
              isValid(e);
            }}
            onInvalid={(e) => isInvalid(e)}
          />
        </div>

        <div className="line2 line">
          <div className="line2Left">
            <SelectField
              label={"Responsável pelo pedido"}
              name={"Employee"}
              id={"Employee"}
              classnameDiv={"divSelectEmployee"}
              classNameSelect={"selectEmployee"}
              value={employeeSelect ? JSON.stringify(employeeSelect[0]) : ""}
              onInvalid={(e) => selectIsInvalid(e)}
              onChange={(e) => {
                const selectedEmployee = JSON.parse(e.target.value);
                setEmployeeSelect([selectedEmployee]);
                isValid(e);
              }}
              arrayOptions={employeeList}
            />
            <SelectField
              label={"Fornecedor:"}
              name={"Supplier"}
              id={"Supplier"}
              classnameDiv={"divSelectSupplier"}
              classNameSelect={"selectSupplier"}
              value={supplierSelect ? JSON.stringify(supplierSelect[0]) : ""}
              onInvalid={(e) => selectIsInvalid(e)}
              onChange={(e) => {
                const selectedSupplier = JSON.parse(e.target.value);
                setSupplierSelect([selectedSupplier]);
                isValid(e);
              }}
              arrayOptions={supplierList}
            />
          </div>
          <div className="divStatusAndButtons">
            <div className="errorsOrSuccess">
              <p style={{ color: "red" }}>{Error && Error}</p>
              <p style={{ color: "green" }}>{Success && Success}</p>
            </div>
            <div className="divButtons">
              <button
                type="submit"
                className="primaryNormal"
                onClick={PostToUpdate ? handleSubmit : handleUpdate}
              >
                {PostToUpdate ? "Salvar" : "Atualizar"}
              </button>
              <button
                type="reset"
                className="primaryLight"
                onClick={() => handleReset()}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
      {isLoading && <LoadingSpin />}
    </div>
  );
}

export default FormNewPurchasing;
