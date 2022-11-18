import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect } from 'vitest'
import TasksList from './TasksList'

describe('<TasksList /> test suit', () => {
  it('should be a function', () => {
    expect(typeof TasksList).toBe('function')
  })

  it('should render press to add new task message if empty array', () => {
    render(
      <TasksList
        tasks={[]}
        onUpdateTask={() => {}}
        onRemoveTask={() => {}}
      />
    )

    screen.getByText(/Press to add new task/i)
  })

  it('should loop tasks and render card component', () => {
    render(
      <TasksList
        tasks={[
          { id: '123', description: 'test', statusId: 0, createdAt: '' },
          { id: '1233', description: 'tester', statusId: 1, createdAt: '' }
        ]}
        onUpdateTask={() => {}}
        onRemoveTask={() => {}}
      />
    )

    screen.getAllByText(/test/i)
    screen.getAllByText(/tester/i)
    screen.getByText(/pending/i)
    screen.getByText(/done/i)
  })
})
