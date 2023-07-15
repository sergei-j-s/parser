const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const { checkURL } = require('../helpers');

exports.Parser = async (req, res) => {
  let { url } = req.body;

  if (await checkURL(url)) {

    let list = {
      js: [],
      css: []
    };

    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=egl'] });
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.content();
    await browser.close();

    let $ = cheerio.load(content, { xmlMode: true });

    $('script[src]').each((i, e) => {
      if (e.attribs.src) {
        if (e.attribs.src[0] == '/') {
          e.attribs.src = url + e.attribs.src;
        };
        list.js.push(e.attribs.src);
      };
    });

    $('link[rel="stylesheet"]').each((i, e) => {
      if (e.attribs.href) {
        if (e.attribs.href[0] == '/') {
          e.attribs.href = url + e.attribs.href;
        };
        list.css.push(e.attribs.href);
      };
    });

    res.status(200).json({ list });
  } else {
    res.status(400).json({ err: 'ссылка не валидна' });
  };
};