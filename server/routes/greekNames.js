const db = require('../../db');
const rp = require('request-promise');
const firstNameParser = require('../parsers/greekNameParser.js');

exports.greekNamesGet = async (req, res, next) => {
    const type = req.params.type;
    if (type === "new") {
        const nameObjsArr = [];
        const promiseArr = [];
        for(let i = 1; i <= 42; i++) {
            const myPromise = new Promise((resolve, reject) => {
                const url = "https://adoption.com/baby-names/origin/greek?page=" + i;
                rp(url)
                    .then(function(html) {
                        const nameObjs = firstNameParser(html);
                        nameObjsArr.push(nameObjs);
                        resolve(nameObjsArr);
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            });
            promiseArr.push(myPromise);
        }
        Promise.all(promiseArr).then(() => {
            const flatNameObjsArr = nameObjsArr.flat();
            res.status(200).send(JSON.stringify(flatNameObjsArr));
        });
    }
    else if (type === "current") {
        db.query('SELECT * FROM names', (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.send(result);
            }
        });
    }
}

exports.greekNamesPostLastName = async (req, res, next) => {
    const name = req.query.name;
    const meaning = req.query.meaning;
    const gender = req.query.gender;
    const purpose = req.query.purpose;
    const lastMeaning = req.query.lastmeaning;
    const lastName = req.params.lastname;
    
    db.query('INSERT INTO names (name, meaning, gender, purpose, lastname, lastmeaning) VALUES($1, $2, $3, $4, $5, $6)', [name, meaning, gender, purpose, lastName, lastMeaning], (err, result) => {
        if (err) {
            console.log(err);
            res.status(403).send(err);
        }
        else {
            res.status(200).send(result);
        }
    });
}

exports.greekNamesPost = async (req, res, next) => {
    const name = req.query.name;
    const meaning = req.query.meaning;
    const gender = req.query.gender;
    const purpose = req.query.purpose;
    
    db.query('INSERT INTO names (name, meaning, gender, purpose) VALUES($1, $2, $3, $4)', [name, meaning, gender, purpose], (err, result) => {
        if (err) {
            console.log(err);
            res.status(403).send(err);
        }
        else {
            res.status(200).send(result);
        }
    });
}

exports.greekNamesRemove = async (req, res, next) => {
    const name = req.query.name;
    db.query('DELETE FROM names WHERE name = $1', [name], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(result);
        }
    });
}