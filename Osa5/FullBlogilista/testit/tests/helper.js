const loginWith = async (page, username, password)  => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole("textbox").first().fill(username)
    await page.getByRole("textbox").last().fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }
const create  =async (page) => {
      await page.getByRole("button", { name: "new blog"}).click()
      const textboxes = await page.getByRole('textbox').all()

      await textboxes[0].fill("test title")
      await textboxes[1].fill("test author")
      await textboxes[2].fill("test url")
      await page.getByRole("button", { name: "Submit"}).click()
}

  export { loginWith, create }