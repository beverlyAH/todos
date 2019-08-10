import React from 'react'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'

const Item = (props) => {

  const { item } = props

  return (

      <div className="fade">

        <ul className="item" key={item.id} style={{backgroundColor: item.color}}>
          {item.description}
          <FiXCircle className="close" onClick={()=>{props.delete(item.completed, item.id)}} />
          { item.completed ? 
          <FiCheckCircle className="check" onClick={()=>props.incomplete(item.id)} />
            :
          <FiCheckCircle className="check" onClick={()=>props.complete(item.id)} />
          }
        </ul>

      </div>

  )
}

export default Item