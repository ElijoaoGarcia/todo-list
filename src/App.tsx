/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useLayoutEffect, useState } from 'react'
import copy from 'fast-copy'
import AddModal from './components/AddModal'
import Layout from './components/Layout'
import TasksList from './components/TasksList'

export interface Task {
  id: string
  description: string
  statusId: 0 | 1 // pending | done
  createdAt: string
}

const App = (): JSX.Element => {
  const [init, setInit] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [addModal, setAddModal] = useState(false)

  const filterTasksByStatusId = (statusId: 0 | 1) => (task: Task): boolean => task.statusId === statusId

  const addTask = (task: Task): void => {
    const copyTask = copy(tasks)
    copyTask.push(task)
    setTasks(copyTask)
  }

  const updateTask = (task: Task): void => {
    const copyTasks = copy(tasks)
    const index = copyTasks.findIndex(({ id }) => task.id === id)
    if (index > -1) {
      copyTasks[index] = task
    }
    setTasks(copyTasks)
  }

  const removeTask = (task: Task): void => {
    const copyTasks = copy(tasks)
    const index = copyTasks.findIndex(({ id }) => task.id === id)
    copyTasks.splice(index, 1)
    setTasks(copyTasks)
  }

  useLayoutEffect(() => {
    const localstoreTask = JSON.parse(localStorage.getItem('tasks') as any) as Task[]
    if (localstoreTask && localstoreTask.length > 0) {
      setTasks(localstoreTask.filter(filterTasksByStatusId(0)))
    }
    setInit(true)
  }, [])

  useEffect(() => {
    if (init) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks, init])

  return (
    <Layout
      onPressAddButton={() => setAddModal(true)}
    >
      <div className='flex flex-row mb-2 justify-between'>
        <h1 className='text-gray-700 text-3xl'>Tasks</h1>
        <a href='https://www.ciudadev.com'>
          <img src='/js.png' title='Ciudadev' alt='Ciudadev' className='h-10 rounded-full transition-all hover:h-12' />
        </a>
      </div>
      <TasksList
        tasks={tasks.filter(filterTasksByStatusId(0))}
        onUpdateTask={updateTask}
        onRemoveTask={removeTask}
        onAddNewTask={() => setAddModal(true)}
      />

      { tasks.filter(({ statusId }) => statusId === 1).length > 0 && (
        <>
          <h2 className='text-gray-700 text-xl mt-5'>Tasks done</h2>
          <p className='text-xs text-gray-500 mb-2'>
            Tasks in this section won&apos;t appear in the next section
          </p>
          <TasksList
            tasks={tasks.filter(filterTasksByStatusId(1))}
            onUpdateTask={updateTask}
            onRemoveTask={removeTask}
          />
        </>
      )}

      <AddModal
        isVisible={addModal}
        onClose={() => setAddModal(false)}
        onSubmit={addTask}
      />
    </Layout>
  )
}

export default App
