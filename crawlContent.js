const fs = require('fs');
const puppeteer = require('puppeteer');

let result = [];

(async () => {

  const urls = ['https://www.google.com/', 'https://www.google.com/']
  for (let i = 0; i < urls.length; i++) {

      const url = urls[i];
               
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(`${url}`, { waitUntil: 'networkidle2' });

      const raw = await page.$eval('div > p', el => el.innerHTML)

      result = (JSON.stringify(raw + ","));

      new Promise(function(resolve, reject) {
        fs.appendFile('result.json', result, function (err) {
          if (err) reject(err);
          console.log('Saved No. ' + i + ' out of ' + urls.length);
        });
      });
  
      await browser.close();
  }
})();