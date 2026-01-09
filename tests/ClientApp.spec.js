import { expect, test } from '@playwright/test';

// This is a practice test to login a client page for rahulshettyacademy website.
test('Login Client Page Test', async ({page}) => 
{
    await page.goto("https://www.rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("gsaikrishna@gmail.com");
    await page.locator("#userPassword").fill("Learn1ng");
    await page.locator("#login").click();

    //await page.waitForLoadState('networkidle'); // wait for network to be idle after login, BUT IT IS FLAKY SOMETIMES
    
    await page.locator(".card-body b").first().waitFor(); // wait for first card title to be visible
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
})

