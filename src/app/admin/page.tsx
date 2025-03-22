"use client"

import React, { ChangeEvent } from 'react'
import { useState, useRef } from 'react'
const Page = () => {

  const inputFileRef = useRef<HTMLInputElement>(null)
  const [question, setQuestion] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      
      try {
        if (!inputFileRef.current?.files){
        throw new Error("No file selected")
      }
      
        const file = inputFileRef.current.files[0]
        
        const formData = new FormData()
        formData.append('question', question)
        formData.append('file', file)

      await fetch(`/api/upload?filename=${file.name}`,
        {
          method: "POST",
          body: formData,
        }
      )
      } catch (e) {
        throw new Error("Error: " + e)
      }
    }

  return (
    <div className='flex flex-col mt-6'>
        <form action="" onSubmit={handleSubmit}>
        <div className='flex justify-center'>
        <div className='flex flex-col bg-white text-black p-3'><label htmlFor="question">Question:</label>
        <input type="text" name='question' className='outline-hidden border-2 border-gray-900' placeholder="What's the question?" onChange={(e: ChangeEvent<HTMLInputElement>) => {setQuestion(e.target.value)}}/>
        <label htmlFor="file">File:</label>
        <input type="file" ref={inputFileRef} required/>
        <button type='submit' className='bg-gray-900 text-white'>Enviar pergunta</button></div>
        </div>
        </form>
    </div>
  )
}
export default Page