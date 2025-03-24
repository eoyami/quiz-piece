"use client";

import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Session } from "next-auth";

const GamePage = () => {

  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [answerInput, setAnswerInput] = useState<string>('')
  const [imgUrl, setImgUrl] = useState<string>('')
  const [alert, setAlert] = useState<string>('')
  const scoreRef = useRef(0)
  const [userSession, setUserSession] = useState<Session | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    setUserSession(session);
  }, [session]);

  const [gaming, setGaming] = useState<boolean>(false)

  

  

  class counttimer {
    private tempoRestante: number;
    private isRunning: boolean = false
    private intervaloId: NodeJS.Timeout | null = null
    constructor(TempoInicial: number) {
      this.tempoRestante = TempoInicial
    }

    start(){
      if(this.isRunning){
        console.log("timer em execução")
        return
      }

      if(this.tempoRestante <= 0){
        console.log("tempo acabou")
        return
      }

      this.isRunning = true
      this.intervaloId = setInterval(() => {

        if(this.tempoRestante > 0){
          this.tempoRestante -= 1
          setTimer(this.tempoRestante)

        } else {
          console.log('Tempo esgotado')
          this.stop()
        }

      }, 1000)}

      getTempoRestante(){
        if(this.tempoRestante > 0){
          return this.tempoRestante
        }
        return this.tempoRestante = 0
      }
    
    stop() {
      if (this.intervaloId) {
        clearInterval(this.intervaloId); 
        this.isRunning = false;
        this.intervaloId = null;
        this.tempoRestante = 0
        return
    }
    }
  }

  const counttimerGame = new counttimer(15)
  const [timer, setTimer] = useState<number>(counttimerGame.getTempoRestante())

  const handleNewQuiz = async () => {
    try {
        const response = await fetch('/api/randomquiz')
        const quiz = await response.json()
        if (!quiz || !quiz.question || !quiz.answer || !quiz.imgUrl) {
          return 'error'
        }
        setQuestion(quiz.question)
        setAnswer(quiz.answer)
        setImgUrl(quiz.imgUrl)
    } catch (error) {
      throw new Error('Error: ' + error)
    }
  }

  const handleGameStart = async () => {
    try {
      await handleNewQuiz()
      setGaming(true)
      counttimerGame.start()
      setAlert('')
    } catch (e) {
        throw new Error('error: ' + e)
    }
  }

  const handleNewGame = async () => {
    counttimerGame.stop();

    setAnswerInput('')
    setAlert('');
    setTimer(15)

    await handleGameStart()
    
  }
  
  const handlerAnswer = async () => {
    if (answer === answerInput) {
      scoreRef.current += 1
      counttimerGame.stop()
      setAnswerInput('')
      await handleNewGame()
    }

    setAlert('Sua resposta não é válida')
    setTimeout(() => {
      setAlert('')
    }, 1500)
  }

  return (
    <>

      {gaming === false ? <button className="bg-green-500 text-black" onClick={handleGameStart}>Começar a jogar</button> : null}
    {userSession && gaming ? (
      <section className="flex flex-col w-screen h-screen justify-center items-center bg-neutral-950 max-sm:py-6 max-sm:px-3">
      <div className="flex flex-col justify-center items-center text-2xl">
        {userSession && (
          <>
          {timer > 0 ? (<>
                  <div>Tempo restante: {timer}</div>
                  <div>Pontuação: {scoreRef.current}</div>
          <div className="flex">
          <div className="flex flex-col bg-white text-gray-900 p-3">
                      <div className="flex justify-center items-center"><h4>{question || "No question available"}</h4></div>
                      <div className="flex justify-center items-center"><Image className="border-2 border-gray-900" src={imgUrl || "No img available"} width={300} height={300} alt=""></Image></div>
                      <div className="mt-3">
                        <input type="text" placeholder="Put here your answer" className="w-full outline-hidden border-gray-900 border-2" onChange={(e: ChangeEvent<HTMLInputElement>) => (setAnswerInput(e.target.value))} />
                      </div>
                      <button className="text-white bg-gray-900" onClick={handlerAnswer}>Enviar resposta</button>
                      <div className="bg-red-500 text-white">{alert}</div>
        </div>
        </div></>)
          : (<>
          <div className="bg-red-500">Tempo acabou</div>
          <div className="flex flex-col justify-center mt-6">
          <div>Quer jogar novamente?</div>
                      <button className="bg-green-500" onClick={handleNewGame}>Iniciar jogo</button>
          </div></>) }
          
          </>
        )}
      </div>
    </section>
      ) : null}
    </>
  );
};

export default GamePage;
