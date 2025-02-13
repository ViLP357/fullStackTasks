const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
   const text = await page.getByText("Log in to application")
   await expect(text).toBeVisible()

   const username = await page.getByRole("textbox").first()
   const password = await page.getByRole("textbox").last()
   const button = await page.getByText("login")

   await expect(username).toBeVisible()
   await expect(password).toBeVisible()
   await expect(button).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole("textbox").first().fill("mluukkai")
      await page.getByRole("textbox").last().fill("salainen")
      await page.getByRole("button", {name: "login" }).click()

      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByRole("textbox").first().fill("mluukkai")
        await page.getByRole("textbox").last().fill("password")
        await page.getByRole("button", {name: "login" }).click()
  
        await expect(page.getByText("Wrong password or username")).toBeVisible()
    })
  })
})