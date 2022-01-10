const db = require('../../db');

exports.greekLastNamesGet = async (req, res, next) => {
    db.query('SELECT * FROM lastnames', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            res.send(result);
        }
    });
    }
