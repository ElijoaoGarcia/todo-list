import React, { FC, ReactNode } from 'react'
import { MdOutlineAddTask } from 'react-icons/md'

interface Props {
  children: ReactNode
  onPressAddButton: () => void
}

const Layout: FC<Props> = ({ children, onPressAddButton }): JSX.Element => {
  return (
    <div className='absolute h-full w-full md:p-4'>
      <div className='relative bg-white h-full max-w-lg mx-auto p-5 md:border-gray-300 md:border-2 md:shadow-lg md:rounded-lg overflow-y-auto'>
        {children}
      </div>

      <button
        data-testid='main-add-button'
        onClick={onPressAddButton}
        className='absolute bg-blue-700 rounded-full bottom-3 right-3 h-16 w-16 flex justify-center items-center transition-all duration-200 text-2xl text-white shadow-md hover:shadow-xl focus:h-20 focus:w-20 focus:ring-2 ring-blue-300'
      >
        <MdOutlineAddTask />
      </button>
    </div>
  )
}

export default Layout
