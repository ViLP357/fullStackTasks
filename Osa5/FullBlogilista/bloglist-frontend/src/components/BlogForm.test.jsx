import React from "react"
import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  //const button = screen.getByText("new blog")
  screen.debug()
  //await user.click(button)

  const inputTitle = screen.getByPlaceholderText('write title here')
  const inputAuthor = screen.getByPlaceholderText('write author here')
  const inputUrl = screen.getByPlaceholderText('write url here')

  const sendButton = screen.getByText('Submit')

  await user.type(inputTitle, 'testing a form...T')
  await user.type(inputAuthor, 'testing a form...A')
  await user.type(inputUrl, 'testing a form...U')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...T')
  expect(createBlog.mock.calls[0][0].author).toBe('testing a form...A')
  expect(createBlog.mock.calls[0][0].url).toBe('testing a form...U')
})