import { useEffect, useState } from "react";
import "./App.css";
import { GrPowerReset } from "react-icons/gr";
import {GiTicTacToe} from 'react-icons/gi'

function App() {
  const [cells, setCells] = useState([...Array(9).keys()]);
  const [flag, setFlag] = useState(true);
  const [arrX, setArrX] = useState([]);
  const [arrO, setArrO] = useState([]);
  const [winner, setWinner] = useState("");
  const results = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const obj = {
    X: "X wins",
    O: "O wins",
    Draw: (
      <span>
        <GiTicTacToe className="me-3" />
        Draw
      </span>
    ),
  };

  const handleClick = (cell) => {
    const copy = [...cells];

    if (flag) {
      copy[cell] = "X";
      setArrX([...arrX, cell]);
    } else {
      copy[cell] = "O";
      setArrO([...arrO, cell]);
    }

    setFlag(!flag);
    setCells(copy);
  };

  const findWinner = (res, arr) => {
    let counter = 0;
    for (let el of arr) {
      if (res.includes(el)) {
        counter++;
      }
    }

    return counter === 3;
  };

  useEffect(() => {
    if (arrO.length < 3 && arrX < 3) return;

    if (arrO.length > 4 || arrX.length > 4) {
      setWinner("Draw");
    }

    for (let res of results) {
      if (findWinner(res, arrX)) {
        setWinner("X");
      } else if (findWinner(res, arrO)) {
        setWinner("O");
      }
    }
  }, [arrO, arrX]);

  const handleReset = () => {
    window.location.reload();
  };

  console.log(cells, "cells");
  console.log(arrO, "array of o");
  console.log(arrX, "array of x");

  return (
    <div className="wrapper">
      <div
        className="row"
        style={{
          pointerEvents: `${winner && "none"}`,
        }}
      >
        {cells.map((cell, index) => {
          return (
            <div
              color="black"
              key={index}
              className="cell col-sm-4 col-md-4 col-4 m-0 p-0"
              onClick={() => handleClick(cell)}
              style={{
                backgroundColor: `${cell === "X" && "lightgrey"}`,
                pointerEvents: `${typeof cell === "string" && "none"}`,
              }}
            >
              {typeof cell === "string" ? cell : ""}
            </div>
          );
        })}
      </div>
      <div className="">
        {winner && <div>{obj[winner]}!</div>}
        <GrPowerReset color="black" className="reset" onClick={handleReset} />
      </div>
    </div>
  );
}

export default App;
