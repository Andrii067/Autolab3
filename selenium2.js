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
        // Відкриє головну сторінку Google
        await driver.get('https://www.google.com');
        await driver.sleep(5000);
        // Перевірить title сторінки
        const title = await driver.getTitle();
        console.log('Title:', title);
        if (title !== "Google") {
            throw new Error("Title не знайшов");
        }

        // Перевірить присутність на сторінці логотипу Google
        await driver.findElement(By.css('img[alt="Google"]'));

        // Перевірить присутність на сторінці рядку пошуку
        await driver.findElement(By.name('q'));

        // Перевірить присутність на сторінці кнопки "Пошук Google"
        await driver.findElement(By.name('btnK'));

        // Перевірить присутність на сторінці посилання "Gmail"
	await driver.findElement(By.css('a[href="https://mail.google.com/mail/&ogbl"]'));

        console.log('Всі елементи знайшов.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        console.log('Все добре тут вихід.');
		//await driver.quit();
    }
}

runTest();