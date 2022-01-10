const cheerio = require('cheerio');

const firstNameParser = (html) => {
    const $ = cheerio.load(html, null, false);
    const nameObjs = []
    $('.table > tbody > tr').each((index, element) => {
        const tds = $(element).find("td");
        const attr = $(tds[0]).attr();
        if (!('colspan' in attr)) {
            const name = $(tds[0]).text();
            const meaning = $(tds[1]).text();
            const gender = $(tds[2]).text();
            const nameObj = {
                name: name,
                meaning: meaning,
                gender: gender
            }
            nameObjs.push(nameObj);
        }
    });
    return nameObjs;
}

module.exports = firstNameParser;