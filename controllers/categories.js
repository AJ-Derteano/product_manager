/**
 * Sheet information
 * =============================================================================
 * Date: 26/11/2022
 * 
 * 
 * Functions
 *  findAll
 *  findOneById
 *  findAllSoftDelete
 *  findOneByIdSoftDelete
 *  registerCategories
 *  softDeleteCategory
 *  updateCategory
 */
const knex = require('../config/mysql')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleHttpError');
const handleHttpResponse = require('../utils/handleHttpResponse');

/**
 * @name findAll
 * @param {object} req 
 * @param {object} res 
 * @description
 * Find and return all active categories (status = 1)
 */
const findAll = async (req, res) => {
  try {
    let categories = await knex('categories').select().where({ status: 1 })
    handleHttpResponse(res, categories)
  } catch (err) {
    console.log(`[CATEGORY:ERROR_FIND_ALL] ${err}`)
    handleHttpError(res, `[CATEGORY:ERROR_FIND_ALL] ${err}`)
  }
}

/**
 * @name findOneById
 * @param {object} req 
 * @param {object} res 
 * @description
 * Search and return a category by its identifier,
 * only if it is active (status = 1)
 */
const findOneById = async (req, res) => {
  try {
    const { id } = req.params;
    let category = await knex('categories')
      .select()
      .where({ idcategory: id, status: 1 })

    handleHttpResponse(res, category)
  } catch (err) {
    console.log(`[CATEGORY:ERROR_FIND_ONE_BY_ID] ${err}`)
    handleHttpError(res, `[CATEGORY:ERROR_FIND_ONE_BY_ID] ${err}`)
  }
}

/**
 * @name findAllSoftDelete
 * @param {object} req 
 * @param {object} res 
 * @description
 * Find and return all inactive categories (status = 0)
 */
const findAllSoftDelete = async (req, res) => {
  try {
    let categories = await knex('categories').select().where({ status: 0 })
    handleHttpResponse(res, categories)
  } catch (err) {
    console.log(`[CATEGORY:ERROR_FIND_ALL] ${err}`)
    handleHttpError(res, `[CATEGORY:ERROR_FIND_ALL] ${err}`)
  }
}

/**
 * @name findOneByIdSoftDelete
 * @param {object} req 
 * @param {object} res 
 * @description
 * Find and return a category by its identifier,
 * only if it is inactive (status = 0)
 */
const findOneByIdSoftDelete = async (req, res) => {
  try {
    const { id } = req.params;
    let category = await knex('categories')
      .select()
      .where({ idcategory: id, status: 0 })

    handleHttpResponse(res, category)
  } catch (err) {
    console.log(`[CATEGORY:ERROR_FIND_ONE_BY_ID] ${err}`)
    handleHttpError(res, `[CATEGORY:ERROR_FIND_ONE_BY_ID] ${err}`)
  }
}

/**
 * @name registerCategories
 * @param {object} req 
 * @param {object} res
 * @description
 * Register a category, for this it requires the following data:
 *  body:
 *    category
 *    user_created
 *    user_updated
 */
const registerCategories = async (req, res) => {
  try {
    const body = matchedData(req)

    let id = await knex('categories').insert(body)

    handleHttpResponse(res, { id: id[0] })
  } catch (err) {
    console.log(`[CATEGORY:ERROR_CREATE] ${err}`)
    handleHttpError(res, `[CATEGORY:ERROR_CREATE] ${err}`)
  }

}

/**
 * @name softDeleteCategory
 * @param {object} req 
 * @param {object} res
 * @description
 * Delete a category by changing its status
 *    status = 1 =>> status = 0
 */
const softDeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let category = await knex('categories')
      .where({ idcategory: id, status: 1 })
      .update({
        status: 0
      })

    handleHttpResponse(res, category)
  } catch (err) {
    console.log(`[CATEGORY:ERROR_DELETE] ${err}`)
    handleHttpError(res, `[CATEGORY:ERROR_DELETE] ${err}`)
  }
}

/**
 * @name updateCategory
 * @param {object} req 
 * @param {object} res 
 * @description
 * Update the name of the category if it is active,
 * it requires the following data:
 *  params:
 *    id => Category identifier
 *  body:
 *    category => New category name
 */
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw 'The identifier[ID], is required'

    const body = matchedData(req)

    let category = await knex('categories')
      .where({ idcategory: id, status: 1 })
      .update(body)

    handleHttpResponse(res, category)
  } catch (err) {
    console.log(`[CATEGORY:ERROR_UPDATE] ${err}`)
    handleHttpError(res, `[CATEGORY:ERROR_UPDATE] ${err}`)
  }
}


module.exports = {
  findAll,
  findOneById,
  findAllSoftDelete,
  findOneByIdSoftDelete,
  registerCategories,
  softDeleteCategory,
  updateCategory
}