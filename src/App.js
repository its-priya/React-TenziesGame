import './App.css';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Die from './Die';
import Confetti from 'react-confetti'

function App() {
  const [ dice, setDice ]= useState(allNewDice())
  const [ gameOver, setGameOver ]= useState(false)

  useEffect(() => {
    const allHeld= dice.every(die => die.isHeld)
    const firstValue= dice[0].value
    const allSameValue= dice.every(die => die.value === firstValue)
    if( allHeld && allSameValue){
      setGameOver(true)
    }
  }, [dice])

  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    const newDice= []
    for(let i=0;i<10;i++)
      newDice.push(generateNewDie())
    return newDice
  }

  function rollDice(){
    if(!gameOver){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die: {...die, value: Math.ceil(Math.random() * 6)}
      }))
    } else {
      setGameOver(false)
      setDice(allNewDice())
    }
  }

  function holdDie(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id===id ? {...die, isHeld : !die.isHeld}:die
    }))
  }

  const diceElements= dice.map( die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDie(die.id)}
    />
   ) )

  return (
    <div className="main">
      {gameOver && <Confetti/>}
      <div className="container">
        <h1 className="title">Tenzies</h1>
        <p className="sub-title">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll-btn" onClick={rollDice}>
          {gameOver ? "New Game" : "Roll" }
        </button>
      </div>
      <div className="win-status">
        {gameOver ? "YOU WON!!" : ""}
      </div>
    </div>
  );
}

export default App;
