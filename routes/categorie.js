/**
 * Sheet information
 * =============================================================================
 * Date: 26/11/2022
 * 
 * 
 * Endpoints:
 *  Method  Route           Description
 *  GET     /           =>  Find all categories
 *  GET     /:id        =>  Find category by id
 *  POST    /register   =>  Register category
 *  PUT     update/:id  =>  Update category by id
 *  DELETE  /:id        =>  Delete category by id
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
 * Import drivers for categories
 */
const {
  findAll,
  findOneById,
  registerCategories,
  softDeleteCategory,
  updateCategory
} = require('../controllers/categories');

/**
 * Import validators for categories
 */
const {
  validatorCreateItem,
  validatorUpdateItem
} = require('../validators/categories');

/**
 * Routers
 */

/**
 * Get all active categories
 */
router.get('/', findAll)

/**
 * Search category by its identifier
 */
router.get('/:id', findOneById)

/**
 * Register category
 */
router.post('/register', validatorCreateItem, registerCategories)

/**
 * Remove soft from category
 */
router.delete('/:id', softDeleteCategory)

/**
 * Edit category by its identifier
 */
router.put('/update/:id', validatorUpdateItem, updateCategory)

/**
 * Check route status
 */
router.get('/status', (req, res) => {
  res.status(200).send('Categories')
})

module.exports = router