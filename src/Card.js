import React from 'react';
import './Card.css';

function Card({ cardImgSrc }) {
  let angle = Math.random() * 90 - 45;
  let x = Math.random() * 50;
  let y = Math.random() * 20;

  const styles = {
    transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
    position: "absolute"
  }
  return (
    <div className="cards">
      <img style={styles} src={cardImgSrc} alt="card"></img>
    </div>
  )
}


export default Card;