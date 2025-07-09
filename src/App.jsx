//import TicTacToe from "./TicTacToe"

import { useState } from "react"

function App() {
  const [board, setBoard] = useState(Array(9).fill(null)); // create 9 box and store intially null
  const [isXTurn, setIsXTurn] = useState(true); // store the box inside value X or O

  const winningCombination = [
    //winning combination row
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    //winning combination column
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    //winning combination diagonal
    [0, 4, 8],
    [6, 4, 2],
  ];

  function getWinner(square) {
    for (let combination of winningCombination) {
      const [a, b, c] = combination;

      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  }

  function handleSquareClick(index){
    if(board[index] || getWinner(board)) return;

    const updatedBoard = [...board];
    updatedBoard[index] = isXTurn ? 'X' : 'O';

    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);
  }

  function getGameStatus(){
      const winner = getWinner(board);

      if(winner) return `Winner: ${winner}`

      if(board.every((square)=> square !== null)){
        return "it's a Draw!"
      }
      return `Next Player: ${isXTurn ? 'X' : 'O'}`;
    }

    function ResetGame(){
        setBoard(Array(9).fill(null));
        setIsXTurn(true)
      }
  

  return (
    <>
      {/* <TicTacToe/> */}
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <div className="w-full max-w-[400px]  mx-5">
          <h1 className="text-4xl text-white text-bold mb-5 text-center">Tic Tac Toe</h1>

          <div
            className={`text-center mb-6 ${
              getWinner(board)
                ? "text-2xl font-bold text-green-500 animate-bounce"
                : "text-xl text-white"
            }`}
          >
            {getGameStatus()}
          </div>

          <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6 ">
            {board.map((square, index) => (
              <button
                onClick={() => handleSquareClick(index)}
                className={`h-32 w-full bg-gray-800 rounded-md text-6xl font-light transition-color duration-200 hover:bg-gray-700 cursor-pointer
              ${square === "X" ? "text-white" : "text-slate-400"}`}
                key={index}
              >
                {square}
              </button>
            ))}
          </div>
          <button
            onClick={() => ResetGame()}
            className="w-full text-white border rounded-xl py-3 hover:bg-gray-50 hover:text-gray-800 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App
