import React, { FC } from 'react'
import { BsTrash } from 'react-icons/bs'
import { Task } from '../App'
import copy from 'fast-copy'

interface Props {
  task: Task
  onChange: (task: Task) => void
  onRemove: (task: Task) => void
}

const TaskCard: FC<Props> = ({
  task, onChange, onRemove
}) => {
  const status = task.statusId === 0 ? 'Pending' : 'Done'

  const inputHandler = (): void => {
    const updatedTask = copy(task)
    updatedTask.statusId = updatedTask.statusId === 0 ? 1 : 0
    onChange(updatedTask)
  }

  return (
    <li className='bg-gray-300 dark:bg-gray-600 rounded p-2 flex flex-row items-center gap-3 shadow-md shadow-slate-200'>
      <input
        type="checkbox"
        defaultChecked={task.statusId === 1}
        onChange={inputHandler}
      />
      <p className='flex-1 capitalize font-medium whitespace-pre'>{task.description}</p>
      <p className={`${task.statusId === 1 ? 'bg-green-500' : 'bg-black bg-opacity-50'} py-1 px-4 rounded-full text-white`}>
        {status}
      </p>

      {task.statusId === 1 && (
        <button
          onClick={() => onRemove(task)}
          className='text-red-600 p-2 rounded transition-all hover:bg-red-600 hover:text-white hover:text-xl'
        >
          <BsTrash />
        </button>
      )}
    </li>
  )
}

export default TaskCard
