import { useNavigate } from 'react-router-dom'
import './optionNavigationMenu.css'
import { useState } from 'react'


function OptionsNavigationMenu({ arrayOptions }) {
    const [selected, setSelected] = useState(0)
    const navigate = useNavigate()

    let toReturn = []

    arrayOptions.map((option, index) => {
        toReturn.push(
            

            <div key={index} className='option notSelectable' onClickCapture={() => {
                navigate(option.url)
            }}>
                
                    <div className='optionResposive'>
                        <img src={option.icon} alt="" className='optionIcon' />
                        <label className='optionDescription'>{option.description}</label>
                    </div>
                
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