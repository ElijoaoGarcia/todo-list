import React from 'react'

const Fallback = (): JSX.Element => {
  return (
    <section className='w-full h-screen flex justify-center items-center rounded-lg'>
      <span className="loader"></span>
    </section>
  )
}

export default Fallback
