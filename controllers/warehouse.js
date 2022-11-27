/**
 * Sheet information
 * =============================================================================
 * Date: 26/11/2022
 * 
 * 
 * Functions
 *  getAllWH
 *  getWHById
 *  getAllWHDelete
 *  getWHByIdDelete
 *  createWH
 *  deleteWH
 *  updateWH
 */
const knex = require('../config/mysql')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleHttpError');
const handleHttpResponse = require('../utils/handleHttpResponse');

/**
 * @name getAllWH
 * @param {object} req 
 * @param {object} res 
 * @description
 * Find and return all active warehouse (date_low = null)
 */
const getAllWH = async (req, res) => {
  try {
    let warehouse = await knex('warehouse').select().where({ date_low: null })
    handleHttpResponse(res, warehouse)
  } catch (err) {
    console.log(`[WH:ERROR_FIND_ALL] ${err}`)
    handleHttpError(res, `[WH:ERROR_FIND_ALL] ${err}`)
  }
}

/**
 * @name getWHById
 * @param {object} req 
 * @param {object} res 
 * @description
 * Search and return a brand by its identifier,
 * only if it is active (status = 1)
 */
const getWHById = async (req, res) => {
  try {
    const { id } = req.params;
    let brand = await knex('warehouse')
      .select()
      .where({ idwarehouse: id, date_low: null })

    handleHttpResponse(res, brand)
  } catch (err) {
    console.log(`[WH:ERROR_FIND_ONE_BY_ID] ${err}`)
    handleHttpError(res, `[WH:ERROR_FIND_ONE_BY_ID] ${err}`)
  }
}

/**
 * @name getAllWHDelete
 * @param {object} req 
 * @param {object} res 
 * @description
 * Find and return all inactive warehouse (status = 0)
 */
const getAllWHDelete = async (req, res) => {
  try {
    let warehouse = await knex('warehouse').select().whereNot({ date_low: null })
    handleHttpResponse(res, warehouse)
  } catch (err) {
    console.log(`[WH:ERROR_FIND_ALL] ${err}`)
    handleHttpError(res, `[WH:ERROR_FIND_ALL] ${err}`)
  }
}

/**
 * @name getWHByIdDelete
 * @param {object} req 
 * @param {object} res 
 * @description
 * Find and return a brand by its identifier,
 * only if it is inactive (status = 0)
 */
const getWHByIdDelete = async (req, res) => {
  try {
    const { id } = req.params;
    let brand = await knex('warehouse')
      .select()
      .where({ idwarehouse: id })
      .andWhereNot({ date_low: null })

    handleHttpResponse(res, brand)
  } catch (err) {
    console.log(`[WH:ERROR_FIND_ONE_BY_ID] ${err}`)
    handleHttpError(res, `[WH:ERROR_FIND_ONE_BY_ID] ${err}`)
  }
}

/**
 * @name createWH
 * @param {object} req 
 * @param {object} res
 * @description
 * Register a brand, for this it requires the following data:
 *  body:
 *    brand
 *    user_created
 *    user_updated
 */
const createWH = async (req, res) => {
  try {
    const body = matchedData(req)

    let id = await knex('warehouse').insert(body)

    handleHttpResponse(res, { id: id[0] })
  } catch (err) {
    console.log(`[WH:ERROR_CREATE] ${err}`)
    handleHttpError(res, `[WH:ERROR_CREATE] ${err}`)
  }

}

/**
 * @name deleteWH
 * @param {object} req 
 * @param {object} res
 * @description
 * Delete a brand by changing its status
 *    status = 1 =>> status = 0
 */
const deleteWH = async (req, res) => {
  try {
    const { id } = req.params;
    let brand = await knex('warehouse')
      .where({ idwarehouse: id, date_low: null })
      .update({
        date_low: knex.fn.now()
      })

    handleHttpResponse(res, brand)
  } catch (err) {
    console.log(`[WH:ERROR_DELETE] ${err}`)
    handleHttpError(res, `[WH:ERROR_DELETE] ${err}`)
  }
}

/**
 * @name updateWH
 * @param {object} req 
 * @param {object} res 
 * @description
 * Update the name of the brand if it is active,
 * it requires the following data:
 *  params:
 *    id => WH identifier
 *  body:
 *    brand => New brand name
 */
const updateWH = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw 'The identifier[ID], is required'

    const body = matchedData(req)

    let brand = await knex('warehouse')
      .where({ idwarehouse: id, date_low: null })
      .update(body)

    handleHttpResponse(res, brand)
  } catch (err) {
    console.log(`[WH:ERROR_UPDATE] ${err}`)
    handleHttpError(res, `[WH:ERROR_UPDATE] ${err}`)
  }
}


module.exports = {
  getAllWH,
  getWHById,
  getAllWHDelete,
  getWHByIdDelete,
  createWH,
  deleteWH,
  updateWH
}