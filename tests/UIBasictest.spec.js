import { expect, test } from '@playwright/test';


test('Browser Context Playwright test', async function({browser}) // or you can also write `async ()=>` instead of `async function()` 
// we use a playwright fixture alias playwright global variable called `browser` like `async ({browser})=>` to use all browser related actions like launching chrome etc.
// also we should use async ({browser}) but not async (broswer) as it will take (browser) as a string variable
{
    //chrome - plugins/ cookies
    const context = await browser.newContext();   //variable can be let or const
    // it opens a new browser in whatever broswer you specify in config.js file
    const page = await context.newPage();
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/"); //navigating to URL
    console.log("Page title is: "+ await page.title());
    //if we don't put await in starting of all the above actions, Javascript doesn't know the sequence,
    // so it will try to perform any action from the first, means it will try to launch URL before opening browser and creating page

    const userName = page.locator("#username");  //locator is used to find any element on the page
    const password = page.locator("[type='password']");
    const signInButton = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-title a");

    // css selector for Playwright 
    await page.locator("#username").fill("rahulshettyacadem");  //locator is used to find any element on the page
    await page.locator("[type='password']").fill("learning");
    await page.locator("#signInBtn").click();
    //await page.pause();  // it will pause the execution and open playwright inspector, we can see step by step execution in inspector

    console.log(await page.locator("[style*='block']").textContent());  // attribute selector with partial match using *=

    // assertion
    await expect(page.locator("[style*='block']")).toContainText("Incorrect"); //attribute selector with partial match using *=
    await expect(page.locator(".alert-danger")).toHaveText("Incorrect username/password."); //class selector

    // fill - for entering text in textbox
    // to wipe out the data, just use fill("") with empty quotes
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("learning");
    await signInButton.click();
    
    // assertion for successful login
    //await expect(page.locator("h2")).toHaveText("Hello rahulshettyacademy,");
    console.log(await page.locator(".card-body a").nth(0).textContent());
    console.log(await cardTitle.first().textContent());
    const allTitles = await cardTitle.allTextContents();  // this method will not wait for all the card titles to be visible, it will fetch all the titles immediately
    // so if there is any delay in loading the titles, it may not fetch all the titles, so it won't fail but it just gives empty array, so it's not reliable
    // that's why we use a loop to wait for each title to be visible before fetching the text
    // that's why we use nth() or first() methods above to fetch the titles one by one, or atleast one

    console.log(allTitles);

});


    //  Without even opening browser and adding a page, we simply can launch URL using default browser and default page as below
    //  We just specify them in the function params 
test('Page Playwright test', async ({browser, page}) =>
{
    await page.goto("https://www.google.com");
    //here {browser} and {page} are 2 out of all the 4 fixtures in Playwright, let's learn another two later.
    //get title of the page and add assertion
    const title = await page.title();
    console.log("Title of the page is: "+title);
    await expect(title).toBe("Google");
    await expect(page).toHaveTitle(/Google/); //regex expression
});

// Note: In the above test, we have not created browser context and page explicitly, Playwright does it automatically for us using the fixtures.


// This is a practice test to understand UI controls in client page for rahulshettyacademy website.
test.only('UI Controls', async ({page}) => 
{
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshettyacademy");  
    await page.locator("[type='password']").fill("learning");

    const dropdown = page.locator("select.form-control"); // CSS selector for dropdown
    await dropdown.selectOption("consult");
    await expect(dropdown).toHaveValue("consult"); // assertion to verify the selected option
    await page.waitForTimeout(2000); // wait for 2 seconds to see the selected option
    console.log(await dropdown.inputValue()); // to get the selected value from dropdown

    const userradio = page.locator(".radiotextsty").nth(1); // CSS selector for radio button
    await userradio.click();
    await page.locator("#okayBtn").click(); // click on okay button in the alert popup
    await expect(userradio).toBeChecked(); // assertion to verify the radio button is checked
    console.log("Radio button is checked: "+ await userradio.isChecked());
    console.log("Radio button value is: "+ await userradio.inputValue());
    console.log(await userradio.isChecked());
    await expect(userradio).toBeChecked();
    await page.waitForTimeout(2000);

    const terms = page.locator("#terms"); // CSS selector for checkbox
    await terms.check(); // to check the checkbox
    await expect(terms).toBeChecked(); // assertion to verify the checkbox is checked
    expect (await terms.isChecked()).toBeTruthy(); // another way to verify the checkbox is checked
    console.log("Checkbox is checked: "+ await terms.isChecked());
    await terms.uncheck(); // to uncheck the checkbox
    await expect(terms).not.toBeChecked(); // assertion to verify the checkbox is unchecked
    console.log("Checkbox is checked: "+ await terms.isChecked());
    expect(await terms.isChecked()).toBeFalsy(); // another way to verify the checkbox is unchecked

    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class", "blinkingText"); // assertion to verify the attribute of link
    
})

// Note: In the above test, we have used CSS selector to locate the dropdown element and selected an option using selectOption() method.