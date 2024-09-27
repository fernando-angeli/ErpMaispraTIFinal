import './optionNavigationMenu.css'

function OptionsNavigationMenu({arrayOptions}) {
    let toReturn = []
    arrayOptions.map((option, index) => {
        toReturn.push(
        <div key={index}>
            <img src={option.icon} alt="" />
            <label>{option.description}</label>
        
        </div>
    )})
    
    return (
        <>
            {toReturn}
        </>
    )
}

export default OptionsNavigationMenu