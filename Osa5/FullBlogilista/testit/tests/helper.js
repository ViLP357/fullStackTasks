const loginWith = async (page, username, password)  => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole("textbox").first().fill(username)
    await page.getByRole("textbox").last().fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }

  export { loginWith }