import React, { useState , useEffect } from 'react'
import Option from './Option';

const DisplayOptions = ({setGroupBy , setOrderBy , currValue}) => {
    const[clicked , setClicked] = useState(false) ; 

    function handleClick(e){
        setClicked(!clicked) ; 
    }

    function handleClose(e){
        setClicked(false) ; 
    }

    useEffect(() => {  // click anywhere on cards space to close display settings ..
      document.getElementsByClassName('display_container')[0].addEventListener('click',handleClose) ; 
      return () => {
      document.getElementsByClassName('display_container')[0].removeEventListener('click',handleClose) ; 
      };
    } , []) ; 
  
  return ( 
         <div className='display_options_container'>
            
            <button className='display_btn_main' onClick={handleClick}>
            <div className='display_btn'>
            <span className="material-icons mg-r">
              tune
            </span>
    
            <span>Display</span>
            <span className="material-icons">
            arrow_drop_down
            </span>
          
            </div>
            </button>
           
            {clicked && 
                 <div className='options_container'>
                 <Option  setFunc = {setGroupBy} name = {"groupBy"} label = {"Grouping "} dropdownValues = {["status" ,"users" , "priority"]} currValue ={currValue}/>
                 <Option  setFunc = {setOrderBy} name = {"orderBy"} label = {"Ordering "} dropdownValues = {["title" ,"priority"]}/>
                </div>
            }
         </div>
  )
}

export default DisplayOptions