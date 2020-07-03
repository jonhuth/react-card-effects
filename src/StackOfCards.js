import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import "./StackOfCards.css"
// import uuid from 'uuid/v4';

function StackOfCards() {
  const BASE_URL = "https://deckofcardsapi.com/api/deck/";
  const [cards, setCards] = useState([])
  const [deckId, setDeckId] = useState(null);
  const [shuffle, setShuffle] = useState(false);
  // get new deck id
  useEffect(function getDeck() {
    // we have this nested fn. in the cb because it needs to async for ajax requests
    async function getDeckId() {
      const shuffledDeck = await axios.get(`${BASE_URL}new/shuffle/?deck_count=1`);
      setDeckId(shuffledDeck.data.deck_id);
    }
    getDeckId();
    setCards([]);
    setShuffle(false);

  }, [shuffle]);

  async function addCard() {
    let card = await axios.get(`${BASE_URL}${deckId}/draw/?count=1`);
    let newCard = { ...card.data.cards[0] }; // , id: uuid()
    setCards(cards => [...cards, newCard]);
  }

  const renderCards = () => {
    return (
      <div>
        {cards.map(card => (
          <Card
            cardImgSrc={card.image} />
        ))}
      </div>
    )
  }


  return (
    <div>
      {cards.length === 52 ?
        <p>ERROR: NO CARDS REMAIN!</p> :
        <button onClick={addCard}>GIMME A CARD!</button>}

      {shuffle ?
        <p>Please wait for shuffle to end</p> :
        <button onClick={() => setShuffle(true)}>SHUFFLE NEW DECK</button>}
      {renderCards()}
    </div>
  )
}


export default StackOfCards;