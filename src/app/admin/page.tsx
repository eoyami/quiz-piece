"use client"

import React, { ChangeEvent } from 'react'


const Page = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        }

  return (
    <div className='flex flex-col bg-white text-black'>
        <form action="" onSubmit={handleSubmit}>
        <div className='flex flex-col'>
        <label htmlFor="question">Question:</label>
        <input type="text" name='question'/>
        <label htmlFor="file">File:</label>
        <input type="file" required/>
        <button type='submit' className='bg-gray-900 text-white'>Enviar pergunta</button>
        </div>
        </form>
    </div>
  )
}
export default Page