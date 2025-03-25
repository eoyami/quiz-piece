"use client"

import React from 'react'
import { useState, useEffect } from 'react'

const RankingComponent = () => {
    const [ranking, setRanking] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('/api/ranking')
            if (!response.ok) {
                throw new Error("Falha no carregamento dos dados")
            }
            const data = await response.json()
            setRanking(data.data)
        } catch (e){
            setError('Error: ' + e)
        } finally {
            setLoading(false)
        }
    }
        fetchData()

    }, [])

    if (loading) return <div>Carregando...</div>
    if (error) return <div>Erro: {error}</div>
    if (!ranking.length) return <div>Nenhum dado disponível</div> 
    
    
  return (
      <div>
          {
              ranking.map((item, index) => (
                  <div className='border-2 border-gray-900 p-3 flex gap-6 justify-start items-center' key={index}>
                      <p>{index + 1}. </p>
                      <div className='flex'><h4>Usuário: {item.username}</h4></div>
                      <div className='flex'><p>Pontos: {item.score}</p></div>
                  </div>
              ))
          }
    </div>
  )
}

export default RankingComponent