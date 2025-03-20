"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Yamato from '../../../public/assets/question_yamato.png'
import type { Session } from "next-auth";

const GamePage = () => {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    setUserSession(session);
  }, [session]);


  const [gaming, setGaming] = useState<boolean>(false)

  class counttimer {
    private tempoRestante: number;
    private setIntervalo: NodeJS.Timeout | null = null
    private isRunning: boolean = false
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
      this.setIntervalo = setInterval(() => {

        if(this.tempoRestante > 0){
          this.tempoRestante -= 1
          setTimer(this.tempoRestante)

        } else{
          console.log('Tempo esgotado')
          this.stop()
        }

      }, 1000)}

      stop(){
        if(this.setIntervalo){
          clearInterval(this.setIntervalo)
          this.isRunning = false
          return 0
        }
      }

      getTempoRestante(){
        if(this.tempoRestante > 0){
          return this.tempoRestante
        }
        return 0
      }


  }


  const handleGameStart = () => {
    setGaming(true)
    counttimerGame.start()
  }
  const counttimerGame = new counttimer(15)
  const [timer, setTimer] = useState<number>(counttimerGame.getTempoRestante())

  return (
    <>

    {gaming === false ? <button className="bg-green-500 text-black" onClick={() => {handleGameStart()}}>Começar a jogar</button> : null}
    {userSession && gaming ? (
      <section className="flex flex-col w-screen h-screen justify-center items-center bg-neutral-950 max-sm:py-6 max-sm:px-3">
      <div className="flex flex-col justify-center items-center text-2xl">
        {userSession && (
          <>
          {timer > 0 ? (<>
            <div>Tempo restante: {timer}</div>
          <div className="flex">
            
          <div className="flex flex-col bg-white text-gray-900 p-3">
          <div className="flex justify-center items-center"><h4>Qual o nome desta personagem?</h4></div>
          <Image className="border-2 border-gray-900" src={Yamato} alt=""></Image>
          <div className="mt-3"><input type="text" placeholder="Put here your answer" className="w-full outline-hidden border-gray-900 border-2" /></div>
          <button className="text-white bg-gray-900">Enviar resposta</button>
        </div>
        </div></>)
          : (<>
          <div className="bg-red-500">Tempo acabou</div>
          <div className="flex flex-col justify-center mt-6">
          <div>Quer jogar novamente?</div>
          <button className="bg-green-500" onClick={() => {handleGameStart()}}>Iniciar jogo</button>
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
