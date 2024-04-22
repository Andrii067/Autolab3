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
        // Відкриємо головну сторінку Вікіпедії
        await driver.get('https://uk.wikipedia.org');
		await driver.sleep(5000);
        // Введемо пошуковий запит "Київ" і натиснемо Enter
        await driver.findElement(By.name('search')).sendKeys('Київ', Key.RETURN);

        // Перейдемо на сторінку про Київ
        await driver.wait(until.elementLocated(By.linkText('Київ')));
        await driver.findElement(By.linkText('Київ')).click();
		await driver.sleep(5000);
        // Перевіримо присутність елементів на сторінці
        await driver.wait(until.elementLocated(By.css("img[src='\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/1\/1a\/COA_of_Kyiv_Kurovskyi\.svg\/90px-COA_of_Kyiv_Kurovskyi\.svg\.png']"))); // Зображення герба Києва
        await driver.findElement(By.xpath('//*[@id="mw-content-text"]/div[1]/table[1]/tbody/tr[14]/td')); // Кількість населення
        await driver.findElement(By.css('#collapsibleTable0 > tbody > tr:nth-child(5) > th:nth-child(5)')); // Середня температура в квітні
        await driver.findElement(By.xpath('//*[@id="mw-content-text"]/div[1]/div[9]/i/a[1]')); // Підрозділ "Епідемія коронавірусу"
        await driver.findElement(By.css('#mw-content-text > div.mw-content-ltr.mw-parser-output > table.infobox > tbody > tr:nth-child(18) > td')); // Густота населення

        console.log('Всі елементи успішно знайшов!');
		let listItems = await driver.findElements(By.css('#mw-content-text > div.mw-content-ltr.mw-parser-output > ul:nth-child(273) > li'));

        // Виводимо кількість елементів у списку і перевіряємо, чи їх більше 20
        console.log("Кількість архітектурних пам'яток:", listItems.length);
        if (listItems.length > 20) {
            console.log("Тест пройшов успішно. Кількість елементів:", listItems.length);
        } else {
            console.log("Тест не пройшов. Кількість елементів менше або дорівнює 20:", listItems.length);
        }
		await driver.findElement(By.id('mw-content-text'));
		await driver.findElement(By.className('infobox'));
		await driver.findElement(By.xpath('//*[@id="mw-content-text"]/div[1]/div[9]/i/a[1]'));
		
		console.log("Помилок не було значить все знайшов ");
    } catch (error) {
        console.error('Error:', error);
    } finally {
		console.log('Все добре тут вихід.');
		//await driver.quit();
    }
}

runTest();