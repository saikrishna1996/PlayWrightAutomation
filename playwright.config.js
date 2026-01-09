// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

const config = ({     // config is the variable which is holding all the information required to run your tests
/*  export default defineConfig({    it is nothing but all the key-value pairs to run the 
  testscripts, we are putting in a variable.  */
  testDir: './tests',
  timeout: 30 * 1000,   // global timeout for all components
  expect : {
    timeout: 5 * 1000,   // exclusively for assertions only, wrapped under expect:
    // it default timeout of 50secs is okay for you, no need to write this expect timeout
  },
  
  reporter: 'html',   // to generate a html report after running testcases

  use: {
    browserName: 'chromium',  // to use chromium browser
    headless: false,          // to run the browser in headed mode, by default it is true
  },
});

module.exports = config     // it is used to make `config` available across all the files in the project

// To run any test, we use npx playwright test command in terminal
// If we don't specify npx here, it will give error that playwright is not recognized as an internal or external command
// because playwright is installed locally in the project folder and not globally in the system
// so we need to use npx to run the playwright commands
// Or else you can also install playwright globally using command `npm install -g @playwright/test`
// but it is not recommended as it may cause version conflicts with different projects
// Or you can also add a script in package.json file to run the tests using npm command
// for example, in package.json file, under "scripts" section, you can add
// "test": "playwright test"
// then you can run the tests using command `npm test` or `npm run test` in terminal
// here `npm test` or `npm run test` will run the command specified in the "test" script in package.json file
// If we don't use npx, it will not fetch the playwright module from the node_modules folder and give error, so you can either use path of playwright from node_modules folder or use npx to run the command


// By default, it will look for `playwright.config.js` file in the root directory
// If the config file is named differently or located in a different folder,
// we need to specify the path to the config file using `--config` option
// for example,
// `npx playwright test --config=path/to/your/config/file.js`
// here `--config=` is used to specify the path to the config file

// All the tests in the tests folder will run in parallel, but if you want to run them sequentially, you can use `--workers=1` command in terminal
// for example, `npx playwright test --workers=1`
// But all the tests inside a single test file will run sequentially by default
// If you want to run tests in a particular order, you can use `test.describe.serial` block in the test file
// for example,
// test.describe.serial('My Test Suite', () => {
//   test('Test 1', async ({ page }) => {
//     // test code
//   });

//   test('Test 2', async ({ page }) => {
//     // test code
//   });
// });
// here, Test 1 will run before Test 2

// But all the files inside the tests folder will run in parallel by default
// If you want to run all the test files sequentially, you can use `--workers=1` command in terminal as mentioned above


// Explanation of commands to run tests using this config file
// to run all the tests in the tests folder, we can use command `npx playwright test` in terminal
// here `npx playwright test` is the default command to run all the tests in the tests folder
// it will automatically detect the `playwright.config.js` file in the root directory
// if the config file is named differently or located in a different folder,
// we need to specify the path to the config file using `--config` option
// for example,
// `npx playwright test --config=playwright.config.js`
// here `--config=` is used to specify the path to the config file
// we can also specify the test files or folders to run using command `npx playwright test <test-file-or-folder>`
// for example, `npx playwright test tests/UIBasictest.spec.js`
// here `<test-file-or-folder>` is the path to the test file or folder to be run
// it will run only the specified test file or all the test files in the specified folder
// we can also specify multiple test files or folders to run using command `npx playwright test <test-file-or-folder1> <test-file-or-folder2> ...`
// for example, `npx playwright test tests/UIBasictest.spec.js tests/AnotherTest.spec.js`
// here `<test-file-or-folder1> <test-file-or-folder2> ...` are the paths to the test files or folders to be run
// it will run all the specified test files or all the test files in the specified folders
// we can also specify the test files or folders to run using glob patterns
// for example, `npx playwright test tests/*.spec.js`
// here `tests/*.spec.js` is the glob pattern to match all the test files with .spec.js extension in the tests folder
// it will run all the matched test files
// we can also specify multiple glob patterns to run using command `npx playwright test <glob-pattern1> <glob-pattern2> ...`
// for example, `npx playwright test tests/*.spec.js tests/AnotherFolder/*.spec.js`
// here `<glob-pattern1> <glob-pattern2> ...` are the glob patterns to match the test files to be run
// it will run all the matched test files
// we can also specify the test files or folders to run using tags
// for example, `npx playwright test --grep @smoke`
// here `--grep` is used to specify the tag to filter the test files or folders to be run
// it will run only the test files or folders with the specified tag
// we can also specify multiple tags to run using command `npx playwright test --grep @tag1 --grep @tag2 ...`
// for example, `npx playwright test --grep @smoke --grep @regression`
// here `--grep @tag1 --grep @tag2 ...` are the tags to filter the test files or folders to be run
// it will run only the test files or folders with any of the specified tags
// we can also exclude test files or folders to run using command `npx playwright test --grep-invert @tag`
// for example, `npx playwright test --grep-invert @flaky`
// here `--grep-invert` is used to exclude the test files or folders with the specified tag
// it will run all the test files or folders except the ones with the specified tag
// we can also exclude multiple tags to run using command `npx playwright test --grep-invert @tag1 --grep-invert @tag2 ...`
// for example, `npx playwright test --grep-invert @flaky --grep-invert @skip`
// here `--grep-invert @tag1 --grep-invert @tag2 ...` are the tags to exclude the test files or folders to be run
// it will run all the test files or folders except the ones with any of the specified tags
// we can also combine multiple options together in the command
// for example, `npx playwright test tests/*.spec.js --grep @smoke --grep-invert @flaky`
// it will run all the matched test files with .spec.js extension in the tests folder with the specified tag and excluding the ones with the specified tag
// we can also specify the number of workers to run tests in parallel using command `npx playwright test --workers=n`
// here `--workers=` is used to specify the number of workers
// for example, `npx playwright test --workers=4`
// it will run the tests in 4 parallel workers
// we can also run tests in a specific browser using command `npx playwright test --project=browser-name`
// for example, `npx playwright test --project=chromium`
// here `--project=` is used to specify the browser name
// supported browser names are chromium, firefox, webkit
// we can also combine multiple options together in the command
// for example, `npx playwright test tests/*.spec.js --grep @smoke --grep-invert @flaky --workers=4 --project=chromium`
// it will run all the matched test files with .spec.js extension in the tests folder with the specified tag and excluding the ones with the specified tag in 4 parallel workers using chromium browser

// to run the tests using this config file, we need to run the command `npx playwright test --config=playwright.config.js` in terminal
// or directly `npx playwright test` as this is the default config file name which Playwright will automatically detect
// to run tests in a different browser other than the one specified in config file, we can use command `npx playwright test --project=firefox`
// here `--project=` is used to specify the browser name
// we can also create multiple projects in this config file to run tests in multiple browsers together, let's learn it later
//  to run a particular test file, we can use command `npx playwright test tests/UIBasictest.spec.js`
//  to run a particular test inside a test file, we can use command `npx playwright test tests/UIBasictest.spec.js --grep "Page Playwright test"`
// here `--grep` is used to filter a particular test case using the test name
//  to run tests in headed mode, we can use command `npx playwright test --headed`
// to run tests in debug mode, we can use command `npx playwright test --debug`
// to run tests in a particular browser in headed mode, we can use command `npx playwright test --project=chromium --headed`
// to generate html report after running tests, we can use command `npx playwright show-report`
// to run tests in parallel mode, we can use command `npx playwright test --workers=3`
// here `--workers=` is used to specify the number of parallel workers
// to run tests with a specific tag, we can use command `npx playwright test --grep @smoke`
// here `@smoke` is the tag name specified in the test file
// to run tests without a specific tag, we can use command `npx playwright test --grep-invert @smoke`
// here `--grep-invert` is used to exclude the tests with the specified tag
// to generate code snippets for the actions performed in the browser, we can use command `npx playwright codegen <url>`
// here `<url>` is the URL of the application to be tested
// for example, `npx playwright codegen https://www.google.com`
// it will open the browser and start recording the actions performed in the browser and generate the code snippets in the terminal
// we can also save the generated code snippets in a file using command `npx playwright codegen <url> --output=filename.js`
// here `--output=` is used to specify the file name to save the generated code snippets
// for example, `npx playwright codegen https://www.google.com --output=googleTest.spec.js`
// it will save the generated code snippets in a file named `googleTest.spec.js` in the current directory
// we can also specify the programming language for the generated code snippets using command `npx playwright codegen <url> --lang=language`
// here `--lang=` is used to specify the programming language
// for example, `npx playwright codegen https://www.google.com --lang=python`
// it will generate the code snippets in Python language
// supported languages are javascript, typescript, python, java, csharp
// default is javascript if no language is specified
// we can also combine multiple options together in the command
// for example, `npx playwright codegen https://www.google.com --output=googleTest.spec.js --lang=typescript`
// it will save the generated code snippets in a file named `googleTest.spec.js` in TypeScript language
// we can also record a video of the test execution using command `npx playwright test --video=on`
// it will save the video of each test in a separate folder named `videos` in the current directory
// we can also specify the video size using command `npx playwright test --video-size=widthxheight`
// for example, `npx playwright test --video-size=800x600`
// it will record the video in 800x600 resolution
// we can also take a screenshot of the test execution using command `npx playwright test --screenshot=on`
// it will save the screenshot of each test in a separate folder named `screenshots` in the current directory
// we can also specify the screenshot size using command `npx playwright test --screenshot-size=widthxheight`
// for example, `npx playwright test --screenshot-size=800x600`
// it will take the screenshot in 800x600 resolution
// we can also generate a trace of the test execution using command `npx playwright test --trace=on`
// it will save the trace of each test in a separate folder named `traces` in the current directory
// we can also open the trace viewer using command `npx playwright show-trace <trace-file>`
// here `<trace-file>` is the path of the trace file to be viewed
// for example, `npx playwright show-trace traces/test1.zip`
// it will open the trace viewer for the trace file `test1.zip` in the `traces` folder
// we can also combine multiple options together in the command
// for example, `npx playwright test --video=on --screenshot=on --trace=on`
// it will record the video, take the screenshot and generate the trace for each test
// we can also specify the output directory for the videos, screenshots and traces using command `npx playwright test --output=directory`
// here `--output=` is used to specify the output directory
// for example, `npx playwright test --output=results`
// it will save the videos, screenshots and traces in a folder named `results` in the current directory
// we can also combine all the options together in the command
// for example, `npx playwright test --video=on --screenshot=on --trace=on --output=results`
// it will record the video, take the screenshot and generate the trace for each test and save them in the `results` folder
// we can also specify the reporter for the test results using command `npx playwright test --reporter=reporter`
// here `--reporter=` is used to specify the reporter
// for example, `npx playwright test --reporter=html`
// it will generate the test report in HTML format
// supported reporters are list, dot, line, json, junit, html
// default is list if no reporter is specified
// we can also combine multiple reporters together in the command
// for example, `npx playwright test --reporter=list,html`
// it will generate the test report in both list and HTML format
// we can also specify the output file for the reporter using command `npx playwright test --reporter=reporter:output-file`
// here `:output-file` is used to specify the output file for the reporter
// for example, `npx playwright test --reporter=junit:report.xml`
// it will generate the test report in JUnit format and save it in a file named `report.xml` in the current directory
// we can also combine all the options together in the command
// for example, `npx playwright test --video=on --screenshot=on --trace=on --output=results --reporter=html`
// it will record the video, take the screenshot and generate the trace for each test, save them in the `results` folder and generate the test report in HTML format
// we can also run tests in a specific order using command `npx playwright test --shuffle`
// it will run the tests in a random order
// we can also run tests in a specific order using command `npx playwright test --repeat-each=n`
// here `--repeat-each=` is used to specify the number of times to repeat each test
// for example, `npx playwright test --repeat-each=3`
// it will run each test 3 times
// we can also combine all the options together in the command
// for example, `npx playwright test --video=on --screenshot=on --trace=on --output=results --reporter=html --repeat-each=3`
// it will record the video, take the screenshot and generate the trace for each test, save them in the `results` folder, generate the test report in HTML format and run each test 3 times
// we can also run tests in a specific order using command `npx playwright test --max-failures=n`
// here `--max-failures=` is used to specify the maximum number of failures to stop the test run
// for example, `npx playwright test --max-failures=5`
// it will stop the test run after 5 failures
// we can also combine all the options together in the command
// for example, `npx playwright test --video=on --screenshot=on --trace=on --output=results --reporter=html --repeat-each=3 --max-failures=5`
// it will record the video, take the screenshot and generate the trace for each test, save them in the `results` folder, generate the test report in HTML format, run each test 3 times and stop the test run after 5 failures
// we can also run tests in a specific order using command `npx playwright test --list`
// it will list all the tests without running them
// we can also combine all the options together in the command
// for example, `npx playwright test --video=on --screenshot=on --trace=on --output=results --reporter=html --repeat-each=3 --max-failures=5 --list`
// it will record the video, take the screenshot and generate the trace for each test, save them in the `results` folder, generate the test report in HTML format, run each test 3 times, stop the test run after 5 failures and list all the tests without running them
// we can also run tests in a specific order using command `npx playwright test --help`
// it will display the help information for the Playwright test command
// we can also combine all the options together in the command
// for example, `npx playwright test --video=on --screenshot=on --trace=on --output=results --reporter=html --repeat-each=3 --max-failures=5 --list --help`
// it will record the video, take the screenshot and generate the trace for each test, save them in the `results` folder, generate the test report in HTML format, run each test 3 times, stop the test run after 5 failures, list all the tests without running them and display the help information for the Playwright test command
// these are some of the commonly used Playwright test commands and options
// there are many more options available in the Playwright test command, we can explore them in the official Playwright documentation
// that's all for now, happy testing!
///
