import React, { useEffect, useState } from 'react'

const Option = ({setFunc , label , name , dropdownValues , currValue}) => {
    
    const [selectedValue , setSelected] = useState(currValue) ; 
    const handleSelectChange = (event) => {
        setSelected(event.target.value) ; 
        setFunc(event.target.value);
        localStorage.setItem(name , event.target.value) ; // for page reload // name is passed to identify key value
    }

  return (
    <div  className='option'>
    <label>{label}</label>
    <select  value={selectedValue} onChange={handleSelectChange}>
        {dropdownValues.map((option , indx) => (    
        <option key = {indx} value={option}>
          {option}
        </option>
      ))}
    </select>
    </div>
  )
}

export default Option