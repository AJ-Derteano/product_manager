/**
 * Sheet information
 * =============================================================================
 * Date: 26/11/2022
 * 
 * 
 * Endpoints:
 *  Method  Route           Description
 *  GET     /           =>  Find all warehouse
 *  GET     /:id        =>  Find brand by id
 *  POST    /register   =>  Register brand
 *  PUT     update/:id  =>  Update brand by id
 *  DELETE  /:id        =>  Delete brand by id
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
 * Import drivers for warehouse
 */
const {
  getAllWH,
  getWHById,
  createWH,
  deleteWH,
  updateWH
} = require('../controllers/warehouse');

/**
 * Import validators for warehouse
 */
const {
  validatorCreateItem,
  validatorUpdateItem
} = require('../validators/warehouse');

/**
 * Routers
 */

/**
 * Check route status
 */
router.get('/status', (req, res) => {
  res.send('Api for warehouse status is ok')
})

/**
 * Get all active warehouse
 */
router.get('/', getAllWH)

/**
 * Search brand by its identifier
 */
router.get('/:id', getWHById)

/**
 * Register brand
 */
router.post('/register', validatorCreateItem, createWH)

/**
 * Remove soft from brand
 */
router.delete('/:id', deleteWH)

/**
 * Edit brand by its identifier
 */
router.put('/update/:id', validatorUpdateItem, updateWH)


module.exports = router