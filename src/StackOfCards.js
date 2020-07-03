import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from './Card';
// import uuid from 'uuid/v4';
// import './Card.css';

function StackOfCards() {
  const BASE_URL = "https://deckofcardsapi.com/api/deck/";
  const [cards, setCards] = useState([])
  const [deckId, setDeckId] = useState(null);
  // get new deck id
  useEffect(function getInitialDeck() {
    async function getDeckId() {
      const shuffledDeck = await axios.get(`${BASE_URL}new/shuffle/?deck_count=1`);
      setDeckId(shuffledDeck.data.deck_id);
    }
    getDeckId();

  }, []);


  
  async function addCard() {
    let card = await axios.get(`${BASE_URL}${deckId}/draw/?count=1`);
    let newCard = {...card.data.cards[0]}; // , id: uuid()
    setCards(cards => [...cards, newCard]);
  }

  const renderCards = () => {
    return (
      <div>
        {cards.map(card => (
          <Card 
            cardImgSrc={card.image}/>
        ))}
      </div>
    )
  }
  
  
  return (
    <div>
      {cards.length === 52 ? <p>ERROR: NO CARDS REMAIN!</p> : <button onClick={addCard}>GIMME A CARD!</button>}
      {renderCards()}
    </div>
  )
}


export default StackOfCards;