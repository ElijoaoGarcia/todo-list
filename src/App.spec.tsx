import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { describe, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import App, { Task } from './App'

describe('<App /> test suit', () => {
  it('should be a function', () => {
    expect(typeof App).toBe('function')
  })

  it('should renderthe title and add new task message on first render', () => {
    render(
      <App />
    )

    screen.getAllByText('Tasks')
    screen.getAllByText('Press to add new task')
  })

  it('should open the add modal', async () => {
    render(
      <App />
    )

    await userEvent.click(screen.getByText('Press to add new task'))
    screen.getByText('New task')
  })

  it('should open the add modal from main add button', async () => {
    render(
      <App />
    )

    await userEvent.click(screen.getByTestId('main-add-button'))
    screen.getByText('New task')
  })

  it('should close the add modal', async () => {
    render(
      <App />
    )

    await userEvent.click(screen.getByTestId('main-add-button'))
    screen.getByText('New task')
    screen.getByRole('button', {
      name: /close/i
    })
  })

  it('should add new task', async () => {
    render(
      <App />
    )

    await userEvent.click(screen.getByTestId('main-add-button'))
    screen.getByText('New task')
    await userEvent.type(screen.getByRole('textbox'), 'hola')
    await userEvent.click(screen.getByRole('button', {
      name: /add/i
    }))
    screen.getByText('hola')
  })

  it('should update task to done status', async () => {
    const task: Task = { id: '123', description: 'hola', createdAt: '', statusId: 0 }
    localStorage.setItem('tasks', JSON.stringify([task]))
    render(
      <App />
    )

    await userEvent.click(screen.getByRole('checkbox'))
    const listitem = screen.getByRole('listitem')
    within(listitem).getByText(/done/i)
    screen.getByRole('heading', {
      name: /tasks done/i
    })
  })

  it('should update the task to done status and then remove it', async () => {
    const task: Task = { id: '123', description: 'hola', createdAt: '', statusId: 0 }
    localStorage.setItem('tasks', JSON.stringify([task]))
    render(
      <App />
    )

    await userEvent.click(screen.getByRole('checkbox'))
    const listitem = screen.getByRole('listitem')
    within(listitem).getByText(/done/i)
    screen.getByRole('heading', {
      name: /tasks done/i
    })
    await userEvent.click(within(listitem).getByRole('button'))
    screen.getByText('Press to add new task')
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks') as any) as Task[]
    expect(localStorageTasks.length).toBe(0)
  })
})
