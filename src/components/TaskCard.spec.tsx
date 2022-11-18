import React from 'react'
import TaskCard from './TaskCard'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('<TaskCard /> test suit', () => {
  const onChangeMocked = vi.fn()
  const onRemoveMocked = vi.fn()

  it('should be a function', () => {
    expect(typeof TaskCard).toBe('function')
  })

  it('should render the task description and status', () => {
    render(
      <TaskCard
        task={{
          id: '123456',
          description: 'test',
          statusId: 0,
          createdAt: ''
        }}
        onChange={() => {}}
        onRemove={() => {}}
      />
    )

    screen.getByText(/test/i)
    screen.getByText(/pending/i)
  })

  it('it should render the remove icon if the task is done', () => {
    render(
      <TaskCard
        task={{
          id: '123456',
          description: 'test',
          statusId: 1,
          createdAt: ''
        }}
        onChange={() => {}}
        onRemove={() => {}}
      />
    )

    screen.getByRole('button')
  })

  it('should send the updated task on click checkbox element', async () => {
    render(
      <TaskCard
        task={{
          id: '123456',
          description: 'test',
          statusId: 1,
          createdAt: ''
        }}
        onChange={onChangeMocked}
        onRemove={() => {}}
      />
    )

    await userEvent.click(screen.getByRole('checkbox'))
    expect(onChangeMocked).toHaveBeenCalled()
  })

  it('should send the task on click remove button', async () => {
    render(
      <TaskCard
        task={{
          id: '123456',
          description: 'test',
          statusId: 1,
          createdAt: ''
        }}
        onChange={() => {}}
        onRemove={onRemoveMocked}
      />
    )

    await userEvent.click(screen.getByRole('button'))
    expect(onRemoveMocked).toHaveBeenCalled()
  })
})
