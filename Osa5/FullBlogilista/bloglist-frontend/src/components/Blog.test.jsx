import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
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