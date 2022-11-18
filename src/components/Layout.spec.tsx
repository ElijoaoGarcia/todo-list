import React from 'react'
import Layout from './Layout'
import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('<Layout /> suit test', () => {
  it('should be a function', () => {
    expect(typeof Layout).toBe('function')
  })

  it('should render the children', () => {
    render(
      <Layout
        onPressAddButton={() => {}}
      >
        <h1>hi</h1>
      </Layout>
    )

    screen.getByText(/hi/i)
  })

  it('should render the add button', () => {
    render(
      <Layout
        onPressAddButton={() => {}}
      >
        <h1>hi</h1>
      </Layout>
    )

    screen.getByRole('button')
  })
})
