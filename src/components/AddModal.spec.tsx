/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import AddModal from './AddModal'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('<AddModal /> test suit', () => {
  const onSubmitMocked = vi.fn()

  it('should be a function', () => {
    expect(typeof AddModal).toBe('function')
  })

  it('should render modal dialog role, title, input and buttons', () => {
    render(
      <AddModal
        isVisible
        onClose={() => {}}
        onSubmit={() => {}}
      />
    )

    screen.getByRole('dialog')
    screen.getAllByRole('button')
    screen.getByRole('heading')
    screen.getByRole('textbox')
    screen.getByText(/add/i)
  })

  it('should send the task object on submit', async () => {
    render(
      <AddModal
        isVisible
        onClose={() => {}}
        onSubmit={onSubmitMocked}
      />
    )

    await userEvent.type(screen.getByRole('textbox'), 'test')
    await userEvent.click(screen.getByText(/add/i))
    expect(onSubmitMocked).toHaveBeenCalled()
  })

  it('should send the task object on submit from key combinations', async () => {
    render(
      <AddModal
        isVisible
        onClose={() => {}}
        onSubmit={onSubmitMocked}
      />
    )

    await userEvent.type(screen.getByRole('textbox'), 'test')
    await userEvent.keyboard('{Control>}{Enter}{/Control}')
    // await userEvent.click(screen.getByText(/add/i))
    expect(onSubmitMocked).toHaveBeenCalled()
  })
})
