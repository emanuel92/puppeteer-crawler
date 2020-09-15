
const puppeteer = require('puppeteer');
const fs = require('fs');

const urls = ['https://www.google.com/', 'https://www.google.com/']

// TODOO: Combining Names & Values into JSON-Object

var rawName = [];
var rawValue = [];

(async () => {

  for (let i = 0; urls.length; i++) {

    const url = urls[i];

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' });
      
    var name = await page.evaluate(() => Array.from(document.querySelectorAll('.div a[href]'), el => el.innerHTML));  
    var value = await page.evaluate(() => Array.from(document.querySelectorAll('.div a[href]'), a => a.getAttribute('href')));  

    rawName.push(JSON.stringify(name));
    rawValue.push(JSON.stringify(value));

    await browser.close()
    
    new Promise(function(resolve, reject) {
      fs.appendFile('rawName.json', rawName, function (err) {
        if (err) reject(err);
        console.log('Saved!');
      });
    });

    new Promise(function(resolve, reject) {
      fs.appendFile('rawValue.json', rawValue, function (err) {
        if (err) reject(err);
        console.log('Saved!');
      });
    });
  }
})()
