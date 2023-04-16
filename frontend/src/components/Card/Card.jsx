import React from 'react'
import './card.scss'

const Card = (props) => {
  console.log(props)
  return (
    <div className={`card ${props.active}`}>
      <div className="avatar">
        <img src={props.data.image_url} alt="" />
      </div>

      <div className="detail">
        <div className="name">
          <h3>{props.data.received_name}</h3>
          <p>4m</p>
        </div>

        <p className="message">{props.data.last_message}</p>
      </div>
    </div>
  )
}

export default Card
