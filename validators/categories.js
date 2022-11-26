/**
 * Sheet information
 * =============================================================================
 * Date: 26/11/2022
 * 
 * 
 * Validators:
 *  validatorCreateItem:
 *    Validate the data that is sent to register a category
 * 
 *  validatorUpdateItem
 *    Validate the fields that are sent to update a category
 */

const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

/**
 * @description
 * To create a category, the following data is required:
 *    category       Name category
 *    user_created   User who creates the category
 *    user_updated   User who creates the category
 */
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

/**
 * @description
 * To update a category, the modification user and the category are required,
 * the category identifier is received by params
 */
const validatorUpdateItem = [
  check('category')
    .exists()
    .notEmpty(),

  check('user_updated')
    .exists()
    .notEmpty(),

  (req, res, next) => validateResults(req, res, next)
]


module.exports = {
  validatorCreateItem,
  validatorUpdateItem
}