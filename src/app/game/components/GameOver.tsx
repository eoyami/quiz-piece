import React from 'react'

type ChildrenProps = {
    FuncHandleGame: React.MouseEventHandler<HTMLButtonElement>
}

const GameOver = ({ FuncHandleGame }: ChildrenProps )  => {
  return (
    <>
        <div className="bg-red-500">Tempo acabou</div>
        <div className="flex flex-col justify-center mt-6">
        <div>Quer jogar novamente?</div>
        <button className="bg-green-500" onClick={FuncHandleGame}>Iniciar jogo</button>
          </div>
      </> 
    )
}

export default GameOver