import React from 'react'
import Card from './Card';
import { status_map,priority_map } from '../common/Name_Icon_map';
const Display = ({data , groupBy , userData}) => {
    
    // console.log(data) ; 
  return (
    <div className='display_container'>
          {data.map((group) => {
            for(let key in group)
            {
               return (
                  <div className='card_container'>
                  <div className='head'>
                       {/* <h3>{key}</h3> */}
                        <div className='head_part1'>
                        { groupBy === 'status' && 
                             <span className="material-icons md mg-r">{status_map[key]?.icon}
                             </span>
                        }
                        { groupBy === 'priority' && <span className="material-icons md mg-r">
                        { priority_map[String(key)]?.icon}</span>
                        }

                        {groupBy === "users" ? userData[key]?.name : groupBy === 'priority' ? priority_map[String(key)]?.name : <h4>{key}</h4>}
                        <label className='mg-l'>{group[key].length}</label>
                        </div>

                        {key !== 'Canceled' && 
                       <div className='head_part2'>
                     
                       <span className ="material-icons md mg-r">
                        more_horiz
                       </span>
                       <span className ="material-icons md mg-r">
                        add
                        </span>
                      
                        </div>}
                   </div>
                  {
                     group[key].map((d) => (
                         <Card  cardData={d} groupBy = {groupBy}/>
                     ))
                  }
                  </div>
               )
            }
          })}
    </div>
  )
}

export default Display ; 