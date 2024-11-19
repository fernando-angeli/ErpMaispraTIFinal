import { useState, useEffect } from "react";
import "./FormNewSaleRegister.css";
import { CgAdd, CgRemove } from "react-icons/cg";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { jwtDecode } from "jwt-decode";

import InputField from "../../InputField/InputField";
import LoadingSpin from '../../LoadingSpin/LoadingSpin';
import SelectFieldClient from "../../SelectField/SelectFieldClient";
import SelectFieldProduct from "../../SelectField/SelectFieldProduct";
import CardSaleRegister from './CardSaleRegister'

function FormNewSaleRegister({ dataSaleRegister }) {
  const { JwtToken } = useAuth();
  const decoded = jwtDecode(JwtToken);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [ResponsiveSaleRegister, setResponsiveSaleRegister] = useState(true);
  const [PostToUpdate, setPostToUpdate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);
  const [ListClients, setListClients] = useState([]);
  const [ListProducts, setListProducts] = useState([]);

  const [NewSaleRegisterClientId, setNewSaleRegisterClientId] = useState('');
  const [NewSaleRegisterClient, setNewSaleRegisterClient] = useState('');
  const [NewSaleRegisterSaller, setNewSaleRegisterSaller] = useState(decoded.fullName);
  const [NewSaleRegisterData, setNewSaleRegisterData] = useState('');
  const [NewSaleRegisterDataPrev, setNewSaleRegisterDataPrev] = useState('');
  const [NewSaleRegisterProduct, setNewSaleRegisterProduct] = useState();
  const [NewSaleRegisterQuant, setNewSaleRegisterQuant] = useState('');
  const [CardItems, setCardItems] = useState([]);
  const [cardId, setCardId] = useState(1);

  const ValuestoUpdate = (values) => {
    setCardItems([]);
    setNewSaleRegisterClientId(values.id);
    setNewSaleRegisterClient(values.client);
    setNewSaleRegisterSaller(decoded.fullName);
    setNewSaleRegisterDataPrev(values.expectedDeliveryDate);
    setNewSaleRegisterData('');
    setNewSaleRegisterProduct('');
    setNewSaleRegisterQuant('');
    setCardId(1);

    values.saleItems.forEach((value, index) => {
      const NewItemtoCard = {
        id: index + 1,
        productId: value.product.id,
        productName: value.product.name,
        quant: value.quantitySold,
        price: value.salePrice,
        subtotal: value.salePrice * value.quantitySold,
      };
      setCardItems((prevItems) => [...prevItems, NewItemtoCard]);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/api/vendas`,
        {
          expectedDeliveryDate: NewSaleRegisterDataPrev,
          clientId: NewSaleRegisterClient[0].id,
        },
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const clientData = response.data;

      const saleRequests = CardItems.map((card) =>
        axios.post(
          `${apiUrl}/api/vendas/${clientData.id}/itens`,
          {
            productId: card.productId,
            quantitySold: card.quant,
            salePrice: card.price,
          },
          {
            headers: {
              Authorization: `Bearer ${JwtToken}`,
              "Content-Type": "application/json",
            },
          }
        )
      );
      await Promise.all(saleRequests);
      setSuccess("Venda registrada com sucesso!");
      handleReset();
    } catch (err) {
      setError("Erro ao registrar itens de venda");
      if (err.response && err.response.data) {
        setError(`${err.response.data.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const salePayload = {
      saleDate: NewSaleRegisterData,
      expectedDeliveryDate: NewSaleRegisterDataPrev,
      // saleItems: CardItems.map((card) => ({
      //   productId: card.productId,
      //   quantitySold: card.quant,
      //   salePrice: card.price,
      // })),
      saleItems: [],
      saleStatus: "pendente",
    };
    console.log("Payload:", salePayload);

    try {
      const response = await axios.put(`${apiUrl}/api/vendas/${NewSaleRegisterClientId}`,
        salePayload,
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response)
      setSuccess("Venda Atualizada com sucesso!");
      handleReset();
    } catch (err) {
      setError("Erro ao Atualizar itens de venda");
      console.log("Erro:", err);
      if (err.response && err.response.data) {
        setError(`${err.response.data.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };


  const deleteCardItem = (idToDelete) => {
    setCardItems((prevItems) => prevItems.filter(item => item.id !== idToDelete));
    setCardId(cardId - 1);
  };

  const handleAddtoCard = (e) => {
    e.preventDefault();
    const NewItemtoCard = {
      id: cardId,
      productId: NewSaleRegisterProduct[0].id,
      productName: NewSaleRegisterProduct[0].name,
      quant: NewSaleRegisterQuant,
      price: NewSaleRegisterProduct[0].productPrice,
      subtotal: NewSaleRegisterProduct[0].productPrice * NewSaleRegisterQuant,
    };

    if (!NewItemtoCard.quant || isNaN(NewItemtoCard.quant) || NewItemtoCard.quant <= 0) {
      setError("A quantidade deve ser preenchida e ser um número positivo.");
      return;
    } else if (!NewItemtoCard.price || isNaN(NewItemtoCard.price) || NewItemtoCard.price <= 0) {
      setError("O preço deve ser preenchido e ser um número positivo.");
      return;
    }

    setCardItems((prevItems) => [...prevItems, NewItemtoCard]);
    setCardId(cardId + 1);
    setNewSaleRegisterQuant('');
  };

  const handleGetClients = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/clientes`, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
        },
      });
      setListClients(response.data.content);
    } catch (err) {
      console.error("Erro ao puxar clientes", err);
    }
  };

  const handleGetProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/produtos`, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
        },
      });
      setListProducts(response.data.content);
    } catch (err) {
      console.error("Erro ao puxar produtos", err);
    }
  };

  const handleReset = () => {
    setNewSaleRegisterClient('');
    setNewSaleRegisterData('');
    setNewSaleRegisterDataPrev('');
    setNewSaleRegisterProduct('');
    setNewSaleRegisterQuant('');
    setCardItems([]);
    setCardId(1);
  };

  useEffect(() => {
    handleGetProducts();
    handleGetClients();
  }, []);

  useEffect(() => {
    if (dataSaleRegister) {
      ValuestoUpdate(dataSaleRegister);
      setPostToUpdate(false);
      console.log(dataSaleRegister)
    }
  }, [dataSaleRegister]);


  return (
    <div className="containerForm">
      <h2 className="tabTitle">
        Registro de Vendas
        <a className="hide-desktop" onClick={() => setResponsiveSaleRegister(!ResponsiveSaleRegister)}>
          {!ResponsiveSaleRegister ? <CgAdd size={45} /> : <CgRemove size={45} />}
        </a>
      </h2>
      <form
        className={ResponsiveSaleRegister ? "visibleformNewSaleRegister" : "hiddenformNewSaleRegister"}
        id="formSaleRegister"
      >
        <div className="line1 line">
          <SelectFieldClient
            classNameDiv="fieldName"
            label={"Clientes"}
            placeholder="Clientes"
            arrayOptions={ListClients}
            value={!PostToUpdate && NewSaleRegisterClient.fullName}
            onChangeValue={setNewSaleRegisterClient}
          />

          <InputField
            classNameDiv="fieldName"
            label="Vendedor Responsavel:"
            placeholder=""
            name="sellerName"
            value={decoded.fullName}
            disabled={true}
          />
          <InputField
            classNameDiv="fieldDate"
            label="Data de Entrega:"
            name="deliveryDate"
            type="date"
            value={NewSaleRegisterData}
            onChange={(e) => setNewSaleRegisterData(e.target.value)}
          />

          <InputField
            classNameDiv="fieldDate"
            label="Data Prevista:"
            name="deliveryDate"
            type="date"
            value={NewSaleRegisterDataPrev}
            onChange={(e) => setNewSaleRegisterDataPrev(e.target.value)}
          />
        </div>

        <div className="line">

          <SelectFieldProduct
            classNameDiv="fieldProduct"
            label={"Produtos"}
            placeholder="Produtos"
            arrayOptions={ListProducts}
            value={NewSaleRegisterProduct}
            onChangeValue={setNewSaleRegisterProduct}
          />


          <InputField
            classNameDiv="fieldQuantity"
            label="Quantidade:"
            name="quantity"
            placeholder="0"
            value={NewSaleRegisterQuant}
            onChange={(e) => setNewSaleRegisterQuant(e.target.value)}
          />
          

            <div className="divRegisterButton">
              {isLoading ? <LoadingSpin /> : <button type="submit" className="registerButton" onClick={(e) => handleAddtoCard(e)}>Registrar</button>}
            </div>
          


        </div>
            <div className="errorsOrSuccess">
              {Error && <p className="error">{Error}</p>}
              {Success && <p className="salesuccess">{Success}</p>}
            </div>
      </form>
      <CardSaleRegister
        saleRegisters={CardItems}
        onDelete={deleteCardItem}
        PostToUpdate={PostToUpdate}
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
      />
      
    </div>
  );
}

export default FormNewSaleRegister;
