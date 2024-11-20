
import axios from 'axios';
export default async function Viacep(cep) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const {logradouro, bairro, localidade: cidade, uf: estado } = response.data;
    if(!logradouro || !bairro || !cidade || !estado ){
      return null;
    }
    return {
      logradouro,
      bairro,
      cidade,
      estado,
    };
  } catch (error) {
    console.error('Erro ao buscar o endereço:', error);
    return null;
  }
}
