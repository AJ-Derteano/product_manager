/**
 * Sheet information
 * =============================================================================
 * Date: 26/11/2022
 * 
 * 
 * Validators:
 *  validatorCreateItem:
 *    Validate the data that is sent to register a brand
 * 
 *  validatorUpdateItem
 *    Validate the fields that are sent to update a brand
 */

const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

/**
 * @description
 * To create a brand, the following data is required:
 *    brand          Name brand
 *    user_created   User who creates the brand
 *    user_updated   User who creates the brand
 */
const validatorCreateItem = [
  check('unit_code')
    .exists()
    .notEmpty(),

  check('description')
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
 * To update a brand, the modification user and the brand are required,
 * the brand identifier is received by params
 */
const validatorUpdateItem = [
  check('unit_code')
    .exists()
    .notEmpty(),

  check('description')
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