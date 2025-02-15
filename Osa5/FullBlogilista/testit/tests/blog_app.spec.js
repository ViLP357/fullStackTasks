const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, create, createWithTitle } = require('./helper')

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
      await create(page)

      const texts = await page.getByText('test title').last()
      await expect(texts).toBeVisible()
    })

    test("a blog can be liked", async ({ page }) => {
      await create(page)

      await page.getByRole("button", {name: "view"}).click()
      const text1 = page.getByText('0')
      await expect(text1).toBeVisible()
      await page.getByRole("button", {name: "like"}).click()

      const text2 = page.getByText('1')
      await expect(text2).toBeVisible()
    })
    test("a blog can be deleted", async ({ page }) => {
      await create(page)
      await page.getByRole("button", { name: "view" }).click()
      page.on("dialog", async (dialog) => {
        console.log(dialog.message())
        await dialog.accept()
      })
      await page.getByRole("button", { name: "delete" }).last().click()
      await expect(page.locator(".blog-list")).toHaveCount(0)
    })
    test("only person who added can see a delete blog button", async ({page, request}) => {
      await create(page)
      await page.getByRole("button", {name: 'view'}).click()

      const button = page.getByRole("button", {name: "delete"})
      await expect(button).toBeVisible()

      await page.getByRole("button", {name: 'Log out'}).click()
      const userResponse = await request.post('http://localhost:3001/api/users', {
        data: {
          name: 'Viivi',
          username: 'viivip',
          password: 'banana'
        }
      })

      await page.getByRole("textbox").first().fill("viivip")
      await page.getByRole("textbox").last().fill("banana")
      await page.getByRole("button", {name: "login" }).click()

      await page.getByRole("button", {name: 'view'}).click()

      const button2 = page.getByRole("button", {name: "delete"})
      await expect(button2).not.toBeVisible()
    })
    test.only("blogs are ordered correctly", async ({page}) => {
      await createWithTitle(page, "test title 1")
      await createWithTitle(page, "test title 2")
      await createWithTitle(page, "test title 3")
    
      await page.getByRole("button", {name: "view" }).first().click()
      //await page.getByRole("button", {name: "like" }).click()
      await page.getByRole("button", {name: "close" }).click()
      
      await page.getByRole("button", {name: "view" }).last().click()
      await page.getByRole("button", {name: "like" }).click()
      await page.getByRole("button", {name: "like" }).click()
      await page.getByRole("button", {name: "close" }).click()
 
      //const blogs2 = await page.locator(".blog").all()
    
      
      await expect(page.locator(".blog").first()).toContainText("test title 3")
      await expect(page.locator(".blog").last()).toContainText("test title 2")
    })
  })
})