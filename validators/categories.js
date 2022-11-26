const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
  check('category')
    .exists()
    .notEmpty(),

  check('user_created')
    .exists()
    .notEmpty(),

  check('user_updated')
    .exists()
    .notEmpty(),

  (req, res, next) => validateResults(req, res, next)
]

module.exports = {
  validatorCreateItem
}