const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Шлях до chromedriver
const chromeDriverPath = 'C:\\Users\\Andres\\Desktop\\111\\Автоматизація тестування\\lab3\\node_modules\\webdriver-manager\\selenium\\chromedriver_114.0.5735.90.exe';

// Налаштування опцій ChromeDriver
let options = new chrome.Options();

// Задав властивість webdriver.chrome.driver до шляху вашого chromedriver тут можна багато цікавого прописати
process.env['webdriver.chrome.driver'] = chromeDriverPath;

async function runTest() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await driver.get('http://www.google.com');
    } finally {
        await driver.quit();
    }
}

runTest();
