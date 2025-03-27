import React from 'react'
import RankingComponent from './components/RankingComponent'
const page = () => {

  return (
      <div className='flex w-screen justify-center mt-6'>
          <div className='flex justify-center bg-white text-gray-900 p-3 w-96 rounded'>
              <div className='flex flex-col'>
                <div className='flex justify-center text-2xl'><h1>Ranking Top 10:</h1></div>
                <RankingComponent/>
              </div>
          </div>
    </div>
  )
}

export default page