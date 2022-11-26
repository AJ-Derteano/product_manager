
const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next(); //: Continua hacia el controllador
    } catch (err) {
        res.status(403);
        res.send({ erros: err.array() })
    }
}

module.exports = validateResults;