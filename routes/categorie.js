const express = require("express");
const router = express.Router();

const { registerCategories } = require('../controllers/categories');
const { validatorCreateItem } = require('../validators/categories')

router.get('/status', (req, res) => {
  res.status(200).send('Categories')
})

/**
 * Registrar categorias
 */
router.post('/register', validatorCreateItem, registerCategories)

module.exports = router