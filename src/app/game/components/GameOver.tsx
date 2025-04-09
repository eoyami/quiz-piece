import React from 'react'

type ChildrenProps = {
  FuncHandleGame: React.MouseEventHandler<HTMLButtonElement>,
  setIsGaming: React.Dispatch<React.SetStateAction<boolean>>,
}

const GameOver = ({ FuncHandleGame, setIsGaming }: ChildrenProps )  => {
  return (
    <>
        <div className="bg-red-500">Tempo acabou</div>
        <div className="flex flex-col justify-center mt-6">
        <div>Quer jogar novamente?</div>
        <button className="bg-green-500 cursor-pointer" onClick={FuncHandleGame}>Iniciar jogo</button>
        <button className='bg-blue-500 cursor-pointer' onClick={() => setIsGaming(false)}>Voltar a tela inicial</button>
          </div>
      </> 
    )
}

export default GameOver