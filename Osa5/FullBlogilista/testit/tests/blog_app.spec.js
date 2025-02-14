const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        const resetResponse = await request.post('http://localhost:3001/api/testing/reset')
        //console.log('Reset response:', resetResponse.status())
      
        const userResponse = await request.post('http://localhost:3001/api/users', {
          data: {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
          }
        })
        //console.log('User creation response:', userResponse.status())
      
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
  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
        await loginWith(page, "mluukkai", "salainen")
      })
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole("button", { name: "new blog"}).click()
      const textboxes = await page.getByRole('textbox').all()

      await textboxes[0].fill("test title")
      await textboxes[1].fill("test author")
      await textboxes[2].fill("test url")
      await page.getByRole("button", { name: "Submit"}).click()

      const texts = await page.getByText('test title').last()
      await expect(texts).toBeVisible()
    })

    test.only("a blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "new blog"}).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill("test title")
      await textboxes[1].fill("test author")
      await textboxes[2].fill("test url")
      await page.getByRole("button", { name: "Submit"}).click()

      await page.getByRole("button", {name: "view"}).click()
      const text1 = page.getByText('0')
      await expect(text1).toBeVisible()
      await page.getByRole("button", {name: "like"}).click()

      const text2 = page.getByText('1')
      await expect(text2).toBeVisible()
    })
  })
})