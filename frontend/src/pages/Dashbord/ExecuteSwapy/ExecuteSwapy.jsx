import { createSwapy } from 'swapy'
import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../../../components/AuthContext';

import { debounce } from 'lodash';




function ExecuteSwapy() {
useEffect(() => {
  console.log('')
}, []);
  const { JwtToken } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  const container = document.querySelector('#containerSwapy')

  const swapy = createSwapy(container)

  // You can disable and enable it anytime you want
  swapy.enable(true)


  const handleSwap = debounce((event) => {
    let items = [];
    const isValidSlots = () => {
      for (let i in event.data.object) {
        if (items.includes(event.data.object[i]) || !event.data.object[i]) {
          return false;
        } else {
          items.push(event.data.object[i]);
        }
      }
      return true;
    };
  
    if (isValidSlots()) {
      time(event.data.object);
    }
  }, 200);

  swapy.onSwap(handleSwap);


  let timeOutSwap


  let time = (obj) => {
    if (timeOutSwap) {
      clearTimeout(timeOutSwap)
    }

    timeOutSwap = setTimeout(() => {
      apiResgisterSwap(2, obj)
    }, 2000)
  }

  const apiGetSwap = async (userId, obj) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/usuarios/${userId}/cards`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.status)
      console.log('Dados do dashboard Baixados:', obj);
    } catch (err) {
      console.error('Erro ao baixar dados do dashboard:', err);

      if (err.response && err.response.data) {
        console.error(`Erro: ${err.response.data.message}`);
      } else {
        console.error('Erro desconhecido');
      }
    }

  }


  const apiResgisterSwap = async (userId, obj) => {
    try {

      const response = await axios.post(
        `${apiUrl}/api/usuarios/${userId}/cards`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.status)
      console.log('Dados do dashboard registrados:', obj);
    } catch (err) {

      console.error('Erro ao registrar dados do dashboard:', err);

      if (err.response && err.response.data) {
        console.error(`Erro: ${err.response.data.message}`);
      } else {
        console.error('Erro desconhecido');
      }
    }

  }


}
export default ExecuteSwapy