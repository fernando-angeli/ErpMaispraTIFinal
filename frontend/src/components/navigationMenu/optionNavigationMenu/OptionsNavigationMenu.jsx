import './optionNavigationMenu.css'
import { useState } from 'react'

function OptionsNavigationMenu({arrayOptions}) {
    const [selected, setSelected] = useState(0)

    let toReturn = []

    arrayOptions.map((option, index) => {
        toReturn.push(
            <div key={index} className='option'>
                <img src={option.icon} alt="" className='optionIcon'/>
                <label className='optionDescription'>{option.description}</label>
            </div>
        )
    })
    
    return (
        <div className='navigationMenu'>
            {toReturn}
        </div>
    )
}

export default OptionsNavigationMenu