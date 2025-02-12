import React from "react"
import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: "Component testing",
    author: "Component",
    url: "nofing.com",
    user: {
        id: "no id"
    }
  }
  const users = [{
    name: "tester"
  }]

  render(<Blog blog={blog} users={users} />)

  const element = screen.getByText('Component testing')
  screen.debug()
  expect(element).toBeDefined()
})

test('view button shows more information', async () => {
  const blog = {
    title: "Component testing",
    author: "Component",
    url: "nofing.com",
    user: {
        id: 12345
    }
  }
  const users = [{
    name: "tester",
    username: "test",
    id: 12345
  }]

  render(<Blog blog={blog} users={users} userWithToken={users[0]} />)

  //const mockHandler = vi.fn()

  const user = userEvent.setup()
  const button = screen.getByText("view")
  await user.click(button)
  //console.log("btn found")

  //expect(mockHandler.mock.calls).toHaveLength(1)

  const element = screen.getByText(/Component testing/i)
  screen.debug()
  expect(element).toBeDefined()
})