import React from 'react'
import { priority_map,status_map } from '../common/Name_Icon_map'
const Card = ({cardData , groupBy}) => {
  return (
    <div className='card'>
        <div className='card_id'>
          <label>{cardData?.id}</label>
        </div>
        <div className='card_stat_title'>
        { groupBy !== 'status' && 
             <span className="material-icons md mg-r">{status_map[cardData.status]?.icon}
             </span>
        }
          <h5>{(cardData?.title.length <= 50 )? cardData?.title : cardData?.title.substring(0,45) + "..."}</h5>
        </div>
        <div className='card_prio_tag'>
         {groupBy !== 'priority' && <span className="material-icons md mg-r">
             {priority_map[String(cardData.priority)]?.icon}</span>
         }
          <div className='card_prio_tag_tag'>
            <label className='mg-r'>O</label>
            <label>{cardData?.tag}</label>
          </div>
        </div>
    </div>
  )
}

export default Card