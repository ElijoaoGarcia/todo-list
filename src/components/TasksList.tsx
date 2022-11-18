import React, { FC } from 'react'
import { Task } from '../App'
import { MdOutlineAddTask } from 'react-icons/md'
import TaskCard from './TaskCard'

interface Props {
  tasks: Task[]
  onUpdateTask: (task: Task) => void
  onRemoveTask: (task: Task) => void
  onAddNewTask?: () => void
}

const TasksList: FC<Props> = ({
  tasks, onUpdateTask, onRemoveTask,
  onAddNewTask
}) => {
  if (tasks.length === 0) {
    return (
      <p
        onClick={onAddNewTask}
        className='flex flex-col text-gray-500 items-center text-9xl'
      >
        <span className='text-base'>Press to add new task</span>
        <MdOutlineAddTask />
      </p>
    )
  }

  return (
    <ul className='flex flex-col gap-2 max-w-sm mx-auto'>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onChange={onUpdateTask}
          onRemove={onRemoveTask}
        />
      ))}
    </ul>
  )
}

export default TasksList
