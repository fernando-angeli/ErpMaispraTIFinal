import './navigationMenu.css'
import OptionsNavigationMenu from './optionNavigationMenu/OptionsNavigationMenu'

import newClientIcon from '../../assets/icons/newClientIcon.png'
import newSupplierIcon from '../../assets/icons/newSupplierIcon.png'
import newProductIcon from '../../assets/icons/newProductIcon.png'
import newBuyIcon from '../../assets/icons/newBuyIcon.png'
import newSaleIcon from '../../assets/icons/newSaleIcon.png'

function NavigationMenu() {
    let options = [
        {
            icon: newClientIcon,
            description: "Novo Cliente"
        },
        {
            icon: newSupplierIcon,
            description: "Novo Fornecedor"
        },
        {
            icon: newProductIcon,
            description: "Novo Produto"
        },
        {
            icon: newBuyIcon,
            description: "Compra de Insumos"
        },
        {
            icon: newSaleIcon,
            description: "Venda de Produtos"
        }
    ]
    return (
        <>
            <OptionsNavigationMenu arrayOptions={options}/>
        </>
    )
}

export default NavigationMenu