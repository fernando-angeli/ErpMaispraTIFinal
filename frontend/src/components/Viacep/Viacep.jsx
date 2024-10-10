
import axios from 'axios';
export default async function Viacep(cep) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const { bairro, localidade: cidade, uf: estado } = response.data;
    console.log('Bairro:', bairro);
    console.log('Cidade:', cidade);
    console.log('Estado:', estado);
    return {
      bairro,
      cidade,
      estado,
    };
  } catch (error) {
    console.error('Erro ao buscar o endereço:', error);
    return null;
  }
}
