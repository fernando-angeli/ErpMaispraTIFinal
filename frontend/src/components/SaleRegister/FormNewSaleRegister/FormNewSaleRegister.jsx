import { useState, useEffect } from "react";
import "./FormNewSaleRegister.css";
import { CgAdd, CgRemove } from "react-icons/cg";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import InputField from "../../InputField/InputField";
import LoadingSpin from '../../LoadingSpin/LoadingSpin';
import SelectFieldClient from "../../SelectField/SelectFieldClient";
import SelectFieldProduct from "../../SelectField/SelectFieldProduct";
import CardSaleRegister from './CardSaleRegister'
function FormNewSaleRegister({ dataSaleRegister }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [ResponsiveSaleRegister, setResponsiveSaleRegister] = useState(true);
  const [PostToUpdate, setPostToUpdate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);
  const { JwtToken } = useAuth();
  const [ListClients, setListClients] = useState([]);
  const [ListProducts, setListProducts] = useState([]);

  const [NewSaleRegisterClient, setNewSaleRegisterClient] = useState('');
  const [NewSaleRegisterSaller, setNewSaleRegisterSaller] = useState('');
  const [NewSaleRegisterData, setNewSaleRegisterData] = useState('');
  const [NewSaleRegisterDataPrev, setNewSaleRegisterDataPrev] = useState('');
  const [NewSaleRegisterProduct, setNewSaleRegisterProduct] = useState();
  const [NewSaleRegisterQuant, setNewSaleRegisterQuant] = useState('');
  const [CardItems, setCardItems] = useState([]);
  const [cardId, setCardId] = useState(1);

  const handleSubmit = async (event) => {
    try {
      await axios.post(
        `${apiUrl}/api/`,
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Venda registrados com sucesso!");
      handleReset();
    } catch (err) {
      setError("Erro ao registrar e venda");
    } finally {
      setIsLoading(false);
    }
  };

   const deleteCardItem = (idToDelete) => {
    setCardItems((prevItems) => prevItems.filter(item => item.id !== idToDelete)); 
    setCardId(cardId-1)
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
      console.log(err);
      alert("Erro ao puxar clientes!");
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
      console.log(err);
      alert("Erro ao puxar Produtos!");
    }
  };
  useEffect(() => {
    handleGetProducts();
    handleGetClients();
  }, []);

  useEffect(() => {
    if (dataSaleRegister) {
      setClientDetails( dataSaleRegister);
      setPostToUpdate(false);
    }
  }, [ dataSaleRegister]);

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
          value={NewSaleRegisterClient}
          onChange={(e)=>setNewSaleRegisterClient(e.target.value)}
          />
          
          <InputField
            classNameDiv="fieldName"
            label="Vendedor:"
            placeholder="Digite o nome do vendedor"
            name="sellerName"
            value={NewSaleRegisterSaller}
            onChange={(e)=>setNewSaleRegisterSaller(e.target.value)}
          />
          <InputField
          classNameDiv="fieldDate"
            label="Data de Entrega:"
            name="deliveryDate"
            type="date"
            value={NewSaleRegisterData}
            onChange={(e)=>setNewSaleRegisterData(e.target.value)}
          />

          <InputField
              classNameDiv="fieldDate"
            label="Data Prevista:"
            name="deliveryDate"
            type="date"
            value={NewSaleRegisterDataPrev}
            onChange={(e)=>setNewSaleRegisterDataPrev(e.target.value)}
          />
        </div>

        <div className="line4 line">

        <SelectFieldProduct
          label={"Produtos"}
          placeholder="Produtos"
          arrayOptions={ListProducts}
          value={NewSaleRegisterProduct}
          onChangeValue={setNewSaleRegisterProduct}
        />


        <InputField
            label="Quantidade:"
            name="quantity"
            placeholder="0"
            value={NewSaleRegisterQuant}
            onChange={(e)=>setNewSaleRegisterQuant(e.target.value)}
          />
          
          <div className="errorsOrSuccess">
          {Error && <p className="error">{Error}</p>}
          {Success && <p className="success">{Success}</p>}
        </div>

        {isLoading ? <LoadingSpin /> : <button type="submit" onClick={(e)=>handleAddtoCard(e)}>Registrar</button>}
        </div>
      </form>
      <CardSaleRegister
      saleRegisters={CardItems}
        onDelete={deleteCardItem}
        onSubmitSale={handleSubmit}
      />
    </div>
  );
}

export default FormNewSaleRegister;
