import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173"

test('should allow user to sign in', async ({ page }) => {

  const testemail = `test_register_${Math.floor(Math.random() * 9000) + 10000 }@test.com`
  await page.goto(UI_URL);


  //get the sign-in button
  await page.getByRole("link", { name: "Sign In"}).click();

  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill(`${testemail}`);
  await page.locator("[name=password]").fill("passpass");


  await page.getByRole("button", {name: "login"}).click();

  await expect(page.getByText("Sign in Successful")).toBeVisible();
  await expect(page.getByRole("link",{name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link",{name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button",{name: "Sign Out"})).toBeVisible();
  
});

test('should allow user to register', async ({page}) => {
  await page.goto(UI_URL);

  await page.getByRole("link", {name: "Sign In"}).click();
  await page.getByRole("link", {name: "create an account here"}).click();
  await expect(page.getByRole("heading", {name: "create an account"})).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill("test_registeruser@test.com");
  await page.locator("[name=password]").fill("testpassword");
  await page.locator("[name=confirmPassword]").fill("testpassword");

  await page.getByRole("button", {name: "create account"}).click();

  await expect(page.getByText("Registration Success")).toBeVisible();
  await expect(page.getByRole("link",{name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link",{name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button",{name: "Sign Out"})).toBeVisible();
  
});


