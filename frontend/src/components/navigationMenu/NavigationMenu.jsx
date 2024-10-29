import "./navigationMenu.css";
import OptionsNavigationMenu from "./optionNavigationMenu/OptionsNavigationMenu";
import newClientIcon from "../../assets/icons/newClientIcon.png";
import newSupplierIcon from "../../assets/icons/newSupplierIcon.png";
import newProductIcon from "../../assets/icons/newProductIcon.png";
import newBuyIcon from "../../assets/icons/newBuyIcon.png";
import newSaleIcon from "../../assets/icons/newSaleIcon.png";
import newUserIcon from "../../assets/icons/newbiUsericon.png";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../AuthContext";

function NavigationMenu() {
  const { JwtToken } = useAuth();
  let decoded = jwtDecode(JwtToken);
  const userProfile = decoded.roles[0].authority;
  let options = [
    {
      icon: newClientIcon,
      description: "Novo Cliente",
      url: "/cliente",
    },
    {
      icon: newSupplierIcon,
      description: "Novo Fornecedor",
    },
    {
      icon: newProductIcon,
      description: "Novo Produto",
    },
    {
      icon: newBuyIcon,
      description: "Compra de Insumos",
    },
    {
      icon: newSaleIcon,
      description: "Venda de Produtos",
    },
  ];

  let optionsAdmin = [
    {
      icon: newClientIcon,
      description: "Novo Cliente",
      url: "/cliente",
    },
    {
      icon: newSupplierIcon,
      description: "Novo Fornecedor",
    },
    {
      icon: newProductIcon,
      description: "Novo Produto",
    },
    {
      icon: newBuyIcon,
      description: "Compra de Insumos",
    },
    {
      icon: newSaleIcon,
      description: "Venda de Produtos",
    },
    {
      icon: newUserIcon,
      description: "Novo Usuário",
      url: "/funcionario",
    },
  ];

  return (
    
    <OptionsNavigationMenu
    arrayOptions={userProfile === "ROLE_OPERATOR" || userProfile === "ROLE_ADMIN" ? optionsAdmin : options}
    className="responsive"
  />
  );
}

export default NavigationMenu;
