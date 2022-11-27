/**
 * Sheet information
 * =============================================================================
 * Date: 26/11/2022
 * 
 * 
 * Endpoints:
 *  Method  Route           Description
 *  GET     /           =>  Find all units
 *  GET     /:id        =>  Find unit by id
 *  POST    /register   =>  Register unit
 *  PUT     update/:id  =>  Update unit by id
 *  DELETE  /:id        =>  Delete unit by id
 * Helper endpoint:
 *  GET /status         =>  Response 200 in case the route the endpoints are active
 * 
 * Dependencies
 *  express
 * 
 */

const express = require("express");
const router = express.Router();

/**
 * Import drivers for units
 */
const {
  getAllUnits,
  getUnitById,
  createUnit,
  deleteUnit,
  updateUnit
} = require('../controllers/units');

/**
 * Import validators for units
 */
const {
  validatorCreateItem,
  validatorUpdateItem
} = require('../validators/units');

/**
 * Routers
 */

/**
 * Check route status
 */
router.get('/status', (req, res) => {
  res.send('Api for unit status is ok')
})

/**
 * Get all active units
 */
router.get('/', getAllUnits)

/**
 * Search unit by its identifier
 */
router.get('/:id', getUnitById)

/**
 * Register unit
 */
router.post('/register', validatorCreateItem, createUnit)

/**
 * Remove soft from unit
 */
router.delete('/:id', deleteUnit)

/**
 * Edit unit by its identifier
 */
router.put('/update/:id', validatorUpdateItem, updateUnit)


module.exports = router