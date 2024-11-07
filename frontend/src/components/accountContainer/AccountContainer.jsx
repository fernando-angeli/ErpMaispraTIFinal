import userIcon from "../../assets/icons/userIcon.svg";
import "./accountContainer.css";

import { jwtDecode } from "jwt-decode";
import { useAuth } from "../AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//icones do react
import { RxAvatar } from "react-icons/rx";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RxExit } from "react-icons/rx";

function AccountContainer({ isLoggedIn }) {
  const { JwtToken } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const decoded = jwtDecode(JwtToken);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="account-container">
          <div className="account" onClick={toggleMenu}>
            <img src={userIcon} alt="" className="userIcon" />
            <label>
              Olá,
              <br />
              {decoded.fullName}
            </label>
          </div>
          {isMenuOpen && (
            <div className="account-menu">
              <div className="menu-item">
                <RxAvatar className="menu-icon" />
                Perfil
              </div>
              <div className="menu-item">
                <AiOutlineMail className="menu-icon" />
                Notificação
              </div>
              <div className="menu-item">
                <IoIosHelpCircleOutline className="menu-icon" />
                Suporte
              </div>
              <div
                className="menu-item"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                <RxExit className="menu-icon" />
                Sair
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <img src={userIcon} alt="" />
          <p>Faça login</p>
        </div>
      )}
    </>
  );
}

export default AccountContainer;
