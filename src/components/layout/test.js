export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true)
  console.log(squares)
  function handleClick(i){ //3
    if (squares[i]) return;

    const nextSquares = squares.slice(); //
    if (isNext) {
        nextSquares[i]= 'O';
    } else {
      nextSquares[i]= 'X';
    }
    setSquares(nextSquares);
    setIsNext(!isNext);
  }

  return (
    <>
      <div className="board-row">
        {squares.map((item, key) => (
          <Square value={squares[key]}
            onSquareClick={() => handleClick(key)}  //2
          />
        ))}
      </div>
    </>
  );
} 