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
    },
    likes: 4
  }
  const users = [{
    name: "tester",
    username: "test",
    id: 12345
  }]

  render(<Blog blog={blog} users={users} userWithToken={users[0]} />)

  const user = userEvent.setup()
  const button = screen.getByText("view")
  await user.click(button)

  const title = screen.getByText(/Component testing/i)
  screen.debug()
  expect(title).toBeDefined()

  const author = screen.getByText(/Component/i)
  expect(author).toBeDefined()

  const url = screen.getByText(/nofing.com/i)
  expect(url).toBeDefined()

  const likes = screen.getByText(/4/i)
  expect(likes).toBeDefined()

  const kayttaja = screen.getByText(/tester/i)
  expect(kayttaja).toBeDefined()
})

test("liking twice adds two likes", async () => {
  const blog = {
    title: "Component testing",
    author: "Component",
    url: "nofing.com",
    user: {
        id: 12345
    },
    likes: 4
  }
  const users = [{
    name: "tester",
    username: "test",
    id: 12345
  }]

  const mockHandler = vi.fn()

  render(<Blog blog={blog} users={users} userWithToken={users[0]} likeBlog={mockHandler}/>)
  const user = userEvent.setup()

  const buttonView = screen.getByText("view")
  await user.click(buttonView)

  const buttonLike = screen.getByText("like")
  await user.click(buttonLike)
  await user.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})